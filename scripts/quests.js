// Quest Tracker Module
const Quests = {
    quests: [],

    init() {
        this.loadQuests();
        this.bindEvents();
        this.render();
    },

    loadQuests() {
        const saved = localStorage.getItem('dnd-quests');
        this.quests = saved ? JSON.parse(saved) : [];
    },

    saveQuests() {
        localStorage.setItem('dnd-quests', JSON.stringify(this.quests));
    },

    bindEvents() {
        // Add Quest Button
        document.getElementById('addQuestBtn')?.addEventListener('click', () => {
            this.openModal();
        });

        // Save Quest
        document.getElementById('saveQuestBtn')?.addEventListener('click', () => {
            this.saveQuest();
        });

        // Cancel Quest Modal
        document.getElementById('cancelQuestBtn')?.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on overlay click
        document.getElementById('questModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'questModal') {
                this.closeModal();
            }
        });

        // Add Step Button
        document.getElementById('addStepBtn')?.addEventListener('click', () => {
            this.addStepInput();
        });

        // Filter buttons
        document.querySelectorAll('.quest-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.quest-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.render(e.target.dataset.filter);
            });
        });
    },

    openModal(quest = null) {
        const modal = document.getElementById('questModal');
        const form = document.getElementById('questForm');
        const title = document.getElementById('questModalTitle');

        if (quest) {
            title.textContent = 'Edit Quest';
            document.getElementById('questId').value = quest.id;
            document.getElementById('questTitle').value = quest.title;
            document.getElementById('questGiver').value = quest.giver || '';
            document.getElementById('questLocation').value = quest.location || '';
            document.getElementById('questObjective').value = quest.objective || '';

            // Load steps
            const stepsContainer = document.getElementById('questSteps');
            stepsContainer.innerHTML = '';
            if (quest.steps && quest.steps.length > 0) {
                quest.steps.forEach(step => this.addStepInput(step));
            }
        } else {
            title.textContent = 'New Quest';
            form.reset();
            document.getElementById('questId').value = '';
            document.getElementById('questSteps').innerHTML = '';
        }

        modal.classList.add('active');
    },

    closeModal() {
        document.getElementById('questModal').classList.remove('active');
    },

    addStepInput(value = '') {
        const stepsContainer = document.getElementById('questSteps');
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-input-row';
        stepDiv.innerHTML = `
            <input type="text" class="quest-step-input" placeholder="Step description..." value="${value}">
            <button type="button" class="remove-step-btn" onclick="this.parentElement.remove()">✕</button>
        `;
        stepsContainer.appendChild(stepDiv);
    },

    saveQuest() {
        const id = document.getElementById('questId').value;
        const title = document.getElementById('questTitle').value.trim();

        if (!title) {
            showToast('Quest title is required!', 'error');
            return;
        }

        const steps = Array.from(document.querySelectorAll('.quest-step-input'))
            .map(input => input.value.trim())
            .filter(step => step.length > 0);

        const questData = {
            id: id || generateId(),
            title: title,
            giver: document.getElementById('questGiver').value.trim(),
            location: document.getElementById('questLocation').value.trim(),
            objective: document.getElementById('questObjective').value.trim(),
            steps: steps,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        if (id) {
            // Edit existing
            const index = this.quests.findIndex(q => q.id === id);
            if (index >= 0) {
                questData.status = this.quests[index].status;
                questData.createdAt = this.quests[index].createdAt;
                this.quests[index] = questData;
            }
        } else {
            // Add new
            this.quests.unshift(questData);
        }

        this.saveQuests();
        this.closeModal();
        this.render();
        showToast(id ? 'Quest updated!' : 'Quest added!', 'success');
    },

    deleteQuest(id) {
        if (confirm('Delete this quest?')) {
            this.quests = this.quests.filter(q => q.id !== id);
            this.saveQuests();
            this.render();
            showToast('Quest deleted', 'warning');
        }
    },

    setStatus(id, status) {
        const quest = this.quests.find(q => q.id === id);
        if (quest) {
            quest.status = status;
            this.saveQuests();
            this.render();
            showToast(`Quest marked as ${status}`, 'success');
        }
    },

    render(filter = 'all') {
        const container = document.getElementById('questsList');
        if (!container) return;

        let filtered = this.quests;
        if (filter !== 'all') {
            filtered = this.quests.filter(q => q.status === filter);
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span>📜</span>
                    <p>No quests found</p>
                    <small>Click "New Quest" to add one</small>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(quest => `
            <div class="quest-card status-${quest.status}" data-id="${quest.id}">
                <div class="quest-header">
                    <div class="quest-title-row">
                        <h3>${quest.title}</h3>
                        <span class="quest-status-badge ${quest.status}">${quest.status}</span>
                    </div>
                    <div class="quest-actions">
                        <button class="quest-action-btn edit" onclick="Quests.openModal(Quests.quests.find(q => q.id === '${quest.id}'))" title="Edit">✏️</button>
                        <button class="quest-action-btn delete" onclick="Quests.deleteQuest('${quest.id}')" title="Delete">🗑️</button>
                    </div>
                </div>
                
                <div class="quest-details">
                    ${quest.giver ? `<div class="quest-detail"><span class="detail-label">Giver:</span> ${quest.giver}</div>` : ''}
                    ${quest.location ? `<div class="quest-detail"><span class="detail-label">Location:</span> ${quest.location}</div>` : ''}
                    ${quest.objective ? `<div class="quest-detail"><span class="detail-label">Objective:</span> ${quest.objective}</div>` : ''}
                </div>
                
                ${quest.steps && quest.steps.length > 0 ? `
                    <div class="quest-steps">
                        <div class="steps-label">Steps:</div>
                        <ul>
                            ${quest.steps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="quest-status-buttons">
                    <button class="status-btn active ${quest.status === 'active' ? 'current' : ''}" 
                            onclick="Quests.setStatus('${quest.id}', 'active')">Active</button>
                    <button class="status-btn completed ${quest.status === 'completed' ? 'current' : ''}" 
                            onclick="Quests.setStatus('${quest.id}', 'completed')">Completed</button>
                    <button class="status-btn failed ${quest.status === 'failed' ? 'current' : ''}" 
                            onclick="Quests.setStatus('${quest.id}', 'failed')">Failed</button>
                </div>
            </div>
        `).join('');
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    Quests.init();
});
