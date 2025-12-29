// Custom Entries Module - Allows users to add their own monsters, spells, and encounters
const CustomEntries = {
    customMonsters: [],
    customSpells: [],

    init() {
        this.loadFromStorage();
        this.bindEvents();
    },

    loadFromStorage() {
        this.customMonsters = JSON.parse(localStorage.getItem('dnd-custom-monsters') || '[]');
        this.customSpells = JSON.parse(localStorage.getItem('dnd-custom-spells') || '[]');

        // Merge custom monsters into MONSTERS_DATA
        this.mergeCustomMonsters();
        // Merge custom spells into SpellsData
        this.mergeCustomSpells();
    },

    saveMonsters() {
        localStorage.setItem('dnd-custom-monsters', JSON.stringify(this.customMonsters));
    },

    saveSpells() {
        localStorage.setItem('dnd-custom-spells', JSON.stringify(this.customSpells));
    },

    mergeCustomMonsters() {
        // Remove old custom monsters and add current ones
        const baseMonsters = MONSTERS_DATA.filter(m => !m.isCustom);
        MONSTERS_DATA.length = 0;
        MONSTERS_DATA.push(...baseMonsters, ...this.customMonsters.map(m => ({ ...m, isCustom: true })));
    },

    mergeCustomSpells() {
        if (typeof SpellsData !== 'undefined') {
            const baseSpells = SpellsData.spells.filter(s => !s.isCustom);
            SpellsData.spells.length = 0;
            SpellsData.spells.push(...baseSpells, ...this.customSpells.map(s => ({ ...s, isCustom: true })));
        }
    },

    bindEvents() {
        // Add Monster Button
        document.getElementById('addCustomMonster')?.addEventListener('click', () => {
            this.openMonsterModal();
        });

        // Add Spell Button
        document.getElementById('addCustomSpell')?.addEventListener('click', () => {
            this.openSpellModal();
        });
    },

    // ========== CUSTOM MONSTER ==========
    openMonsterModal(existingMonster = null) {
        const isEdit = !!existingMonster;
        const monster = existingMonster || {
            name: '',
            cr: 1,
            xp: 200,
            type: 'humanoid',
            hp: 20,
            ac: 12
        };

        const modalHtml = `
            <div id="customMonsterModal" class="modal active">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${isEdit ? 'Edit Monster' : 'Add Custom Monster'}</h3>
                        <button class="modal-close" onclick="document.getElementById('customMonsterModal').remove()">&times;</button>
                    </div>
                    <form id="customMonsterForm" class="modal-form">
                        <div class="form-group">
                            <label for="monsterName">Name *</label>
                            <input type="text" id="monsterName" value="${monster.name}" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="monsterCRVal">Challenge Rating</label>
                                <select id="monsterCRVal">
                                    <option value="0" ${monster.cr === 0 ? 'selected' : ''}>0</option>
                                    <option value="0.125" ${monster.cr === 0.125 ? 'selected' : ''}>1/8</option>
                                    <option value="0.25" ${monster.cr === 0.25 ? 'selected' : ''}>1/4</option>
                                    <option value="0.5" ${monster.cr === 0.5 ? 'selected' : ''}>1/2</option>
                                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(cr =>
            `<option value="${cr}" ${monster.cr === cr ? 'selected' : ''}>${cr}</option>`
        ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="monsterXP">XP</label>
                                <input type="number" id="monsterXP" value="${monster.xp}" min="0">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="monsterHP">Hit Points</label>
                                <input type="number" id="monsterHP" value="${monster.hp}" min="1">
                            </div>
                            <div class="form-group">
                                <label for="monsterAC">Armor Class</label>
                                <input type="number" id="monsterAC" value="${monster.ac}" min="1">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="monsterTypeVal">Type</label>
                            <select id="monsterTypeVal">
                                ${['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'undead'].map(t =>
            `<option value="${t}" ${monster.type === t ? 'selected' : ''}>${t.charAt(0).toUpperCase() + t.slice(1)}</option>`
        ).join('')}
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('customMonsterModal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Monster</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('customMonsterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMonsterFromForm(isEdit ? monster.name : null);
        });
    },

    saveMonsterFromForm(originalName) {
        const newMonster = {
            name: document.getElementById('monsterName').value.trim(),
            cr: parseFloat(document.getElementById('monsterCRVal').value),
            xp: parseInt(document.getElementById('monsterXP').value) || 0,
            hp: parseInt(document.getElementById('monsterHP').value) || 1,
            ac: parseInt(document.getElementById('monsterAC').value) || 10,
            type: document.getElementById('monsterTypeVal').value,
            isCustom: true
        };

        if (!newMonster.name) {
            showToast('Monster name is required', 'warning');
            return;
        }

        // Remove existing if editing
        if (originalName) {
            this.customMonsters = this.customMonsters.filter(m => m.name !== originalName);
        }

        // Check for duplicate
        const exists = this.customMonsters.find(m => m.name === newMonster.name);
        if (exists && !originalName) {
            showToast('A monster with this name already exists', 'warning');
            return;
        }

        this.customMonsters.push(newMonster);
        this.saveMonsters();
        this.mergeCustomMonsters();

        document.getElementById('customMonsterModal').remove();
        showToast(`Monster "${newMonster.name}" saved!`, 'success');

        // Refresh encounters list if available
        if (typeof Encounters !== 'undefined') {
            Encounters.renderMonsters();
        }
    },

    deleteMonster(name) {
        this.customMonsters = this.customMonsters.filter(m => m.name !== name);
        this.saveMonsters();
        this.mergeCustomMonsters();
        showToast('Monster deleted', 'info');
    },

    // ========== CUSTOM SPELL ==========
    openSpellModal(existingSpell = null) {
        const isEdit = !!existingSpell;
        const spell = existingSpell || {
            name: '',
            level: 1,
            school: 'Evocation',
            castingTime: '1 action',
            range: '60 feet',
            components: 'V, S',
            duration: 'Instantaneous',
            classes: ['Wizard'],
            description: ''
        };

        const modalHtml = `
            <div id="customSpellModal" class="modal active">
                <div class="modal-content modal-large">
                    <div class="modal-header">
                        <h3>${isEdit ? 'Edit Spell' : 'Add Custom Spell'}</h3>
                        <button class="modal-close" onclick="document.getElementById('customSpellModal').remove()">&times;</button>
                    </div>
                    <form id="customSpellForm" class="modal-form">
                        <div class="form-row">
                            <div class="form-group" style="flex: 2;">
                                <label for="spellName">Name *</label>
                                <input type="text" id="spellName" value="${spell.name}" required>
                            </div>
                            <div class="form-group">
                                <label for="spellLevelVal">Level</label>
                                <select id="spellLevelVal">
                                    <option value="0" ${spell.level === 0 ? 'selected' : ''}>Cantrip</option>
                                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(l =>
            `<option value="${l}" ${spell.level === l ? 'selected' : ''}>${l}st${l === 1 ? '' : l === 2 ? 'nd' : l === 3 ? 'rd' : 'th'} Level</option>`
        ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="spellSchoolVal">School</label>
                                <select id="spellSchoolVal">
                                    ${['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'].map(s =>
            `<option value="${s}" ${spell.school === s ? 'selected' : ''}>${s}</option>`
        ).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="spellCasting">Casting Time</label>
                                <input type="text" id="spellCasting" value="${spell.castingTime}">
                            </div>
                            <div class="form-group">
                                <label for="spellRange">Range</label>
                                <input type="text" id="spellRange" value="${spell.range}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="spellComponents">Components</label>
                                <input type="text" id="spellComponents" value="${spell.components}">
                            </div>
                            <div class="form-group">
                                <label for="spellDuration">Duration</label>
                                <input type="text" id="spellDuration" value="${spell.duration}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Classes</label>
                            <div class="checkbox-grid">
                                ${['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'].map(c => `
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="spellClasses" value="${c}" ${spell.classes.includes(c) ? 'checked' : ''}>
                                        ${c}
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="spellDesc">Description *</label>
                            <textarea id="spellDesc" rows="4" required>${spell.description}</textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('customSpellModal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Spell</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('customSpellForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSpellFromForm(isEdit ? spell.name : null);
        });
    },

    saveSpellFromForm(originalName) {
        const checkedClasses = Array.from(document.querySelectorAll('input[name="spellClasses"]:checked')).map(cb => cb.value);

        const newSpell = {
            name: document.getElementById('spellName').value.trim(),
            level: parseInt(document.getElementById('spellLevelVal').value),
            school: document.getElementById('spellSchoolVal').value,
            castingTime: document.getElementById('spellCasting').value,
            range: document.getElementById('spellRange').value,
            components: document.getElementById('spellComponents').value,
            duration: document.getElementById('spellDuration').value,
            classes: checkedClasses.length > 0 ? checkedClasses : ['Wizard'],
            description: document.getElementById('spellDesc').value.trim(),
            isCustom: true
        };

        if (!newSpell.name || !newSpell.description) {
            showToast('Spell name and description are required', 'warning');
            return;
        }

        // Remove existing if editing
        if (originalName) {
            this.customSpells = this.customSpells.filter(s => s.name !== originalName);
        }

        // Check for duplicate
        const exists = this.customSpells.find(s => s.name === newSpell.name);
        if (exists && !originalName) {
            showToast('A spell with this name already exists', 'warning');
            return;
        }

        this.customSpells.push(newSpell);
        this.saveSpells();
        this.mergeCustomSpells();

        document.getElementById('customSpellModal').remove();
        showToast(`Spell "${newSpell.name}" saved!`, 'success');

        // Refresh spells list if available
        if (typeof Spells !== 'undefined') {
            Spells.render();
        }
    },

    deleteSpell(name) {
        this.customSpells = this.customSpells.filter(s => s.name !== name);
        this.saveSpells();
        this.mergeCustomSpells();
        showToast('Spell deleted', 'info');
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    CustomEntries.init();
});
