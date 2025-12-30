// Monster Database - SRD Monsters organized by CR for encounter planning

const MONSTERS_DATA = [
    // CR 0
    { name: "Commoner", cr: 0, xp: 10, type: "humanoid", hp: 4, ac: 10 },
    { name: "Bat", cr: 0, xp: 10, type: "beast", hp: 1, ac: 12 },
    { name: "Cat", cr: 0, xp: 10, type: "beast", hp: 2, ac: 12 },
    { name: "Rat", cr: 0, xp: 10, type: "beast", hp: 1, ac: 10 },

    // CR 1/8
    { name: "Bandit", cr: 0.125, xp: 25, type: "humanoid", hp: 11, ac: 12 },
    { name: "Cultist", cr: 0.125, xp: 25, type: "humanoid", hp: 9, ac: 12 },
    { name: "Giant Rat", cr: 0.125, xp: 25, type: "beast", hp: 7, ac: 12 },
    { name: "Kobold", cr: 0.125, xp: 25, type: "humanoid", hp: 5, ac: 12 },
    { name: "Poisonous Snake", cr: 0.125, xp: 25, type: "beast", hp: 2, ac: 13 },
    { name: "Tribal Warrior", cr: 0.125, xp: 25, type: "humanoid", hp: 11, ac: 12 },

    // CR 1/4
    { name: "Acolyte", cr: 0.25, xp: 50, type: "humanoid", hp: 9, ac: 10 },
    { name: "Blink Dog", cr: 0.25, xp: 50, type: "fey", hp: 22, ac: 13 },
    { name: "Boar", cr: 0.25, xp: 50, type: "beast", hp: 11, ac: 11 },
    { name: "Goblin", cr: 0.25, xp: 50, type: "humanoid", hp: 7, ac: 15 },
    { name: "Skeleton", cr: 0.25, xp: 50, type: "undead", hp: 13, ac: 13 },
    { name: "Wolf", cr: 0.25, xp: 50, type: "beast", hp: 11, ac: 13 },
    { name: "Zombie", cr: 0.25, xp: 50, type: "undead", hp: 22, ac: 8 },
    { name: "Giant Wolf Spider", cr: 0.25, xp: 50, type: "beast", hp: 11, ac: 13 },
    { name: "Pseudodragon", cr: 0.25, xp: 50, type: "dragon", hp: 7, ac: 13 },

    // CR 1/2
    { name: "Black Bear", cr: 0.5, xp: 100, type: "beast", hp: 19, ac: 11 },
    { name: "Gnoll", cr: 0.5, xp: 100, type: "humanoid", hp: 22, ac: 15 },
    { name: "Hobgoblin", cr: 0.5, xp: 100, type: "humanoid", hp: 11, ac: 18 },
    { name: "Lizardfolk", cr: 0.5, xp: 100, type: "humanoid", hp: 22, ac: 15 },
    { name: "Orc", cr: 0.5, xp: 100, type: "humanoid", hp: 15, ac: 13 },
    { name: "Satyr", cr: 0.5, xp: 100, type: "fey", hp: 31, ac: 14 },
    { name: "Scout", cr: 0.5, xp: 100, type: "humanoid", hp: 16, ac: 13 },
    { name: "Shadow", cr: 0.5, xp: 100, type: "undead", hp: 16, ac: 12 },
    { name: "Warhorse", cr: 0.5, xp: 100, type: "beast", hp: 19, ac: 11 },
    { name: "Worg", cr: 0.5, xp: 100, type: "monstrosity", hp: 26, ac: 13 },

    // CR 1
    { name: "Animated Armor", cr: 1, xp: 200, type: "construct", hp: 33, ac: 18 },
    { name: "Brown Bear", cr: 1, xp: 200, type: "beast", hp: 34, ac: 11 },
    { name: "Bugbear", cr: 1, xp: 200, type: "humanoid", hp: 27, ac: 16 },
    { name: "Dire Wolf", cr: 1, xp: 200, type: "beast", hp: 37, ac: 14 },
    { name: "Dryad", cr: 1, xp: 200, type: "fey", hp: 22, ac: 11 },
    { name: "Ghoul", cr: 1, xp: 200, type: "undead", hp: 22, ac: 12 },
    { name: "Giant Eagle", cr: 1, xp: 200, type: "beast", hp: 26, ac: 13 },
    { name: "Giant Spider", cr: 1, xp: 200, type: "beast", hp: 26, ac: 14 },
    { name: "Goblin Boss", cr: 1, xp: 200, type: "humanoid", hp: 21, ac: 17 },
    { name: "Harpy", cr: 1, xp: 200, type: "monstrosity", hp: 38, ac: 11 },
    { name: "Hippogriff", cr: 1, xp: 200, type: "monstrosity", hp: 19, ac: 11 },
    { name: "Specter", cr: 1, xp: 200, type: "undead", hp: 22, ac: 12 },
    { name: "Spy", cr: 1, xp: 200, type: "humanoid", hp: 27, ac: 12 },

    // CR 2
    { name: "Bandit Captain", cr: 2, xp: 450, type: "humanoid", hp: 65, ac: 15 },
    { name: "Berserker", cr: 2, xp: 450, type: "humanoid", hp: 67, ac: 13 },
    { name: "Druid", cr: 2, xp: 450, type: "humanoid", hp: 27, ac: 11 },
    { name: "Ghast", cr: 2, xp: 450, type: "undead", hp: 36, ac: 13 },
    { name: "Giant Boar", cr: 2, xp: 450, type: "beast", hp: 42, ac: 12 },
    { name: "Mimic", cr: 2, xp: 450, type: "monstrosity", hp: 58, ac: 12 },
    { name: "Ogre", cr: 2, xp: 450, type: "giant", hp: 59, ac: 11 },
    { name: "Priest", cr: 2, xp: 450, type: "humanoid", hp: 27, ac: 13 },
    { name: "Wererat", cr: 2, xp: 450, type: "humanoid", hp: 33, ac: 12 },
    { name: "Will-o'-Wisp", cr: 2, xp: 450, type: "undead", hp: 22, ac: 19 },

    // CR 3
    { name: "Basilisk", cr: 3, xp: 700, type: "monstrosity", hp: 52, ac: 15 },
    { name: "Hell Hound", cr: 3, xp: 700, type: "fiend", hp: 45, ac: 15 },
    { name: "Knight", cr: 3, xp: 700, type: "humanoid", hp: 52, ac: 18 },
    { name: "Manticore", cr: 3, xp: 700, type: "monstrosity", hp: 68, ac: 14 },
    { name: "Mummy", cr: 3, xp: 700, type: "undead", hp: 58, ac: 11 },
    { name: "Nightmare", cr: 3, xp: 700, type: "fiend", hp: 68, ac: 13 },
    { name: "Owlbear", cr: 3, xp: 700, type: "monstrosity", hp: 59, ac: 13 },
    { name: "Phase Spider", cr: 3, xp: 700, type: "monstrosity", hp: 32, ac: 13 },
    { name: "Veteran", cr: 3, xp: 700, type: "humanoid", hp: 58, ac: 17 },
    { name: "Werewolf", cr: 3, xp: 700, type: "humanoid", hp: 58, ac: 11 },
    { name: "Winter Wolf", cr: 3, xp: 700, type: "monstrosity", hp: 75, ac: 13 },

    // CR 4
    { name: "Banshee", cr: 4, xp: 1100, type: "undead", hp: 58, ac: 12 },
    { name: "Couatl", cr: 4, xp: 1100, type: "celestial", hp: 97, ac: 19 },
    { name: "Ettin", cr: 4, xp: 1100, type: "giant", hp: 85, ac: 12 },
    { name: "Ghost", cr: 4, xp: 1100, type: "undead", hp: 45, ac: 11 },
    { name: "Lamia", cr: 4, xp: 1100, type: "monstrosity", hp: 97, ac: 13 },
    { name: "Wereboar", cr: 4, xp: 1100, type: "humanoid", hp: 78, ac: 10 },
    { name: "Weretiger", cr: 4, xp: 1100, type: "humanoid", hp: 120, ac: 12 },

    // CR 5
    { name: "Air Elemental", cr: 5, xp: 1800, type: "elemental", hp: 90, ac: 15 },
    { name: "Barbed Devil", cr: 5, xp: 1800, type: "fiend", hp: 110, ac: 15 },
    { name: "Bulette", cr: 5, xp: 1800, type: "monstrosity", hp: 94, ac: 17 },
    { name: "Earth Elemental", cr: 5, xp: 1800, type: "elemental", hp: 126, ac: 17 },
    { name: "Fire Elemental", cr: 5, xp: 1800, type: "elemental", hp: 102, ac: 13 },
    { name: "Flesh Golem", cr: 5, xp: 1800, type: "construct", hp: 93, ac: 9 },
    { name: "Gladiator", cr: 5, xp: 1800, type: "humanoid", hp: 112, ac: 16 },
    { name: "Gorgon", cr: 5, xp: 1800, type: "monstrosity", hp: 114, ac: 19 },
    { name: "Hill Giant", cr: 5, xp: 1800, type: "giant", hp: 105, ac: 13 },
    { name: "Night Hag", cr: 5, xp: 1800, type: "fiend", hp: 112, ac: 17 },
    { name: "Otyugh", cr: 5, xp: 1800, type: "aberration", hp: 114, ac: 14 },
    { name: "Salamander", cr: 5, xp: 1800, type: "elemental", hp: 90, ac: 15 },
    { name: "Shambling Mound", cr: 5, xp: 1800, type: "plant", hp: 136, ac: 15 },
    { name: "Troll", cr: 5, xp: 1800, type: "giant", hp: 84, ac: 15 },
    { name: "Unicorn", cr: 5, xp: 1800, type: "celestial", hp: 67, ac: 12 },
    { name: "Water Elemental", cr: 5, xp: 1800, type: "elemental", hp: 114, ac: 14 },
    { name: "Wraith", cr: 5, xp: 1800, type: "undead", hp: 67, ac: 13 },

    // CR 6
    { name: "Chimera", cr: 6, xp: 2300, type: "monstrosity", hp: 114, ac: 14 },
    { name: "Cyclops", cr: 6, xp: 2300, type: "giant", hp: 138, ac: 14 },
    { name: "Drider", cr: 6, xp: 2300, type: "monstrosity", hp: 123, ac: 19 },
    { name: "Galeb Duhr", cr: 6, xp: 2300, type: "elemental", hp: 85, ac: 16 },
    { name: "Invisible Stalker", cr: 6, xp: 2300, type: "elemental", hp: 104, ac: 14 },
    { name: "Mage", cr: 6, xp: 2300, type: "humanoid", hp: 40, ac: 12 },
    { name: "Medusa", cr: 6, xp: 2300, type: "monstrosity", hp: 127, ac: 15 },
    { name: "Wyvern", cr: 6, xp: 2300, type: "dragon", hp: 110, ac: 13 },
    { name: "Young Brass Dragon", cr: 6, xp: 2300, type: "dragon", hp: 110, ac: 17 },

    // CR 7
    { name: "Giant Ape", cr: 7, xp: 2900, type: "beast", hp: 157, ac: 12 },
    { name: "Oni", cr: 7, xp: 2900, type: "giant", hp: 110, ac: 16 },
    { name: "Shield Guardian", cr: 7, xp: 2900, type: "construct", hp: 142, ac: 17 },
    { name: "Stone Giant", cr: 7, xp: 2900, type: "giant", hp: 126, ac: 17 },
    { name: "Young Black Dragon", cr: 7, xp: 2900, type: "dragon", hp: 127, ac: 18 },
    { name: "Young Copper Dragon", cr: 7, xp: 2900, type: "dragon", hp: 119, ac: 17 },

    // CR 8
    { name: "Assassin", cr: 8, xp: 3900, type: "humanoid", hp: 78, ac: 15 },
    { name: "Chain Devil", cr: 8, xp: 3900, type: "fiend", hp: 85, ac: 16 },
    { name: "Cloaker", cr: 8, xp: 3900, type: "aberration", hp: 78, ac: 14 },
    { name: "Frost Giant", cr: 8, xp: 3900, type: "giant", hp: 138, ac: 15 },
    { name: "Hezrou", cr: 8, xp: 3900, type: "fiend", hp: 136, ac: 16 },
    { name: "Hydra", cr: 8, xp: 3900, type: "monstrosity", hp: 172, ac: 15 },
    { name: "Spirit Naga", cr: 8, xp: 3900, type: "monstrosity", hp: 75, ac: 15 },
    { name: "Young Bronze Dragon", cr: 8, xp: 3900, type: "dragon", hp: 142, ac: 18 },
    { name: "Young Green Dragon", cr: 8, xp: 3900, type: "dragon", hp: 136, ac: 18 },

    // CR 9
    { name: "Bone Devil", cr: 9, xp: 5000, type: "fiend", hp: 142, ac: 19 },
    { name: "Clay Golem", cr: 9, xp: 5000, type: "construct", hp: 133, ac: 14 },
    { name: "Cloud Giant", cr: 9, xp: 5000, type: "giant", hp: 200, ac: 14 },
    { name: "Fire Giant", cr: 9, xp: 5000, type: "giant", hp: 162, ac: 18 },
    { name: "Glabrezu", cr: 9, xp: 5000, type: "fiend", hp: 157, ac: 17 },
    { name: "Treant", cr: 9, xp: 5000, type: "plant", hp: 138, ac: 16 },
    { name: "Young Blue Dragon", cr: 9, xp: 5000, type: "dragon", hp: 152, ac: 18 },
    { name: "Young Silver Dragon", cr: 9, xp: 5000, type: "dragon", hp: 168, ac: 18 },

    // CR 10
    { name: "Aboleth", cr: 10, xp: 5900, type: "aberration", hp: 135, ac: 17 },
    { name: "Deva", cr: 10, xp: 5900, type: "celestial", hp: 136, ac: 17 },
    { name: "Guardian Naga", cr: 10, xp: 5900, type: "monstrosity", hp: 127, ac: 18 },
    { name: "Stone Golem", cr: 10, xp: 5900, type: "construct", hp: 178, ac: 17 },
    { name: "Young Gold Dragon", cr: 10, xp: 5900, type: "dragon", hp: 178, ac: 18 },
    { name: "Young Red Dragon", cr: 10, xp: 5900, type: "dragon", hp: 178, ac: 18 },

    // CR 11
    { name: "Behir", cr: 11, xp: 7200, type: "monstrosity", hp: 168, ac: 17 },
    { name: "Djinni", cr: 11, xp: 7200, type: "elemental", hp: 161, ac: 17 },
    { name: "Efreeti", cr: 11, xp: 7200, type: "elemental", hp: 200, ac: 17 },
    { name: "Horned Devil", cr: 11, xp: 7200, type: "fiend", hp: 178, ac: 18 },
    { name: "Remorhaz", cr: 11, xp: 7200, type: "monstrosity", hp: 195, ac: 17 },
    { name: "Roc", cr: 11, xp: 7200, type: "monstrosity", hp: 248, ac: 15 },

    // CR 12
    { name: "Archmage", cr: 12, xp: 8400, type: "humanoid", hp: 99, ac: 12 },
    { name: "Erinyes", cr: 12, xp: 8400, type: "fiend", hp: 153, ac: 18 },

    // CR 13
    { name: "Adult Brass Dragon", cr: 13, xp: 10000, type: "dragon", hp: 172, ac: 18 },
    { name: "Adult White Dragon", cr: 13, xp: 10000, type: "dragon", hp: 200, ac: 18 },
    { name: "Beholder", cr: 13, xp: 10000, type: "aberration", hp: 180, ac: 18 },
    { name: "Nalfeshnee", cr: 13, xp: 10000, type: "fiend", hp: 184, ac: 18 },
    { name: "Rakshasa", cr: 13, xp: 10000, type: "fiend", hp: 110, ac: 16 },
    { name: "Storm Giant", cr: 13, xp: 10000, type: "giant", hp: 230, ac: 16 },
    { name: "Vampire", cr: 13, xp: 10000, type: "undead", hp: 144, ac: 16 },

    // CR 14
    { name: "Adult Black Dragon", cr: 14, xp: 11500, type: "dragon", hp: 195, ac: 19 },
    { name: "Adult Copper Dragon", cr: 14, xp: 11500, type: "dragon", hp: 184, ac: 18 },
    { name: "Ice Devil", cr: 14, xp: 11500, type: "fiend", hp: 180, ac: 18 },

    // CR 15
    { name: "Adult Bronze Dragon", cr: 15, xp: 13000, type: "dragon", hp: 212, ac: 19 },
    { name: "Adult Green Dragon", cr: 15, xp: 13000, type: "dragon", hp: 207, ac: 19 },
    { name: "Mummy Lord", cr: 15, xp: 13000, type: "undead", hp: 97, ac: 17 },
    { name: "Purple Worm", cr: 15, xp: 13000, type: "monstrosity", hp: 247, ac: 18 },

    // CR 16
    { name: "Adult Blue Dragon", cr: 16, xp: 15000, type: "dragon", hp: 225, ac: 19 },
    { name: "Adult Silver Dragon", cr: 16, xp: 15000, type: "dragon", hp: 243, ac: 19 },
    { name: "Iron Golem", cr: 16, xp: 15000, type: "construct", hp: 210, ac: 20 },
    { name: "Marilith", cr: 16, xp: 15000, type: "fiend", hp: 189, ac: 18 },
    { name: "Planetar", cr: 16, xp: 15000, type: "celestial", hp: 200, ac: 19 },

    // CR 17
    { name: "Adult Gold Dragon", cr: 17, xp: 18000, type: "dragon", hp: 256, ac: 19 },
    { name: "Adult Red Dragon", cr: 17, xp: 18000, type: "dragon", hp: 256, ac: 19 },
    { name: "Death Knight", cr: 17, xp: 18000, type: "undead", hp: 180, ac: 20 },
    { name: "Dragon Turtle", cr: 17, xp: 18000, type: "dragon", hp: 341, ac: 20 },
    { name: "Goristro", cr: 17, xp: 18000, type: "fiend", hp: 310, ac: 19 },

    // CR 18
    { name: "Demilich", cr: 18, xp: 20000, type: "undead", hp: 80, ac: 20 },

    // CR 19
    { name: "Balor", cr: 19, xp: 22000, type: "fiend", hp: 262, ac: 19 },

    // CR 20
    { name: "Ancient Brass Dragon", cr: 20, xp: 25000, type: "dragon", hp: 297, ac: 20 },
    { name: "Ancient White Dragon", cr: 20, xp: 25000, type: "dragon", hp: 333, ac: 20 },
    { name: "Pit Fiend", cr: 20, xp: 25000, type: "fiend", hp: 300, ac: 19 },

    // CR 21
    { name: "Ancient Black Dragon", cr: 21, xp: 33000, type: "dragon", hp: 367, ac: 22 },
    { name: "Ancient Copper Dragon", cr: 21, xp: 33000, type: "dragon", hp: 350, ac: 21 },
    { name: "Lich", cr: 21, xp: 33000, type: "undead", hp: 135, ac: 17 },
    { name: "Solar", cr: 21, xp: 33000, type: "celestial", hp: 243, ac: 21 },

    // CR 22
    { name: "Ancient Bronze Dragon", cr: 22, xp: 41000, type: "dragon", hp: 444, ac: 22 },
    { name: "Ancient Green Dragon", cr: 22, xp: 41000, type: "dragon", hp: 385, ac: 21 },

    // CR 23
    { name: "Ancient Blue Dragon", cr: 23, xp: 50000, type: "dragon", hp: 481, ac: 22 },
    { name: "Ancient Silver Dragon", cr: 23, xp: 50000, type: "dragon", hp: 487, ac: 22 },
    { name: "Empyrean", cr: 23, xp: 50000, type: "celestial", hp: 313, ac: 22 },
    { name: "Kraken", cr: 23, xp: 50000, type: "monstrosity", hp: 472, ac: 18 },

    // CR 24
    { name: "Ancient Gold Dragon", cr: 24, xp: 62000, type: "dragon", hp: 546, ac: 22 },
    { name: "Ancient Red Dragon", cr: 24, xp: 62000, type: "dragon", hp: 546, ac: 22 },

    // CR 30
    { name: "Tarrasque", cr: 30, xp: 155000, type: "monstrosity", hp: 676, ac: 25 }
];

