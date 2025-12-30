// Compendium Module - Open5e API Integration
const Compendium = {
    currentTab: 'monsters',
    favorites: { monsters: [], spells: [] },
    searchTimeout: null,

    init() {
        this.loadFavorites();
        this.bindEvents();
        this.showWelcome();
    },

    loadFavorites() {
        const saved = localStorage.getItem('dnd-compendium-favorites');
        if (saved) {
            this.favorites = JSON.parse(saved);
        }
    },

    saveFavorites() {
        localStorage.setItem('dnd-compendium-favorites', JSON.stringify(this.favorites));
    },

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.compendium-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Search input
        document.getElementById('compendiumSearch')?.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.search(e.target.value);
            }, 500);
        });

        // Show favorites toggle
        document.getElementById('showCompendiumFavorites')?.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.showFavorites();
            } else {
                this.showWelcome();
            }
        });

        // Spell filters
        document.getElementById('compendiumSpellLevel')?.addEventListener('change', () => {
            const query = document.getElementById('compendiumSearch').value;
            if (query) this.search(query);
        });
        document.getElementById('compendiumSpellSchool')?.addEventListener('change', () => {
            const query = document.getElementById('compendiumSearch').value;
            if (query) this.search(query);
        });
    },

    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.compendium-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.compendium-tab[data-tab="${tab}"]`).classList.add('active');

        // Clear search and results
        document.getElementById('compendiumSearch').value = '';
        document.getElementById('compendiumSearch').placeholder =
            tab === 'monsters' ? 'Search monsters... (e.g., dragon, goblin)' : 'Search spells... (e.g., fireball, cure)';

        // Show/hide spell filters
        const spellFilters = document.getElementById('spellFilters');
        if (spellFilters) {
            spellFilters.style.display = tab === 'spells' ? 'flex' : 'none';
        }

        const showFav = document.getElementById('showCompendiumFavorites');
        if (showFav && showFav.checked) {
            this.showFavorites();
        } else {
            this.showWelcome();
        }
    },

    showWelcome() {
        const container = document.getElementById('compendiumResults');
        const icon = this.currentTab === 'monsters' ? '👹' : '✨';
        const type = this.currentTab === 'monsters' ? 'monsters' : 'spells';
        container.innerHTML = `
            <div class="compendium-welcome">
                <span class="welcome-icon">${icon}</span>
                <h3>Search ${type}</h3>
                <p>Type in the search bar above to find ${type} from the D&D 5e SRD</p>
                <small>Powered by Open5e API</small>
            </div>
        `;
    },

    showLoading() {
        const container = document.getElementById('compendiumResults');
        container.innerHTML = `
            <div class="compendium-loading">
                <div class="loading-spinner"></div>
                <p>Searching...</p>
            </div>
        `;
    },

    async search(query) {
        if (query.length < 1) {
            this.showWelcome();
            return;
        }

        this.showLoading();
        this.lastQuery = query.toLowerCase();

        try {
            const endpoint = this.currentTab === 'monsters'
                ? `https://api.open5e.com/v1/monsters/?search=${encodeURIComponent(query)}&limit=50`
                : `https://api.open5e.com/v1/spells/?search=${encodeURIComponent(query)}&limit=50`;

            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                // Sort by relevance - exact matches first, then starts with, then contains
                const sorted = data.results.sort((a, b) => {
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    const q = this.lastQuery;

                    // Exact match
                    if (aName === q) return -1;
                    if (bName === q) return 1;

                    // Starts with query
                    const aStarts = aName.startsWith(q);
                    const bStarts = bName.startsWith(q);
                    if (aStarts && !bStarts) return -1;
                    if (bStarts && !aStarts) return 1;

                    // Alphabetical among similar matches
                    return aName.localeCompare(bName);
                });

                // Apply spell filters if on spells tab
                let filtered = sorted;
                if (this.currentTab === 'spells') {
                    const levelFilter = document.getElementById('compendiumSpellLevel')?.value;
                    const schoolFilter = document.getElementById('compendiumSpellSchool')?.value;

                    if (levelFilter) {
                        filtered = filtered.filter(s => {
                            if (levelFilter === '0') return s.level === 'Cantrip' || s.level_int === 0;
                            return s.level_int === parseInt(levelFilter);
                        });
                    }
                    if (schoolFilter) {
                        filtered = filtered.filter(s => s.school === schoolFilter);
                    }
                }

                if (filtered.length > 0) {
                    this.renderResults(filtered.slice(0, 20));
                } else {
                    this.showNoResults(query);
                }
            } else {
                this.showNoResults(query);
            }
        } catch (error) {
            console.error('API Error:', error);
            this.showError();
        }
    },

    showNoResults(query) {
        const container = document.getElementById('compendiumResults');
        container.innerHTML = `
            <div class="compendium-welcome">
                <span class="welcome-icon">🔍</span>
                <h3>No results found</h3>
                <p>No ${this.currentTab} found for "${query}"</p>
                <small>Try a different search term</small>
            </div>
        `;
    },

    showError() {
        const container = document.getElementById('compendiumResults');
        container.innerHTML = `
            <div class="compendium-welcome error">
                <span class="welcome-icon">⚠️</span>
                <h3>Connection Error</h3>
                <p>Could not reach the Open5e API</p>
                <small>Please check your internet connection</small>
            </div>
        `;
    },

    renderResults(results) {
        const container = document.getElementById('compendiumResults');

        if (this.currentTab === 'monsters') {
            container.innerHTML = results.map(monster => this.renderMonsterCard(monster)).join('');
        } else {
            container.innerHTML = results.map(spell => this.renderSpellCard(spell)).join('');
        }
    },

    renderMonsterCard(monster) {
        const isFavorite = this.favorites.monsters.some(f => f.slug === monster.slug);

        return `
            <div class="monster-card" data-slug="${monster.slug}">
                <div class="monster-header">
                    <div class="monster-title">
                        <h3>${monster.name}</h3>
                        <span class="monster-type">${monster.size} ${monster.type}${monster.subtype ? ` (${monster.subtype})` : ''}</span>
                    </div>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            onclick="Compendium.toggleFavorite('monsters', ${JSON.stringify(monster).replace(/"/g, '&quot;')})">
                        ${isFavorite ? '⭐' : '☆'}
                    </button>
                </div>
                
                <div class="monster-stats">
                    <div class="stat-block">
                        <span class="stat-label">AC</span>
                        <span class="stat-value">${monster.armor_class}</span>
                    </div>
                    <div class="stat-block">
                        <span class="stat-label">HP</span>
                        <span class="stat-value">${monster.hit_points}</span>
                    </div>
                    <div class="stat-block">
                        <span class="stat-label">CR</span>
                        <span class="stat-value">${monster.challenge_rating}</span>
                    </div>
                </div>

                <div class="monster-speed">
                    <span class="detail-label">Speed:</span> ${this.formatSpeed(monster.speed)}
                </div>

                <div class="ability-scores">
                    <div class="ability"><span>STR</span><strong>${monster.strength}</strong></div>
                    <div class="ability"><span>DEX</span><strong>${monster.dexterity}</strong></div>
                    <div class="ability"><span>CON</span><strong>${monster.constitution}</strong></div>
                    <div class="ability"><span>INT</span><strong>${monster.intelligence}</strong></div>
                    <div class="ability"><span>WIS</span><strong>${monster.wisdom}</strong></div>
                    <div class="ability"><span>CHA</span><strong>${monster.charisma}</strong></div>
                </div>

                ${monster.actions && monster.actions.length > 0 ? `
                    <div class="monster-actions">
                        <h4>Actions</h4>
                        ${monster.actions.slice(0, 3).map(action => `
                            <div class="action-item">
                                <strong>${action.name}.</strong> ${action.desc.substring(0, 200)}${action.desc.length > 200 ? '...' : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="monster-add-encounter">
                    <button class="add-encounter-btn" onclick="Compendium.addToEncounter('${monster.name.replace(/'/g, "\\'")}', ${monster.hit_points}, ${monster.armor_class}, '${monster.challenge_rating}')">
                        ⚔️ Add to Encounter
                    </button>
                </div>
            </div>
        `;
    },

    renderSpellCard(spell) {
        const isFavorite = this.favorites.spells.some(f => f.slug === spell.slug);

        return `
            <div class="spell-card-comp" data-slug="${spell.slug}">
                <div class="spell-header-comp">
                    <div class="spell-title-comp">
                        <h3>${spell.name}</h3>
                        <span class="spell-level-comp">${spell.level === 'Cantrip' ? 'Cantrip' : `Level ${spell.level_int}`} ${spell.school}</span>
                    </div>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            onclick="Compendium.toggleFavorite('spells', ${JSON.stringify(spell).replace(/"/g, '&quot;')})">
                        ${isFavorite ? '⭐' : '☆'}
                    </button>
                </div>
                
                <div class="spell-meta-comp">
                    <div class="meta-item">
                        <span class="meta-label">Casting Time</span>
                        <span class="meta-value">${spell.casting_time}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Range</span>
                        <span class="meta-value">${spell.range}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Components</span>
                        <span class="meta-value">${spell.components}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Duration</span>
                        <span class="meta-value">${spell.duration}</span>
                    </div>
                </div>

                <div class="spell-description-comp">
                    ${spell.desc.substring(0, 400)}${spell.desc.length > 400 ? '...' : ''}
                </div>

                ${spell.higher_level ? `
                    <div class="spell-higher-level">
                        <strong>At Higher Levels.</strong> ${spell.higher_level.substring(0, 200)}${spell.higher_level.length > 200 ? '...' : ''}
                    </div>
                ` : ''}

                <div class="spell-classes-comp">
                    ${spell.dnd_class.split(',').map(c => `<span class="class-tag">${c.trim()}</span>`).join('')}
                </div>
            </div>
        `;
    },

    formatSpeed(speed) {
        if (typeof speed === 'object') {
            return Object.entries(speed).map(([type, value]) =>
                type === 'walk' ? `${value} ft.` : `${type} ${value} ft.`
            ).join(', ');
        }
        return speed;
    },

    toggleFavorite(type, item) {
        const index = this.favorites[type].findIndex(f => f.slug === item.slug);

        if (index >= 0) {
            this.favorites[type].splice(index, 1);
            showToast(`Removed from favorites`, 'warning');
        } else {
            this.favorites[type].push(item);
            showToast(`Added to favorites!`, 'success');
        }

        this.saveFavorites();

        // Re-render current view
        const showFav = document.getElementById('showCompendiumFavorites');
        if (showFav && showFav.checked) {
            this.showFavorites();
        } else {
            // Update just the button
            const card = document.querySelector(`[data-slug="${item.slug}"]`);
            if (card) {
                const btn = card.querySelector('.favorite-btn');
                const isFav = this.favorites[type].some(f => f.slug === item.slug);
                btn.classList.toggle('active', isFav);
                btn.textContent = isFav ? '⭐' : '☆';
            }
        }
    },

    showFavorites() {
        const container = document.getElementById('compendiumResults');
        const items = this.favorites[this.currentTab];

        if (items.length === 0) {
            container.innerHTML = `
                <div class="compendium-welcome">
                    <span class="welcome-icon">⭐</span>
                    <h3>No favorites yet</h3>
                    <p>Search for ${this.currentTab} and click the star to add them here</p>
                </div>
            `;
            return;
        }

        this.renderResults(items);
    },

    addToEncounter(name, hp, ac, cr) {
        // Add monster to Combat Tracker
        if (typeof Combat !== 'undefined' && Combat.addCombatant) {
            Combat.addCombatant({
                name: name,
                hp: hp,
                maxHp: hp,
                ac: ac,
                initiative: Math.floor(Math.random() * 20) + 1,
                isNPC: true,
                conditions: []
            });
            showToast(`${name} added to Combat!`, 'success');
        } else {
            // Fallback - add to localStorage for encounters
            const encounters = JSON.parse(localStorage.getItem('dnd_saved_encounters') || '[]');
            const current = encounters.find(e => e.name === 'Compendium Monsters') || {
                name: 'Compendium Monsters',
                monsters: [],
                createdAt: new Date().toISOString()
            };

            current.monsters.push({ name, hp, ac, cr });

            const idx = encounters.findIndex(e => e.name === 'Compendium Monsters');
            if (idx >= 0) {
                encounters[idx] = current;
            } else {
                encounters.push(current);
            }

            localStorage.setItem('dnd_saved_encounters', JSON.stringify(encounters));
            showToast(`${name} saved to Compendium Monsters encounter!`, 'success');
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    Compendium.init();
});
