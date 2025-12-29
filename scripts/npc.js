// NPC Generator Module
const NPC = {
    savedNPCs: [],

    init() {
        this.loadSavedNPCs();
        this.bindEvents();
        this.renderSavedList();
    },

    loadSavedNPCs() {
        const saved = localStorage.getItem('dnd-npcs');
        this.savedNPCs = saved ? JSON.parse(saved) : [];
    },

    saveToDisk() {
        localStorage.setItem('dnd-npcs', JSON.stringify(this.savedNPCs));
    },

    bindEvents() {
        // Generate random NPC
        document.getElementById('generateRandomNPC')?.addEventListener('click', () => {
            const npc = this.generateRandom();
            this.displayNPC(npc);
            this.currentNPC = npc;
        });

        // Create new NPC (manual)
        document.getElementById('createNewNPC')?.addEventListener('click', () => {
            this.openNPCModal();
        });

        // Save current NPC
        document.getElementById('saveCurrentNPC')?.addEventListener('click', () => {
            if (this.currentNPC) {
                this.saveNPC(this.currentNPC);
            }
        });

        // Randomize individual fields
        document.querySelectorAll('.randomize-field').forEach(btn => {
            btn.addEventListener('click', () => {
                const field = btn.dataset.field;
                this.randomizeField(field);
            });
        });

        // Race change updates name options
        document.getElementById('npcRace')?.addEventListener('change', (e) => {
            this.updateNameSuggestions(e.target.value);
        });
    },

    generateRandom() {
        const data = NPCData;
        const race = this.random(data.races);
        const gender = this.random(data.genders);
        const nameStyle = race.nameStyle;
        const names = data.names[nameStyle] || data.names.common;

        const genderKey = gender === 'Male' ? 'male' : 'female';
        const firstName = this.random(names[genderKey] || names.male);
        const surname = names.surnames?.length ? this.random(names.surnames) : '';

        return {
            id: Date.now().toString(),
            name: surname ? `${firstName} ${surname}` : firstName,
            race: race.name,
            gender: gender,
            age: this.random(data.ages),
            appearance: {
                height: this.random(data.appearance.height),
                build: this.random(data.appearance.build),
                hairColor: this.random(data.appearance.hairColor),
                hairStyle: this.random(data.appearance.hairStyle),
                eyeColor: this.random(data.appearance.eyeColor),
                skinTone: this.random(data.appearance.skinTone),
                distinguishing: this.random(data.appearance.distinguishing)
            },
            personality: {
                trait: this.random(data.personality.traits),
                ideal: this.random(data.personality.ideals),
                bond: this.random(data.personality.bonds),
                flaw: this.random(data.personality.flaws)
            },
            occupation: this.random(data.occupations),
            background: this.random(data.backgrounds),
            motivation: this.random(data.motivations),
            quirk: this.random(data.quirks),
            notes: ''
        };
    },

    random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    displayNPC(npc) {
        const container = document.getElementById('npcDisplay');
        if (!container) return;

        container.innerHTML = `
            <div class="npc-card generated">
                <div class="npc-header">
                    <div class="npc-identity">
                        <h3 class="npc-name">${npc.name}</h3>
                        <span class="npc-subtitle">${npc.gender} ${npc.race} • ${npc.age}</span>
                    </div>
                    <div class="npc-actions">
                        <button class="btn btn-primary" id="saveCurrentNPC">
                            <span>💾</span> Save
                        </button>
                        <button class="btn btn-secondary" onclick="NPC.editNPC('${npc.id}')">
                            <span>✏️</span> Edit
                        </button>
                        <button class="btn btn-danger" onclick="NPC.clearCurrentNPC()">
                            <span>🗑️</span> Delete
                        </button>
                    </div>
                </div>

                <div class="npc-section">
                    <h4>📋 Occupation & Background</h4>
                    <div class="npc-info-row">
                        <span class="label">Occupation:</span>
                        <span class="value">${npc.occupation}</span>
                    </div>
                    <div class="npc-info-row">
                        <span class="label">Background:</span>
                        <span class="value">${npc.background}</span>
                    </div>
                    <div class="npc-info-row">
                        <span class="label">Motivation:</span>
                        <span class="value">${npc.motivation}</span>
                    </div>
                </div>

                <div class="npc-section">
                    <h4>👤 Appearance</h4>
                    <div class="npc-appearance-grid">
                        <div class="appearance-item">
                            <span class="label">Height</span>
                            <span class="value">${npc.appearance.height}</span>
                        </div>
                        <div class="appearance-item">
                            <span class="label">Build</span>
                            <span class="value">${npc.appearance.build}</span>
                        </div>
                        <div class="appearance-item">
                            <span class="label">Hair</span>
                            <span class="value">${npc.appearance.hairColor}, ${npc.appearance.hairStyle}</span>
                        </div>
                        <div class="appearance-item">
                            <span class="label">Eyes</span>
                            <span class="value">${npc.appearance.eyeColor}</span>
                        </div>
                        <div class="appearance-item">
                            <span class="label">Skin</span>
                            <span class="value">${npc.appearance.skinTone}</span>
                        </div>
                    </div>
                    <div class="npc-info-row distinguishing">
                        <span class="label">Distinguishing Feature:</span>
                        <span class="value">${npc.appearance.distinguishing}</span>
                    </div>
                </div>

                <div class="npc-section">
                    <h4>🎭 Personality</h4>
                    <div class="personality-grid">
                        <div class="personality-item trait">
                            <span class="label">Trait</span>
                            <span class="value">${npc.personality.trait}</span>
                        </div>
                        <div class="personality-item ideal">
                            <span class="label">Ideal</span>
                            <span class="value">${npc.personality.ideal}</span>
                        </div>
                        <div class="personality-item bond">
                            <span class="label">Bond</span>
                            <span class="value">${npc.personality.bond}</span>
                        </div>
                        <div class="personality-item flaw">
                            <span class="label">Flaw</span>
                            <span class="value">${npc.personality.flaw}</span>
                        </div>
                    </div>
                </div>

                <div class="npc-section">
                    <h4>✨ Quirk</h4>
                    <p class="quirk-text">${npc.quirk}</p>
                </div>
            </div>
        `;

        // Rebind save button
        document.getElementById('saveCurrentNPC')?.addEventListener('click', () => {
            this.saveNPC(npc);
        });
    },

    saveNPC(npc) {
        // Check if already exists
        const existingIndex = this.savedNPCs.findIndex(n => n.id === npc.id);
        if (existingIndex >= 0) {
            this.savedNPCs[existingIndex] = npc;
        } else {
            this.savedNPCs.unshift(npc);
        }
        this.saveToDisk();
        this.renderSavedList();
        showToast(`${npc.name} saved!`, 'success');
    },

    deleteNPC(id) {
        this.savedNPCs = this.savedNPCs.filter(n => n.id !== id);
        this.saveToDisk();
        this.renderSavedList();
        showToast('NPC deleted', 'info');
    },

    clearCurrentNPC() {
        // If the current NPC was saved, remove from saved list too
        if (this.currentNPC) {
            this.savedNPCs = this.savedNPCs.filter(n => n.id !== this.currentNPC.id);
            this.saveToDisk();
            this.renderSavedList();
        }
        this.currentNPC = null;

        // Reset display to empty state
        const container = document.getElementById('npcDisplay');
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <span>🎭</span>
                    <p>No NPC generated yet</p>
                    <small>Click "Generate Random NPC" or "Create Custom NPC" to start!</small>
                </div>
            `;
        }
        showToast('NPC deleted', 'info');
    },

    renderSavedList() {
        const container = document.getElementById('savedNPCList');
        if (!container) return;

        if (this.savedNPCs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span>📜</span>
                    <p>No saved NPCs yet</p>
                    <small>Generate or create an NPC and save it!</small>
                </div>
            `;
            return;
        }

        container.innerHTML = this.savedNPCs.map(npc => `
            <div class="saved-npc-item" data-id="${npc.id}">
                <div class="saved-npc-info" onclick="NPC.loadNPC('${npc.id}')">
                    <span class="saved-npc-name">${npc.name}</span>
                    <span class="saved-npc-details">${npc.race} ${npc.occupation}</span>
                </div>
                <div class="saved-npc-actions">
                    <button class="icon-btn" onclick="NPC.loadNPC('${npc.id}')" title="View">👁️</button>
                    <button class="icon-btn" onclick="NPC.editNPC('${npc.id}')" title="Edit">✏️</button>
                    <button class="icon-btn delete" onclick="NPC.deleteNPC('${npc.id}')" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    },

    loadNPC(id) {
        const npc = this.savedNPCs.find(n => n.id === id);
        if (npc) {
            this.currentNPC = npc;
            this.displayNPC(npc);
        }
    },

    editNPC(id) {
        const npc = this.savedNPCs.find(n => n.id === id) || this.currentNPC;
        if (npc) {
            this.openNPCModal(npc);
        }
    },

    openNPCModal(existingNPC = null) {
        const isEdit = !!existingNPC;
        const npc = existingNPC || {
            id: Date.now().toString(),
            name: '',
            race: 'Human',
            gender: 'Male',
            age: 'Adult',
            appearance: {
                height: 'Average Height',
                build: 'Average',
                hairColor: 'Brown',
                hairStyle: 'Short and Neat',
                eyeColor: 'Brown',
                skinTone: 'Fair',
                distinguishing: ''
            },
            personality: {
                trait: '',
                ideal: '',
                bond: '',
                flaw: ''
            },
            occupation: '',
            background: 'Folk Hero',
            motivation: '',
            quirk: '',
            notes: ''
        };

        const modalHtml = `
            <div id="npcModal" class="modal active">
                <div class="modal-content modal-large">
                    <div class="modal-header">
                        <h3>${isEdit ? 'Edit NPC' : 'Create New NPC'}</h3>
                        <button class="modal-close" onclick="document.getElementById('npcModal').remove()">&times;</button>
                    </div>
                    <form id="npcForm" class="npc-form">
                        <div class="form-section">
                            <h4>Basic Info</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="npcName">Name</label>
                                    <div class="input-with-btn">
                                        <input type="text" id="npcName" value="${npc.name}" required>
                                        <button type="button" class="btn-icon" onclick="NPC.randomizeName()">🎲</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row three-col">
                                <div class="form-group">
                                    <label for="npcRace">Race</label>
                                    <select id="npcRace">
                                        ${NPCData.races.map(r => `<option value="${r.name}" ${r.name === npc.race ? 'selected' : ''}>${r.name}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="npcGender">Gender</label>
                                    <select id="npcGender">
                                        ${NPCData.genders.map(g => `<option value="${g}" ${g === npc.gender ? 'selected' : ''}>${g}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="npcAge">Age</label>
                                    <select id="npcAge">
                                        ${NPCData.ages.map(a => `<option value="${a}" ${a === npc.age ? 'selected' : ''}>${a}</option>`).join('')}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h4>Appearance</h4>
                            <div class="form-row three-col">
                                <div class="form-group">
                                    <label>Height</label>
                                    <select id="npcHeight">
                                        ${NPCData.appearance.height.map(h => `<option value="${h}" ${h === npc.appearance.height ? 'selected' : ''}>${h}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Build</label>
                                    <select id="npcBuild">
                                        ${NPCData.appearance.build.map(b => `<option value="${b}" ${b === npc.appearance.build ? 'selected' : ''}>${b}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Skin Tone</label>
                                    <select id="npcSkin">
                                        ${NPCData.appearance.skinTone.map(s => `<option value="${s}" ${s === npc.appearance.skinTone ? 'selected' : ''}>${s}</option>`).join('')}
                                    </select>
                                </div>
                            </div>
                            <div class="form-row three-col">
                                <div class="form-group">
                                    <label>Hair Color</label>
                                    <select id="npcHairColor">
                                        ${NPCData.appearance.hairColor.map(h => `<option value="${h}" ${h === npc.appearance.hairColor ? 'selected' : ''}>${h}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Hair Style</label>
                                    <select id="npcHairStyle">
                                        ${NPCData.appearance.hairStyle.map(h => `<option value="${h}" ${h === npc.appearance.hairStyle ? 'selected' : ''}>${h}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Eye Color</label>
                                    <select id="npcEyes">
                                        ${NPCData.appearance.eyeColor.map(e => `<option value="${e}" ${e === npc.appearance.eyeColor ? 'selected' : ''}>${e}</option>`).join('')}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Distinguishing Feature</label>
                                <div class="input-with-btn">
                                    <input type="text" id="npcDistinguishing" value="${npc.appearance.distinguishing}">
                                    <button type="button" class="btn-icon" onclick="document.getElementById('npcDistinguishing').value = NPC.random(NPCData.appearance.distinguishing)">🎲</button>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h4>Background</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Occupation</label>
                                    <div class="input-with-btn">
                                        <input type="text" id="npcOccupation" value="${npc.occupation}" list="occupationList">
                                        <button type="button" class="btn-icon" onclick="document.getElementById('npcOccupation').value = NPC.random(NPCData.occupations)">🎲</button>
                                    </div>
                                    <datalist id="occupationList">
                                        ${NPCData.occupations.map(o => `<option value="${o}">`).join('')}
                                    </datalist>
                                </div>
                                <div class="form-group">
                                    <label>Background</label>
                                    <select id="npcBackground">
                                        ${NPCData.backgrounds.map(b => `<option value="${b}" ${b === npc.background ? 'selected' : ''}>${b}</option>`).join('')}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Motivation</label>
                                <div class="input-with-btn">
                                    <input type="text" id="npcMotivation" value="${npc.motivation || ''}">
                                    <button type="button" class="btn-icon" onclick="document.getElementById('npcMotivation').value = NPC.random(NPCData.motivations)">🎲</button>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h4>Personality</h4>
                            <div class="form-group">
                                <label>Personality Trait</label>
                                <div class="input-with-btn">
                                    <input type="text" id="npcTrait" value="${npc.personality.trait}">
                                    <button type="button" class="btn-icon" onclick="document.getElementById('npcTrait').value = NPC.random(NPCData.personality.traits)">🎲</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Ideal</label>
                                <div class="input-with-btn">
                                    <input type="text" id="npcIdeal" value="${npc.personality.ideal}">
                                    <button type="button" class="btn-icon" onclick="document.getElementById('npcIdeal').value = NPC.random(NPCData.personality.ideals)">🎲</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Bond</label>
                                <div class="input-with-btn">
                                    <input type="text" id="npcBond" value="${npc.personality.bond}">
                                    <button type="button" class="btn-icon" onclick="document.getElementById('npcBond').value = NPC.random(NPCData.personality.bonds)">🎲</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Flaw</label>
                                <div class="input-with-btn">
                                    <input type="text" id="npcFlaw" value="${npc.personality.flaw}">
                                    <button type="button" class="btn-icon" onclick="document.getElementById('npcFlaw').value = NPC.random(NPCData.personality.flaws)">🎲</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Quirk</label>
                                <div class="input-with-btn">
                                    <input type="text" id="npcQuirk" value="${npc.quirk || ''}">
                                    <button type="button" class="btn-icon" onclick="document.getElementById('npcQuirk').value = NPC.random(NPCData.quirks)">🎲</button>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h4>Notes</h4>
                            <div class="form-group">
                                <textarea id="npcNotes" rows="3" placeholder="Additional notes about this NPC...">${npc.notes || ''}</textarea>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('npcModal').remove()">Cancel</button>
                            <button type="button" class="btn btn-secondary" onclick="NPC.fillRandomFields()">🎲 Randomize All</button>
                            <button type="submit" class="btn btn-primary">💾 Save NPC</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Bind form submit
        document.getElementById('npcForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveFromForm(npc.id);
        });

        // Close on outside click
        document.getElementById('npcModal').addEventListener('click', (e) => {
            if (e.target.id === 'npcModal') {
                e.target.remove();
            }
        });
    },

    saveFromForm(id) {
        const npc = {
            id: id,
            name: document.getElementById('npcName').value,
            race: document.getElementById('npcRace').value,
            gender: document.getElementById('npcGender').value,
            age: document.getElementById('npcAge').value,
            appearance: {
                height: document.getElementById('npcHeight').value,
                build: document.getElementById('npcBuild').value,
                hairColor: document.getElementById('npcHairColor').value,
                hairStyle: document.getElementById('npcHairStyle').value,
                eyeColor: document.getElementById('npcEyes').value,
                skinTone: document.getElementById('npcSkin').value,
                distinguishing: document.getElementById('npcDistinguishing').value
            },
            personality: {
                trait: document.getElementById('npcTrait').value,
                ideal: document.getElementById('npcIdeal').value,
                bond: document.getElementById('npcBond').value,
                flaw: document.getElementById('npcFlaw').value
            },
            occupation: document.getElementById('npcOccupation').value,
            background: document.getElementById('npcBackground').value,
            motivation: document.getElementById('npcMotivation').value,
            quirk: document.getElementById('npcQuirk').value,
            notes: document.getElementById('npcNotes').value
        };

        this.saveNPC(npc);
        this.currentNPC = npc;
        this.displayNPC(npc);
        document.getElementById('npcModal').remove();
    },

    randomizeName() {
        const race = document.getElementById('npcRace').value;
        const gender = document.getElementById('npcGender').value;
        const raceData = NPCData.races.find(r => r.name === race);
        const nameStyle = raceData?.nameStyle || 'common';
        const names = NPCData.names[nameStyle] || NPCData.names.common;

        const genderKey = gender === 'Male' ? 'male' : 'female';
        const firstName = this.random(names[genderKey] || names.male);
        const surname = names.surnames?.length ? this.random(names.surnames) : '';

        document.getElementById('npcName').value = surname ? `${firstName} ${surname}` : firstName;
    },

    fillRandomFields() {
        const random = this.generateRandom();

        document.getElementById('npcName').value = random.name;
        document.getElementById('npcRace').value = random.race;
        document.getElementById('npcGender').value = random.gender;
        document.getElementById('npcAge').value = random.age;
        document.getElementById('npcHeight').value = random.appearance.height;
        document.getElementById('npcBuild').value = random.appearance.build;
        document.getElementById('npcHairColor').value = random.appearance.hairColor;
        document.getElementById('npcHairStyle').value = random.appearance.hairStyle;
        document.getElementById('npcEyes').value = random.appearance.eyeColor;
        document.getElementById('npcSkin').value = random.appearance.skinTone;
        document.getElementById('npcDistinguishing').value = random.appearance.distinguishing;
        document.getElementById('npcOccupation').value = random.occupation;
        document.getElementById('npcBackground').value = random.background;
        document.getElementById('npcMotivation').value = random.motivation;
        document.getElementById('npcTrait').value = random.personality.trait;
        document.getElementById('npcIdeal').value = random.personality.ideal;
        document.getElementById('npcBond').value = random.personality.bond;
        document.getElementById('npcFlaw').value = random.personality.flaw;
        document.getElementById('npcQuirk').value = random.quirk;
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    NPC.init();
});
