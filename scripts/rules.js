// Rules Reference Module

const Rules = {
    init() {
        this.render();
        this.bindEvents();
    },

    bindEvents() {
        // Search
        document.getElementById('rulesSearch').addEventListener('input', (e) => {
            this.filterRules(e.target.value);
        });

        // Category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterByCategory(btn.dataset.category);
            });
        });
    },

    render() {
        const container = document.getElementById('rulesContainer');
        let html = '';

        // Render all categories
        Object.entries(RULES_DATA).forEach(([category, rules]) => {
            rules.forEach(rule => {
                html += this.renderRuleCard(rule, category);
            });
        });

        container.innerHTML = html;
        this.bindCardEvents();
    },

    renderRuleCard(rule, category) {
        const detailsHtml = rule.details ? `
            <ul>
                ${rule.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
        ` : '';

        const effectsHtml = rule.effects ? `
            <div class="condition-effects">
                <ul>
                    ${rule.effects.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>
        ` : '';

        return `
            <div class="rule-card" data-category="${category}">
                <div class="rule-header">
                    <div class="rule-title">
                        <span class="rule-icon">${rule.icon || '📖'}</span>
                        <h4>${rule.name}</h4>
                    </div>
                    <span class="rule-category">${category}</span>
                    <span class="rule-expand">▼</span>
                </div>
                <div class="rule-content">
                    <p>${rule.description}</p>
                    ${detailsHtml}
                    ${effectsHtml}
                </div>
            </div>
        `;
    },

    bindCardEvents() {
        document.querySelectorAll('.rule-card').forEach(card => {
            const header = card.querySelector('.rule-header');
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close all other cards first (accordion behavior)
                document.querySelectorAll('.rule-card.expanded').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('expanded');
                    }
                });
                // Toggle this card
                card.classList.toggle('expanded');
            });
        });
    },

    filterRules(searchTerm) {
        const term = searchTerm.toLowerCase();
        document.querySelectorAll('.rule-card').forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            const content = card.querySelector('.rule-content').textContent.toLowerCase();
            const matches = name.includes(term) || content.includes(term);
            card.style.display = matches ? 'block' : 'none';
        });
    },

    filterByCategory(category) {
        document.querySelectorAll('.rule-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};
