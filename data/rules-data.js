// D&D 2024 Rules Reference Data

const RULES_DATA = {
    actions: [
        {
            name: "Attack",
            icon: "⚔️",
            description: "Make one melee or ranged attack. At higher levels, you may get Extra Attack.",
            details: [
                "Roll d20 + ability modifier + proficiency (if proficient)",
                "Compare to target's AC",
                "On hit, roll damage dice + ability modifier"
            ]
        },
        {
            name: "Cast a Spell",
            icon: "✨",
            description: "Cast a spell with a casting time of 1 action.",
            details: [
                "Must have the spell prepared or known",
                "Expend a spell slot of appropriate level (unless cantrip)",
                "Follow the spell's components (V, S, M)"
            ]
        },
        {
            name: "Dash",
            icon: "🏃",
            description: "Gain extra movement equal to your speed for the current turn.",
            details: [
                "Your speed doubles for this turn",
                "Affected by any modifiers to your speed"
            ]
        },
        {
            name: "Disengage",
            icon: "↩️",
            description: "Your movement doesn't provoke opportunity attacks for the rest of the turn.",
            details: [
                "Allows safe retreat from melee",
                "Does not grant extra movement"
            ]
        },
        {
            name: "Dodge",
            icon: "🛡️",
            description: "Focus on avoiding attacks. Attack rolls against you have disadvantage if you can see the attacker. Dexterity saves have advantage.",
            details: [
                "Lasts until start of your next turn",
                "Ends if you're incapacitated",
                "Ends if your speed drops to 0"
            ]
        },
        {
            name: "Help",
            icon: "🤝",
            description: "Aid an ally in attacking a creature or with an ability check.",
            details: [
                "Attack: Ally gets advantage on next attack vs target",
                "Ability Check: Ally gets advantage on the check",
                "Must be within 5 feet of target (for attack help)"
            ]
        },
        {
            name: "Hide",
            icon: "👁️",
            description: "Make a Dexterity (Stealth) check to hide from enemies.",
            details: [
                "Must be heavily obscured or have cover",
                "Check vs enemy's passive Perception",
                "Being hidden gives advantage on attacks"
            ]
        },
        {
            name: "Ready",
            icon: "⏳",
            description: "Prepare to act in response to a trigger you specify.",
            details: [
                "Specify trigger and action to take",
                "Uses your reaction when triggered",
                "Readied spells require concentration"
            ]
        },
        {
            name: "Search",
            icon: "🔍",
            description: "Make a Wisdom (Perception) or Intelligence (Investigation) check.",
            details: [
                "Perception: Spot hidden creatures/objects",
                "Investigation: Deduce location of hidden things"
            ]
        },
        {
            name: "Use an Object",
            icon: "🎒",
            description: "Interact with an object that requires an action.",
            details: [
                "Drink a potion",
                "Use a magic item",
                "Pull a second lever"
            ]
        }
    ],
    conditions: [
        {
            name: "Blinded",
            icon: "😵",
            description: "Cannot see. Auto-fail sight-based checks.",
            effects: [
                "Attack rolls against you have advantage",
                "Your attack rolls have disadvantage"
            ]
        },
        {
            name: "Charmed",
            icon: "💕",
            description: "Cannot attack or target the charmer with harmful abilities.",
            effects: [
                "Charmer has advantage on social checks against you"
            ]
        },
        {
            name: "Deafened",
            icon: "🔇",
            description: "Cannot hear. Auto-fail hearing-based checks.",
            effects: []
        },
        {
            name: "Exhaustion",
            icon: "😫",
            description: "Levels 1-10, cumulative. −2 per level to d20 tests.",
            effects: [
                "Level 1-5: −2 per level to d20 Tests",
                "Level 6: Speed reduced to 0",
                "Level 10: Death",
                "Reduced by 1 per Long Rest (with food/drink)"
            ]
        },
        {
            name: "Frightened",
            icon: "😨",
            description: "Disadvantage on ability checks and attacks while source is visible.",
            effects: [
                "Cannot willingly move closer to source"
            ]
        },
        {
            name: "Grappled",
            icon: "🤼",
            description: "Speed becomes 0. Can't benefit from speed bonuses.",
            effects: [
                "Ends if grappler is incapacitated",
                "Ends if effect removes you from grappler's reach"
            ]
        },
        {
            name: "Incapacitated",
            icon: "💫",
            description: "Cannot take actions, bonus actions, or reactions.",
            effects: []
        },
        {
            name: "Invisible",
            icon: "👻",
            description: "Impossible to see without magic or special sense.",
            effects: [
                "Heavily obscured for hiding",
                "Attack rolls against you have disadvantage",
                "Your attack rolls have advantage"
            ]
        },
        {
            name: "Paralyzed",
            icon: "⚡",
            description: "Incapacitated. Cannot move or speak.",
            effects: [
                "Auto-fail Strength and Dexterity saves",
                "Attacks against you have advantage",
                "Hits within 5 feet are critical hits"
            ]
        },
        {
            name: "Petrified",
            icon: "🗿",
            description: "Transformed to stone. Incapacitated.",
            effects: [
                "Weight increases x10",
                "Stop aging",
                "Resistance to all damage",
                "Immune to poison and disease"
            ]
        },
        {
            name: "Poisoned",
            icon: "🤢",
            description: "Disadvantage on attack rolls and ability checks.",
            effects: []
        },
        {
            name: "Prone",
            icon: "🛋️",
            description: "Can only crawl (half speed) or stand up.",
            effects: [
                "Disadvantage on attack rolls",
                "Attacks within 5 feet have advantage against you",
                "Attacks beyond 5 feet have disadvantage"
            ]
        },
        {
            name: "Restrained",
            icon: "⛓️",
            description: "Speed becomes 0.",
            effects: [
                "Attack rolls against you have advantage",
                "Your attack rolls have disadvantage",
                "Disadvantage on Dexterity saves"
            ]
        },
        {
            name: "Stunned",
            icon: "💥",
            description: "Incapacitated. Cannot move. Speak only falteringly.",
            effects: [
                "Auto-fail Strength and Dexterity saves",
                "Attack rolls against you have advantage"
            ]
        },
        {
            name: "Unconscious",
            icon: "💤",
            description: "Incapacitated. Cannot move or speak. Unaware.",
            effects: [
                "Drop whatever you're holding",
                "Fall prone",
                "Auto-fail Strength and Dexterity saves",
                "Attacks have advantage; hits within 5 feet are crits"
            ]
        }
    ],
    combat: [
        {
            name: "Initiative",
            icon: "🎯",
            description: "Roll d20 + Dexterity modifier at combat start.",
            details: ["Higher rolls act first", "Ties: Compare Dex scores or DM decides"]
        },
        {
            name: "Opportunity Attack",
            icon: "⚡",
            description: "Reaction when hostile leaves your reach.",
            details: ["One melee attack", "Uses your reaction", "Disengage prevents this"]
        },
        {
            name: "Two-Weapon Fighting",
            icon: "🗡️",
            description: "Attack with light weapon in each hand.",
            details: ["Main action: Attack with one light weapon", "Bonus action: Attack with other light weapon", "Don't add ability mod to bonus attack damage (unless negative or have fighting style)"]
        },
        {
            name: "Grappling",
            icon: "🤼",
            description: "Use Attack action to grapple.",
            details: ["Target must be no more than one size larger", "Athletics check vs target's Athletics or Acrobatics", "Success: Target is grappled"]
        },
        {
            name: "Shoving",
            icon: "👐",
            description: "Use Attack action to shove.",
            details: ["Target no more than one size larger", "Athletics vs Athletics/Acrobatics", "Knock prone OR push 5 feet away"]
        },
        {
            name: "Mounted Combat",
            icon: "🐴",
            description: "Rules for fighting while mounted.",
            details: ["Mount acts on your initiative", "Controlled mount: Move and Dodge only", "Independent mount: Full actions"]
        },
        {
            name: "Cover",
            icon: "🧱",
            description: "Obstacles provide protection.",
            details: ["Half Cover: +2 AC, +2 Dex saves", "Three-Quarters: +5 AC, +5 Dex saves", "Total Cover: Can't be targeted directly"]
        }
    ],
    spellcasting: [
        {
            name: "Spell Slots",
            icon: "✨",
            description: "Resource used to cast spells of 1st level or higher.",
            details: ["Recovered on Long Rest (most classes)", "Can upcast using higher slot"]
        },
        {
            name: "Concentration",
            icon: "🎯",
            description: "Some spells require concentration to maintain.",
            details: ["Only one concentration spell at a time", "Taking damage: Con save DC 10 or half damage", "Ends if incapacitated or killed"]
        },
        {
            name: "Spell Attack",
            icon: "🎯",
            description: "d20 + spellcasting mod + proficiency.",
            details: ["Must meet or exceed target AC", "Can crit on natural 20"]
        },
        {
            name: "Saving Throw DC",
            icon: "🛡️",
            description: "8 + proficiency + spellcasting ability modifier.",
            details: ["Target rolls save vs your DC", "Effects vary by spell"]
        },
        {
            name: "Components",
            icon: "📿",
            description: "V = Verbal, S = Somatic, M = Material",
            details: ["V: Must be able to speak", "S: Need a free hand", "M: Need component or focus (unless consumed/has cost)"]
        },
        {
            name: "Ritual Casting",
            icon: "📖",
            description: "Cast ritual spells without using a slot.",
            details: ["Takes 10 extra minutes", "Must have ritual tag", "Class must allow ritual casting"]
        }
    ],
    rest: [
        {
            name: "Short Rest",
            icon: "☕",
            description: "At least 1 hour of downtime.",
            details: ["Spend Hit Dice to heal (roll HD + Con mod)", "Some features recharge"]
        },
        {
            name: "Long Rest",
            icon: "🛏️",
            description: "At least 8 hours, including 6 hours of sleep.",
            details: ["Regain all hit points", "Regain half your Hit Dice (minimum 1)", "Reset most class features", "Remove 1 level of exhaustion (with food/drink)"]
        },
        {
            name: "Hit Dice",
            icon: "❤️",
            description: "Resource for healing during Short Rests.",
            details: ["Equal to your level", "Die type depends on class", "Regain half (round down) on Long Rest"]
        }
    ]
};
