// Combat Tracker Module

const Combat = {
    combatants: [],
    currentRound: 1,
    currentTurnIndex: 0,

    init() {
        this.loadState();
        this.bindEvents();
        this.render();
    },

    loadState() {
        this.combatants = Storage.get(Storage.KEYS.COMBATANTS, []);
        this.currentRound = Storage.get(Storage.KEYS.CURRENT_ROUND, 1);
        document.getElementById('currentRound').textContent = this.currentRound;
    },

    saveState() {
        Storage.set(Storage.KEYS.COMBATANTS, this.combatants);
        Storage.set(Storage.KEYS.CURRENT_ROUND, this.currentRound);
    },

    bindEvents() {
        // Add combatant button
        document.getElementById('addCombatant').addEventListener('click', () => this.openModal());

        // Clear combat
        document.getElementById('clearCombat').addEventListener('click', () => {
            if (confirm('Clear all combatants?')) {
                this.combatants = [];
                this.currentRound = 1;
                this.currentTurnIndex = 0;
                this.saveState();
                this.render();
                document.getElementById('currentRound').textContent = 1;
            }
        });

        // Round controls
        document.getElementById('nextRound').addEventListener('click', () => {
            this.currentRound++;
            document.getElementById('currentRound').textContent = this.currentRound;
            this.saveState();
        });

        document.getElementById('prevRound').addEventListener('click', () => {
            if (this.currentRound > 1) {
                this.currentRound--;
                document.getElementById('currentRound').textContent = this.currentRound;
                this.saveState();
            }
        });

        // Modal events
        const modal = document.getElementById('combatantModal');
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        modal.querySelector('.modal-cancel').addEventListener('click', () => this.closeModal());

        document.getElementById('combatantForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCombatant();
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
    },

    openModal() {
        document.getElementById('combatantModal').classList.add('active');
        document.getElementById('combatantName').focus();
    },

    closeModal() {
        document.getElementById('combatantModal').classList.remove('active');
        document.getElementById('combatantForm').reset();
    },

    addCombatant() {
        const combatant = {
            id: generateId(),
            name: document.getElementById('combatantName').value,
            initiative: parseInt(document.getElementById('combatantInit').value) || 0,
            ac: parseInt(document.getElementById('combatantAC').value) || 10,
            hp: parseInt(document.getElementById('combatantHP').value) || 1,
            maxHp: parseInt(document.getElementById('combatantMaxHP').value) || 1,
            type: document.getElementById('combatantType').value,
            conditions: [],
            deathSaves: { successes: 0, failures: 0 }
        };

        this.combatants.push(combatant);
        this.sortByInitiative();
        this.saveState();
        this.render();
        this.closeModal();
        showToast(`${combatant.name} added to combat!`, 'success');
    },

    sortByInitiative() {
        this.combatants.sort((a, b) => b.initiative - a.initiative);
    },

    render() {
        const container = document.getElementById('initiativeList');

        if (this.combatants.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">⚔️</span>
                    <p>No combatants yet</p>
                    <p class="empty-hint">Click "Add Combatant" to start tracking combat</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.combatants.map((c, index) => this.renderCombatant(c, index)).join('');
        this.bindCombatantEvents();
    },

    renderCombatant(combatant, index) {
        const hpPercent = Math.max(0, (combatant.hp / combatant.maxHp) * 100);
        const hpClass = hpPercent <= 25 ? 'danger' : hpPercent <= 50 ? 'warning' : '';
        const isDead = combatant.hp <= 0;
        const isActive = index === this.currentTurnIndex;

        return `
            <div class="combatant-card ${combatant.type} ${isDead ? 'dead' : ''} ${isActive ? 'active-turn' : ''}" 
                 data-id="${combatant.id}" draggable="true">
                <div class="initiative-badge">
                    <span class="initiative-value">${combatant.initiative}</span>
                    <span class="initiative-label">INIT</span>
                </div>
                <div class="combatant-info">
                    <span class="combatant-name">${combatant.name}</span>
                    <div class="combatant-stats">
                        <span class="stat-item">
                            <span class="stat-label">AC</span>
                            <span class="stat-value">${combatant.ac}</span>
                        </span>
                    </div>
                    ${combatant.conditions.length > 0 ? `
                        <div class="conditions-badges">
                            ${combatant.conditions.map(c => `
                                <span class="condition-badge">
                                    ${c}
                                    <span class="remove-condition" data-condition="${c}">×</span>
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="hp-container">
                    <div class="hp-bar-wrapper">
                        <div class="hp-bar ${hpClass}" style="width: ${hpPercent}%"></div>
                        <span class="hp-text">${combatant.hp} / ${combatant.maxHp}</span>
                    </div>
                    <div class="hp-controls">
                        <input type="number" class="hp-input" placeholder="0" min="0">
                        <button class="hp-btn damage" data-action="damage">DMG</button>
                        <button class="hp-btn heal" data-action="heal">HEAL</button>
                    </div>
                </div>
                <div class="combatant-actions">
                    <div class="action-row">
                        <button class="combatant-action" data-action="condition" title="Add Condition">🔮</button>
                        <button class="combatant-action" data-action="edit" title="Edit">✏️</button>
                        <button class="combatant-action delete" data-action="delete" title="Remove">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    },

    bindCombatantEvents() {
        document.querySelectorAll('.combatant-card').forEach(card => {
            const id = card.dataset.id;

            // HP controls
            card.querySelector('.hp-btn.damage')?.addEventListener('click', () => {
                const input = card.querySelector('.hp-input');
                const value = parseInt(input.value) || 0;
                if (value > 0) {
                    this.modifyHP(id, -value);
                    input.value = '';
                }
            });

            card.querySelector('.hp-btn.heal')?.addEventListener('click', () => {
                const input = card.querySelector('.hp-input');
                const value = parseInt(input.value) || 0;
                if (value > 0) {
                    this.modifyHP(id, value);
                    input.value = '';
                }
            });

            // Actions
            card.querySelectorAll('.combatant-action').forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;
                    switch (action) {
                        case 'delete':
                            this.removeCombatant(id);
                            break;
                        case 'condition':
                            this.showConditionPicker(id);
                            break;
                        case 'edit':
                            this.openEditModal(id);
                            break;
                    }
                });
            });

            // Remove condition
            card.querySelectorAll('.remove-condition').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removeCondition(id, btn.dataset.condition);
                });
            });

            // Drag and drop for reordering
            card.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', id);
                card.classList.add('dragging');
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
            });

            card.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain');
                this.reorderCombatants(draggedId, id);
            });
        });
    },

    modifyHP(id, amount) {
        const combatant = this.combatants.find(c => c.id === id);
        if (combatant) {
            combatant.hp = Math.max(0, Math.min(combatant.maxHp, combatant.hp + amount));
            this.saveState();
            this.render();
        }
    },

    removeCombatant(id) {
        const index = this.combatants.findIndex(c => c.id === id);
        if (index > -1) {
            const name = this.combatants[index].name;
            this.combatants.splice(index, 1);
            this.saveState();
            this.render();
            showToast(`${name} removed from combat`, 'warning');
        }
    },

    showConditionPicker(id) {
        const conditions = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled',
            'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified',
            'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious',
            'Exhaustion 1', 'Exhaustion 2', 'Exhaustion 3', 'Concentration'];

        // Create a simple selection modal
        const modalHtml = `
            <div id="conditionPickerModal" class="modal active" style="z-index: 3000;">
                <div class="modal-content" style="max-width: 400px;">
                    <div class="modal-header">
                        <h3>Add Condition</h3>
                        <button class="modal-close" onclick="document.getElementById('conditionPickerModal').remove()">&times;</button>
                    </div>
                    <div style="padding: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        ${conditions.map(c => `
                            <button class="btn btn-secondary condition-pick-btn" data-condition="${c}" style="justify-content: center;">${c}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Bind click events
        document.querySelectorAll('.condition-pick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.addCondition(id, btn.dataset.condition);
                document.getElementById('conditionPickerModal').remove();
            });
        });

        // Close on outside click
        document.getElementById('conditionPickerModal').addEventListener('click', (e) => {
            if (e.target.id === 'conditionPickerModal') {
                e.target.remove();
            }
        });
    },

    addCondition(id, condition) {
        const combatant = this.combatants.find(c => c.id === id);
        if (combatant && !combatant.conditions.includes(condition)) {
            combatant.conditions.push(condition);
            this.saveState();
            this.render();
        }
    },

    removeCondition(id, condition) {
        const combatant = this.combatants.find(c => c.id === id);
        if (combatant) {
            combatant.conditions = combatant.conditions.filter(c => c !== condition);
            this.saveState();
            this.render();
        }
    },

    reorderCombatants(draggedId, targetId) {
        const draggedIndex = this.combatants.findIndex(c => c.id === draggedId);
        const targetIndex = this.combatants.findIndex(c => c.id === targetId);

        if (draggedIndex > -1 && targetIndex > -1) {
            const [dragged] = this.combatants.splice(draggedIndex, 1);
            this.combatants.splice(targetIndex, 0, dragged);
            this.saveState();
            this.render();
        }
    },

    // Load encounter into combat
    loadEncounter(monsters) {
        monsters.forEach(m => {
            for (let i = 0; i < m.count; i++) {
                this.combatants.push({
                    id: generateId(),
                    name: m.count > 1 ? `${m.name} ${i + 1}` : m.name,
                    initiative: Math.floor(Math.random() * 20) + 1,
                    ac: m.ac || 10,
                    hp: m.hp || 10,
                    maxHp: m.hp || 10,
                    type: 'enemy',
                    conditions: [],
                    deathSaves: { successes: 0, failures: 0 }
                });
            }
        });
        this.sortByInitiative();
        this.saveState();
        this.render();
        showToast('Encounter loaded into combat!', 'success');
    },

    openEditModal(id) {
        const combatant = this.combatants.find(c => c.id === id);
        if (!combatant) return;

        const modalHtml = `
            <div id="editCombatantModal" class="modal active" style="z-index: 3000;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Edit Combatant</h3>
                        <button class="modal-close" onclick="document.getElementById('editCombatantModal').remove()">&times;</button>
                    </div>
                    <form id="editCombatantForm" class="modal-form">
                        <div class="form-group">
                            <label for="editName">Name</label>
                            <input type="text" id="editName" value="${combatant.name}" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editInit">Initiative</label>
                                <input type="number" id="editInit" value="${combatant.initiative}">
                            </div>
                            <div class="form-group">
                                <label for="editAC">AC</label>
                                <input type="number" id="editAC" value="${combatant.ac}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="editHP">Current HP</label>
                                <input type="number" id="editHP" value="${combatant.hp}">
                            </div>
                            <div class="form-group">
                                <label for="editMaxHP">Max HP</label>
                                <input type="number" id="editMaxHP" value="${combatant.maxHp}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="editType">Type</label>
                            <select id="editType">
                                <option value="player" ${combatant.type === 'player' ? 'selected' : ''}>Player</option>
                                <option value="enemy" ${combatant.type === 'enemy' ? 'selected' : ''}>Enemy</option>
                                <option value="ally" ${combatant.type === 'ally' ? 'selected' : ''}>Ally/NPC</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('editCombatantModal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('editCombatantForm').addEventListener('submit', (e) => {
            e.preventDefault();
            combatant.name = document.getElementById('editName').value;
            combatant.initiative = parseInt(document.getElementById('editInit').value) || 0;
            combatant.ac = parseInt(document.getElementById('editAC').value) || 10;
            combatant.hp = parseInt(document.getElementById('editHP').value) || 1;
            combatant.maxHp = parseInt(document.getElementById('editMaxHP').value) || 1;
            combatant.type = document.getElementById('editType').value;

            this.sortByInitiative();
            this.saveState();
            this.render();
            document.getElementById('editCombatantModal').remove();
            showToast('Combatant updated!', 'success');
        });

        // Close on outside click
        document.getElementById('editCombatantModal').addEventListener('click', (e) => {
            if (e.target.id === 'editCombatantModal') {
                e.target.remove();
            }
        });
    }
};