// XP Thresholds by level (2024 rules)
const XP_THRESHOLDS = {
    1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
    2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
    3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
    4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
    5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
    6: { easy: 300, medium: 600, hard: 900, deadly: 1400 },
    7: { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
    8: { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
    9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
    10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
    11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
    12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
    13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
    14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
    15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
    16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
    17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
    18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
    19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
    20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 }
};

// Encounter multiplier based on monster count
const ENCOUNTER_MULTIPLIERS = {
    1: 1,
    2: 1.5,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2.5,
    8: 2.5,
    9: 2.5,
    10: 2.5,
    11: 3,
    12: 3,
    13: 3,
    14: 3,
    15: 4
};

function getEncounterMultiplier(count) {
    if (count <= 0) return 0;
    if (count >= 15) return 4;
    return ENCOUNTER_MULTIPLIERS[count] || 4;
}

function getXPThresholds(partySize, avgLevel) {
    const level = Math.max(1, Math.min(20, avgLevel));
    const thresholds = XP_THRESHOLDS[level];
    return {
        easy: thresholds.easy * partySize,
        medium: thresholds.medium * partySize,
        hard: thresholds.hard * partySize,
        deadly: thresholds.deadly * partySize
    };
}

function getEncounterDifficulty(totalXP, partySize, avgLevel) {
    const thresholds = getXPThresholds(partySize, avgLevel);
    if (totalXP >= thresholds.deadly) return 'deadly';
    if (totalXP >= thresholds.hard) return 'hard';
    if (totalXP >= thresholds.medium) return 'medium';
    if (totalXP >= thresholds.easy) return 'easy';
    return 'trivial';
}
