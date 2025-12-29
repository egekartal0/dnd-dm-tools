// Spell Lookup Module
const Spells = {
    favorites: [],
    currentFilter: {
        search: '',
        level: '',
        school: '',
        class: ''
    },

    init() {
        this.loadFavorites();
        this.bindEvents();
        this.render();
    },

    loadFavorites() {
        const saved = localStorage.getItem('dnd-spell-favorites');
        this.favorites = saved ? JSON.parse(saved) : [];
    },

    saveFavorites() {
        localStorage.setItem('dnd-spell-favorites', JSON.stringify(this.favorites));
    },

    bindEvents() {
        // Search
        document.getElementById('spellSearch')?.addEventListener('input', (e) => {
            this.currentFilter.search = e.target.value.toLowerCase();
            this.render();
        });

        // Level filter
        document.getElementById('spellLevel')?.addEventListener('change', (e) => {
            this.currentFilter.level = e.target.value;
            this.render();
        });

        // School filter
        document.getElementById('spellSchool')?.addEventListener('change', (e) => {
            this.currentFilter.school = e.target.value;
            this.render();
        });

        // Class filter
        document.getElementById('spellClass')?.addEventListener('change', (e) => {
            this.currentFilter.class = e.target.value;
            this.render();
        });

        // Show favorites only
        document.getElementById('showFavorites')?.addEventListener('change', (e) => {
            this.currentFilter.favoritesOnly = e.target.checked;
            this.render();
        });

        // Clear filters
        document.getElementById('clearSpellFilters')?.addEventListener('click', () => {
            this.clearFilters();
        });
    },

    clearFilters() {
        this.currentFilter = { search: '', level: '', school: '', class: '' };
        document.getElementById('spellSearch').value = '';
        document.getElementById('spellLevel').value = '';
        document.getElementById('spellSchool').value = '';
        document.getElementById('spellClass').value = '';
        document.getElementById('showFavorites').checked = false;
        this.render();
    },

    getFilteredSpells() {
        let spells = SpellsData.spells;

        // Search filter
        if (this.currentFilter.search) {
            spells = spells.filter(s =>
                s.name.toLowerCase().includes(this.currentFilter.search) ||
                s.description.toLowerCase().includes(this.currentFilter.search)
            );
        }

        // Level filter
        if (this.currentFilter.level !== '') {
            const level = parseInt(this.currentFilter.level);
            spells = spells.filter(s => s.level === level);
        }

        // School filter
        if (this.currentFilter.school) {
            spells = spells.filter(s => s.school === this.currentFilter.school);
        }

        // Class filter
        if (this.currentFilter.class) {
            spells = spells.filter(s => s.classes.includes(this.currentFilter.class));
        }

        // Favorites only
        if (this.currentFilter.favoritesOnly) {
            spells = spells.filter(s => this.favorites.includes(s.name));
        }

        return spells;
    },

    render() {
        const container = document.getElementById('spellsList');
        if (!container) return;

        const spells = this.getFilteredSpells();

        if (spells.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span>📚</span>
                    <p>No spells found</p>
                    <small>Try adjusting your filters</small>
                </div>
            `;
            return;
        }

        container.innerHTML = spells.map(spell => {
            const escapedName = spell.name.replace(/'/g, "\\'").replace(/"/g, "&quot;");
            return `
            <div class="spell-card" data-spell="${escapedName}">
                <div class="spell-header" onclick="Spells.toggleSpell(this)">
                    <div class="spell-title">
                        <button class="favorite-btn ${this.favorites.includes(spell.name) ? 'active' : ''}" 
                                onclick="event.stopPropagation(); Spells.toggleFavorite('${escapedName}')">
                            ${this.favorites.includes(spell.name) ? '⭐' : '☆'}
                        </button>
                        <h4>${spell.name}</h4>
                        <span class="spell-level-badge level-${spell.level}">${spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}</span>
                    </div>
                    <div class="spell-meta">
                        <span class="spell-school">${spell.school}</span>
                        <span class="spell-expand">▼</span>
                    </div>
                </div>
                <div class="spell-content">
                    <div class="spell-stats">
                        <div class="spell-stat">
                            <span class="stat-label">Casting Time</span>
                            <span class="stat-value">${spell.castingTime}</span>
                        </div>
                        <div class="spell-stat">
                            <span class="stat-label">Range</span>
                            <span class="stat-value">${spell.range}</span>
                        </div>
                        <div class="spell-stat">
                            <span class="stat-label">Components</span>
                            <span class="stat-value">${spell.components}</span>
                        </div>
                        <div class="spell-stat">
                            <span class="stat-label">Duration</span>
                            <span class="stat-value">${spell.duration}</span>
                        </div>
                    </div>
                    <div class="spell-description">
                        <p>${spell.description}</p>
                    </div>
                    <div class="spell-classes">
                        <span class="classes-label">Classes:</span>
                        ${spell.classes.map(c => `<span class="class-tag">${c}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        }).join('');

        // Update count
        const countEl = document.getElementById('spellCount');
        if (countEl) {
            countEl.textContent = `${spells.length} spells found`;
        }
    },

    toggleSpell(headerElement) {
        const card = headerElement.closest('.spell-card');
        if (card) {
            // Close other expanded cards
            document.querySelectorAll('.spell-card.expanded').forEach(c => {
                if (c !== card) c.classList.remove('expanded');
            });
            card.classList.toggle('expanded');
        }
    },

    toggleFavorite(name) {
        const index = this.favorites.indexOf(name);
        if (index >= 0) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(name);
        }
        this.saveFavorites();
        this.render();
    },

    getSpellByName(name) {
        return SpellsData.spells.find(s => s.name.toLowerCase() === name.toLowerCase());
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    Spells.init();
});
