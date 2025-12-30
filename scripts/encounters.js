// Encounter Planner Module

const Encounters = {
    currentEncounter: [],
    savedEncounters: [],

    init() {
        this.loadState();
        this.bindEvents();
        this.renderMonsters();
        this.renderSavedEncounters();
        this.updateXPThresholds();
    },

    loadState() {
        this.savedEncounters = Storage.get(Storage.KEYS.SAVED_ENCOUNTERS, []);
        const partyConfig = Storage.get(Storage.KEYS.PARTY_CONFIG, { size: 4, level: 1 });
        document.getElementById('partySize').value = partyConfig.size;
        document.getElementById('partyLevel').value = partyConfig.level;
    },

    saveState() {
        Storage.set(Storage.KEYS.SAVED_ENCOUNTERS, this.savedEncounters);
        Storage.set(Storage.KEYS.PARTY_CONFIG, {
            size: parseInt(document.getElementById('partySize').value) || 4,
            level: parseInt(document.getElementById('partyLevel').value) || 1
        });
    },

    bindEvents() {
        // Party config changes
        document.getElementById('partySize').addEventListener('change', () => {
            this.updateXPThresholds();
            this.updateEncounterDifficulty();
            this.saveState();
        });

        document.getElementById('partyLevel').addEventListener('change', () => {
            this.updateXPThresholds();
            this.updateEncounterDifficulty();
            this.renderMonsters(); // Re-render with recommendations
            this.saveState();
        });

        // Monster filters
        document.getElementById('monsterCR').addEventListener('change', () => this.renderMonsters());
        document.getElementById('monsterType').addEventListener('change', () => this.renderMonsters());

        // Encounter actions
        document.getElementById('clearEncounter').addEventListener('click', () => {
            this.currentEncounter = [];
            this.renderCurrentEncounter();
        });

        document.getElementById('saveEncounter').addEventListener('click', () => this.saveEncounter());
        document.getElementById('runEncounter').addEventListener('click', () => this.runInCombat());

        // API Search
        let apiSearchTimeout;
        document.getElementById('encounterApiSearch')?.addEventListener('input', (e) => {
            clearTimeout(apiSearchTimeout);
            apiSearchTimeout = setTimeout(() => {
                this.searchApi(e.target.value);
            }, 500);
        });
    },

    getPartyConfig() {
        return {
            size: parseInt(document.getElementById('partySize').value) || 4,
            level: parseInt(document.getElementById('partyLevel').value) || 1
        };
    },

    updateXPThresholds() {
        const { size, level } = this.getPartyConfig();
        const thresholds = getXPThresholds(size, level);

        document.getElementById('easyXP').textContent = thresholds.easy + ' XP';
        document.getElementById('mediumXP').textContent = thresholds.medium + ' XP';
        document.getElementById('hardXP').textContent = thresholds.hard + ' XP';
        document.getElementById('deadlyXP').textContent = thresholds.deadly + ' XP';
    },

    renderMonsters() {
        const container = document.getElementById('recommendedMonsters');
        const selectedCR = document.getElementById('monsterCR').value;
        const selectedType = document.getElementById('monsterType').value;
        const { level } = this.getPartyConfig();

        // Filter monsters
        let monsters = MONSTERS_DATA.filter(m => {
            if (selectedCR && m.cr !== parseFloat(selectedCR)) return false;
            if (selectedType && m.type !== selectedType) return false;
            return true;
        });

        // Sort by relevance to party level (recommend appropriate CRs)
        const targetCR = this.getRecommendedCR(level);
        monsters.sort((a, b) => {
            const aDiff = Math.abs(a.cr - targetCR);
            const bDiff = Math.abs(b.cr - targetCR);
            return aDiff - bDiff;
        });

        // Limit to 50 monsters
        monsters = monsters.slice(0, 50);

        if (monsters.length === 0) {
            container.innerHTML = '<div class="empty-state small"><p>No monsters match filters</p></div>';
            return;
        }

        container.innerHTML = monsters.map(m => `
            <div class="monster-item" data-name="${m.name}" data-cr="${m.cr}" data-xp="${m.xp}" data-hp="${m.hp}" data-ac="${m.ac}">
                <div class="monster-info">
                    <span class="monster-name">${m.name}</span>
                    <span class="monster-meta">${m.type}</span>
                </div>
                <div>
                    <span class="monster-cr">CR ${this.formatCR(m.cr)}</span>
                    <span class="monster-xp">${m.xp} XP</span>
                </div>
            </div>
        `).join('');

        // Bind click events
        container.querySelectorAll('.monster-item').forEach(item => {
            item.addEventListener('click', () => {
                this.addMonster({
                    name: item.dataset.name,
                    cr: parseFloat(item.dataset.cr),
                    xp: parseInt(item.dataset.xp),
                    hp: parseInt(item.dataset.hp),
                    ac: parseInt(item.dataset.ac)
                });
            });
        });
    },

    getRecommendedCR(partyLevel) {
        // Rough guideline: party level / 4 for single monster
        // But for multiple monsters, lower CRs work better
        if (partyLevel <= 4) return 0.5;
        if (partyLevel <= 8) return 2;
        if (partyLevel <= 12) return 5;
        if (partyLevel <= 16) return 8;
        return 10;
    },

    formatCR(cr) {
        if (cr === 0.125) return '1/8';
        if (cr === 0.25) return '1/4';
        if (cr === 0.5) return '1/2';
        return cr.toString();
    },

    addMonster(monster) {
        const existing = this.currentEncounter.find(m => m.name === monster.name);
        if (existing) {
            existing.count++;
        } else {
            this.currentEncounter.push({ ...monster, count: 1 });
        }
        this.renderCurrentEncounter();
        showToast(`Added ${monster.name}`, 'success');
    },

    removeMonster(name) {
        this.currentEncounter = this.currentEncounter.filter(m => m.name !== name);
        this.renderCurrentEncounter();
    },

    adjustMonsterCount(name, delta) {
        const monster = this.currentEncounter.find(m => m.name === name);
        if (monster) {
            monster.count = Math.max(1, monster.count + delta);
            this.renderCurrentEncounter();
        }
    },

    renderCurrentEncounter() {
        const container = document.getElementById('encounterMonsters');

        if (this.currentEncounter.length === 0) {
            container.innerHTML = '<div class="empty-state small"><p>Click monsters to add them</p></div>';
            this.updateEncounterDifficulty();
            return;
        }

        container.innerHTML = this.currentEncounter.map(m => {
            const totalXP = (m.xp || 0) * (m.count || 1);
            return `
            <div class="encounter-monster">
                <div class="encounter-monster-info">
                    <span>${m.name}</span>
                    <span class="monster-xp">(${totalXP.toLocaleString()} XP)</span>
                </div>
                <div class="monster-count">
                    <button class="count-btn" data-name="${m.name}" data-delta="-1">−</button>
                    <span class="count-value">${m.count}</span>
                    <button class="count-btn" data-name="${m.name}" data-delta="1">+</button>
                    <span class="remove-monster" data-name="${m.name}">🗑️</span>
                </div>
            </div>
        `}).join('');

        // Bind events
        container.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.adjustMonsterCount(btn.dataset.name, parseInt(btn.dataset.delta));
            });
        });

        container.querySelectorAll('.remove-monster').forEach(btn => {
            btn.addEventListener('click', () => {
                this.removeMonster(btn.dataset.name);
            });
        });

        this.updateEncounterDifficulty();
    },

    updateEncounterDifficulty() {
        const totalMonsters = this.currentEncounter.reduce((sum, m) => sum + m.count, 0);
        const baseXP = this.currentEncounter.reduce((sum, m) => sum + (m.xp * m.count), 0);
        const multiplier = getEncounterMultiplier(totalMonsters);
        const adjustedXP = Math.floor(baseXP * multiplier);

        const { size, level } = this.getPartyConfig();
        const difficulty = getEncounterDifficulty(adjustedXP, size, level);

        document.getElementById('totalXP').textContent = `${adjustedXP} XP`;
        const badge = document.getElementById('encounterDifficulty');
        badge.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        badge.className = `difficulty-badge ${difficulty}`;
    },

    saveEncounter() {
        if (this.currentEncounter.length === 0) {
            showToast('No monsters in encounter', 'warning');
            return;
        }

        const name = prompt('Enter encounter name:');
        if (!name) return;

        this.savedEncounters.push({
            id: generateId(),
            name,
            monsters: [...this.currentEncounter],
            createdAt: new Date().toISOString()
        });

        this.saveState();
        this.renderSavedEncounters();
        showToast(`Encounter "${name}" saved!`, 'success');
    },

    renderSavedEncounters() {
        const container = document.getElementById('savedEncountersList');

        if (this.savedEncounters.length === 0) {
            container.innerHTML = '<div class="empty-state small"><p>No saved encounters yet</p></div>';
            return;
        }

        container.innerHTML = this.savedEncounters.map(enc => {
            const totalXP = enc.monsters.reduce((sum, m) => sum + (m.xp * m.count), 0);
            const monsterCount = enc.monsters.reduce((sum, m) => sum + m.count, 0);

            return `
                <div class="saved-encounter-card" data-id="${enc.id}">
                    <div class="saved-encounter-info">
                        <h4>${enc.name}</h4>
                        <span class="saved-encounter-meta">${monsterCount} monsters • ${totalXP} XP</span>
                    </div>
                    <div class="saved-encounter-actions">
                        <button class="btn btn-sm btn-secondary load-encounter">Load</button>
                        <button class="btn btn-sm btn-danger delete-encounter">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');

        // Bind events
        container.querySelectorAll('.saved-encounter-card').forEach(card => {
            const id = card.dataset.id;

            card.querySelector('.load-encounter').addEventListener('click', () => {
                this.loadEncounter(id);
            });

            card.querySelector('.delete-encounter').addEventListener('click', () => {
                this.deleteSavedEncounter(id);
            });
        });
    },

    loadEncounter(id) {
        const encounter = this.savedEncounters.find(e => e.id === id);
        if (encounter) {
            this.currentEncounter = encounter.monsters.map(m => ({ ...m }));
            this.renderCurrentEncounter();
            showToast(`Loaded "${encounter.name}"`, 'success');
        }
    },

    deleteSavedEncounter(id) {
        if (confirm('Delete this saved encounter?')) {
            this.savedEncounters = this.savedEncounters.filter(e => e.id !== id);
            this.saveState();
            this.renderSavedEncounters();
            showToast('Encounter deleted', 'warning');
        }
    },

    runInCombat() {
        if (this.currentEncounter.length === 0) {
            showToast('No monsters in encounter', 'warning');
            return;
        }

        Combat.loadEncounter(this.currentEncounter);

        // Switch to combat page
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-page="combat"]').classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page-combat').classList.add('active');
    },

    async searchApi(query) {
        const resultsContainer = document.getElementById('apiSearchResults');

        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        resultsContainer.innerHTML = '<div class="api-loading">Searching...</div>';

        try {
            const response = await fetch(`https://api.open5e.com/v1/monsters/?search=${encodeURIComponent(query)}&limit=10`);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                // Sort by relevance
                const sorted = data.results.sort((a, b) => {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    const q = query.toLowerCase();
                    if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
                    if (bName.startsWith(q) && !aName.startsWith(q)) return 1;
                    return aName.localeCompare(bName);
                });

                resultsContainer.innerHTML = sorted.slice(0, 8).map(m => {
                    const ac = this.getAC(m);
                    const xp = this.getCRXP(m.challenge_rating);
                    return `
                    <div class="api-monster-item" onclick="Encounters.addApiMonster('${m.name.replace(/'/g, "\\'")}', ${m.hit_points}, ${ac}, '${m.challenge_rating}', ${xp})">
                        <span class="api-monster-name">${m.name}</span>
                        <span class="api-monster-info">CR ${m.challenge_rating} • ${xp} XP</span>
                    </div>
                `}).join('');
            } else {
                resultsContainer.innerHTML = '<div class="api-no-results">No monsters found</div>';
            }
        } catch (error) {
            resultsContainer.innerHTML = '<div class="api-error">Search failed - check connection</div>';
        }
    },

    getCRXP(cr) {
        const xpByCR = {
            '0': 10, '1/8': 25, '1/4': 50, '1/2': 100,
            '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800,
            '6': 2300, '7': 2900, '8': 3900, '9': 5000, '10': 5900,
            '11': 7200, '12': 8400, '13': 10000, '14': 11500, '15': 13000,
            '16': 15000, '17': 18000, '18': 20000, '19': 22000, '20': 25000,
            '21': 33000, '22': 41000, '23': 50000, '24': 62000, '25': 75000,
            '26': 90000, '27': 105000, '28': 120000, '29': 135000, '30': 155000
        };
        return xpByCR[String(cr)] || 0;
    },

    getAC(monster) {
        if (typeof monster.armor_class === 'number') return monster.armor_class;
        if (monster.armor_class && typeof monster.armor_class === 'object') {
            return monster.armor_class.value || monster.armor_class[0]?.value || 10;
        }
        return 10;
    },

    addApiMonster(name, hp, ac, cr, xp) {
        // Check if monster already exists
        const existing = this.currentEncounter.find(m => m.name === name);
        if (existing) {
            existing.count++;
        } else {
            this.currentEncounter.push({
                name: name,
                hp: hp || 10,
                ac: ac || 10,
                cr: cr,
                xp: xp || 0,
                count: 1
            });
        }
        this.renderCurrentEncounter();
        showToast(`${name} added to encounter!`, 'success');

        // Clear search
        document.getElementById('encounterApiSearch').value = '';
        document.getElementById('apiSearchResults').innerHTML = '';
    }
};
