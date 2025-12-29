// DM Screen Module

const DMScreen = {
    diceHistory: [],

    init() {
        this.renderConditions();
        this.renderActions();
        this.bindDiceEvents();
    },

    renderConditions() {
        const container = document.getElementById('conditionsList');
        const conditions = RULES_DATA.conditions;

        container.innerHTML = conditions.map(c => `
            <div class="condition-item">
                <span class="condition-name">${c.icon} ${c.name}</span>
                <span class="condition-effect">${c.description}</span>
            </div>
        `).join('');
    },

    renderActions() {
        const container = document.getElementById('actionsList');
        const actions = RULES_DATA.actions;

        container.innerHTML = actions.map(a => `
            <div class="action-item">
                <span class="action-name">${a.icon} ${a.name}</span>
                <span class="action-desc">${a.description}</span>
            </div>
        `).join('');
    },

    bindDiceEvents() {
        document.querySelectorAll('.dice-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const dice = btn.dataset.dice;
                this.rollDice(dice);
            });
        });
    },

    rollDice(dice) {
        const sides = parseInt(dice.substring(1));
        const result = Math.floor(Math.random() * sides) + 1;

        // Display result with animation
        const resultEl = document.getElementById('diceResult');
        resultEl.textContent = result;
        resultEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            resultEl.style.transform = 'scale(1)';
        }, 150);

        // Add to history
        this.diceHistory.unshift(`${dice}: ${result}`);
        if (this.diceHistory.length > 5) {
            this.diceHistory.pop();
        }

        document.getElementById('diceHistory').textContent = this.diceHistory.join(' | ');

        // Highlight nat 1 or nat 20
        if (dice === 'd20') {
            if (result === 20) {
                resultEl.style.color = 'var(--success)';
                showToast('Natural 20! 🎉', 'success');
            } else if (result === 1) {
                resultEl.style.color = 'var(--danger)';
                showToast('Natural 1...', 'error');
            } else {
                resultEl.style.color = 'var(--gold)';
            }
        } else {
            resultEl.style.color = 'var(--gold)';
        }
    }
};
