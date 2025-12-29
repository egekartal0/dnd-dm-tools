// Generators Module

const Generators = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        document.querySelectorAll('.generate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.generator;
                this.generate(type);
            });
        });
    },

    generate(type) {
        let result = '';

        switch (type) {
            case 'name':
                result = this.generateName();
                break;
            case 'personality':
                result = this.generatePersonality();
                break;
            case 'tavern':
                result = this.generateTavern();
                break;
            case 'quest':
                result = this.generateQuest();
                break;
            case 'treasure':
                result = this.generateTreasure();
                break;
            case 'twist':
                result = this.generateTwist();
                break;
            case 'encounter':
                result = this.generateEncounter();
                break;
            case 'trap':
                result = this.generateTrap();
                break;
            case 'riddle':
                result = this.generateRiddle();
                break;
            case 'weather':
                result = this.generateWeather();
                break;
            case 'combatDesc':
                result = this.generateCombatDesc();
                break;
            case 'shop':
                result = this.generateShop();
                break;
        }

        document.getElementById(`${type}Result`).innerHTML = result;
    },

    random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    generateName() {
        const race = document.getElementById('nameRace').value;
        const gender = document.getElementById('nameGender').value;
        const data = GENERATOR_DATA.names[race];

        let firstName;
        if (gender === 'any') {
            firstName = Math.random() > 0.5 ? this.random(data.male) : this.random(data.female);
        } else {
            firstName = this.random(data[gender]);
        }

        const surname = this.random(data.surnames);
        return `<strong>${firstName} ${surname}</strong>`;
    },

    generatePersonality() {
        const p = GENERATOR_DATA.personality;
        return `
            <div class="result-title">🎭 NPC Personality</div>
            <p><strong>Trait:</strong> ${this.random(p.traits)}</p>
            <p><strong>Ideal:</strong> ${this.random(p.ideals)}</p>
            <p><strong>Bond:</strong> ${this.random(p.bonds)}</p>
            <p><strong>Flaw:</strong> ${this.random(p.flaws)}</p>
        `;
    },

    generateTavern() {
        const t = GENERATOR_DATA.taverns;
        const name = `${this.random(t.adjectives)} ${this.random(t.nouns)}`;
        return `<strong>${name}</strong>`;
    },

    generateQuest() {
        const questType = document.getElementById('questType').value;
        let quest;

        if (questType === 'any') {
            const types = Object.keys(GENERATOR_DATA.quests);
            const randomType = this.random(types);
            quest = this.random(GENERATOR_DATA.quests[randomType]);
        } else {
            quest = this.random(GENERATOR_DATA.quests[questType]);
        }

        return `<p>${quest}</p>`;
    },

    generateTreasure() {
        const crTier = document.getElementById('treasureCR').value;
        const type = document.getElementById('treasureType').value;
        const t = GENERATOR_DATA.treasure;

        let result = '<div class="result-title">💎 Treasure</div>';

        // Generate coins
        const coins = t.coins[crTier];
        result += '<p><strong>Coins:</strong> ';
        const coinTypes = [];
        if (parseInt(crTier) >= 1) {
            coinTypes.push(`${this.rollDice(coins.gp)} gp`);
            coinTypes.push(`${this.rollDice(coins.sp)} sp`);
        }
        if (parseInt(crTier) >= 5) {
            coinTypes.push(`${this.rollDice(coins.pp)} pp`);
        }
        result += coinTypes.join(', ') + '</p>';

        // Gems (50% chance)
        if (Math.random() > 0.5) {
            const gemValues = Object.keys(t.gemstones).map(Number);
            const gemValue = this.random(gemValues.filter(v => v <= (parseInt(crTier) >= 5 ? 500 : 100)));
            const gem = this.random(t.gemstones[gemValue]);
            result += `<p><strong>Gem:</strong> ${gem} (${gemValue} gp)</p>`;
        }

        // Magic item (hoard only, 30% chance)
        if (type === 'hoard' && Math.random() > 0.7) {
            let rarity = 'common';
            if (parseInt(crTier) >= 11) rarity = 'rare';
            else if (parseInt(crTier) >= 5) rarity = 'uncommon';

            const item = this.random(t.magicItems[rarity]);
            result += `<p><strong>Magic Item:</strong> ${item}</p>`;
        }

        return result;
    },

    rollDice(diceStr) {
        if (diceStr === '0') return 0;
        const match = diceStr.match(/(\d+)d(\d+)(?:\s*x\s*(\d+))?/);
        if (!match) return 0;

        const count = parseInt(match[1]);
        const sides = parseInt(match[2]);
        const multiplier = match[3] ? parseInt(match[3]) : 1;

        let total = 0;
        for (let i = 0; i < count; i++) {
            total += Math.floor(Math.random() * sides) + 1;
        }
        return total * multiplier;
    },

    generateTwist() {
        return `<p>${this.random(GENERATOR_DATA.plotTwists)}</p>`;
    },

    generateEncounter() {
        const env = document.getElementById('encounterEnvironment').value;
        const level = document.getElementById('encounterLevel').value;
        const encounters = GENERATOR_DATA.encounters[env];

        let tierEncounters = encounters[level];
        if (!tierEncounters) {
            tierEncounters = encounters['1'];
        }

        return `<p><strong>${env.charAt(0).toUpperCase() + env.slice(1)}:</strong> ${this.random(tierEncounters)}</p>`;
    },

    generateTrap() {
        const danger = document.getElementById('trapDanger').value;
        const trap = this.random(GENERATOR_DATA.traps[danger]);

        return `
            <div class="result-title">🪤 ${trap.name}</div>
            <p><strong>Detection DC:</strong> ${trap.dc}</p>
            <p><strong>Damage:</strong> ${trap.damage}</p>
            <p>${trap.description}</p>
        `;
    },

    generateRiddle() {
        const riddle = this.random(GENERATOR_DATA.riddles);
        return `
            <p><strong>Riddle:</strong> ${riddle.riddle}</p>
            <p><strong>Answer:</strong> <span style="color: var(--gold); cursor: pointer;" onclick="this.innerHTML='${riddle.answer}'">[Click to reveal]</span></p>
        `;
    },

    generateWeather() {
        const climate = document.getElementById('weatherClimate').value;
        const weather = this.random(GENERATOR_DATA.weather[climate]);
        return `<p>🌤️ ${weather}</p>`;
    },

    generateCombatDesc() {
        const type = document.getElementById('combatType').value;
        const weapon = document.getElementById('weaponType').value;
        const desc = this.random(GENERATOR_DATA.combatDescriptions[type][weapon]);
        return `<p>${desc}</p>`;
    },

    generateShop() {
        const shopType = document.getElementById('shopType').value;
        const items = GENERATOR_DATA.shops[shopType];

        // Pick 5-8 random items
        const count = Math.floor(Math.random() * 4) + 5;
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        let result = '<div class="result-title">🏪 Shop Inventory</div><ul>';
        selected.forEach(item => {
            result += `<li>${item.name} - <strong>${item.price}</strong></li>`;
        });
        result += '</ul>';

        return result;
    }
};
