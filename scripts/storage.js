// Storage Module - localStorage & JSON export/import

const Storage = {
    KEYS: {
        COMBATANTS: 'dnd_combatants',
        CURRENT_ROUND: 'dnd_current_round',
        SAVED_ENCOUNTERS: 'dnd_saved_encounters',
        NOTES: 'dnd_notes',
        PARTY_CONFIG: 'dnd_party_config',
        SETTINGS: 'dnd_settings'
    },

    // Get data from localStorage
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Storage get error:', e);
            return defaultValue;
        }
    },

    // Save data to localStorage
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    // Remove data from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    // Export all data as JSON
    exportData() {
        const data = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            // Combat & Encounters
            combatants: this.get(this.KEYS.COMBATANTS, []),
            currentRound: this.get(this.KEYS.CURRENT_ROUND, 1),
            savedEncounters: this.get(this.KEYS.SAVED_ENCOUNTERS, []),
            // Notes & Settings
            notes: this.get(this.KEYS.NOTES, []),
            partyConfig: this.get(this.KEYS.PARTY_CONFIG, { size: 4, level: 1 }),
            settings: this.get(this.KEYS.SETTINGS, {}),
            // NPCs
            npcs: JSON.parse(localStorage.getItem('dnd-saved-npcs') || '[]'),
            // Maps
            maps: JSON.parse(localStorage.getItem('dnd-saved-maps') || '[]'),
            // Shops
            shops: JSON.parse(localStorage.getItem('dnd-shops') || '[]'),
            // Spell Favorites
            spellFavorites: JSON.parse(localStorage.getItem('dnd-spell-favorites') || '[]'),
            // Custom Monsters & Spells
            customMonsters: JSON.parse(localStorage.getItem('dnd-custom-monsters') || '[]'),
            customSpells: JSON.parse(localStorage.getItem('dnd-custom-spells') || '[]')
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dnd-dm-tools-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('All data exported!', 'success');
    },

    // Import data from JSON file
    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    // Validate data structure
                    if (!data.version) {
                        throw new Error('Invalid backup file format');
                    }

                    // Import all data
                    if (data.combatants) this.set(this.KEYS.COMBATANTS, data.combatants);
                    if (data.currentRound) this.set(this.KEYS.CURRENT_ROUND, data.currentRound);
                    if (data.savedEncounters) this.set(this.KEYS.SAVED_ENCOUNTERS, data.savedEncounters);
                    if (data.notes) this.set(this.KEYS.NOTES, data.notes);
                    if (data.partyConfig) this.set(this.KEYS.PARTY_CONFIG, data.partyConfig);
                    if (data.settings) this.set(this.KEYS.SETTINGS, data.settings);
                    // NPCs, Maps, Shops
                    if (data.npcs) localStorage.setItem('dnd-saved-npcs', JSON.stringify(data.npcs));
                    if (data.maps) localStorage.setItem('dnd-saved-maps', JSON.stringify(data.maps));
                    if (data.shops) localStorage.setItem('dnd-shops', JSON.stringify(data.shops));
                    // Spell Favorites & Custom entries
                    if (data.spellFavorites) localStorage.setItem('dnd-spell-favorites', JSON.stringify(data.spellFavorites));
                    if (data.customMonsters) localStorage.setItem('dnd-custom-monsters', JSON.stringify(data.customMonsters));
                    if (data.customSpells) localStorage.setItem('dnd-custom-spells', JSON.stringify(data.customSpells));

                    showToast('All data imported! Refreshing...', 'success');
                    setTimeout(() => location.reload(), 1000);
                    resolve(data);
                } catch (error) {
                    showToast('Failed to import: ' + error.message, 'error');
                    reject(error);
                }
            };

            reader.onerror = () => {
                showToast('Failed to read file', 'error');
                reject(new Error('File read error'));
            };

            reader.readAsText(file);
        });
    },

    // Clear all data
    clearAll() {
        Object.values(this.KEYS).forEach(key => this.remove(key));
        showToast('All data cleared', 'warning');
    }
};

// Toast notification helper
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
