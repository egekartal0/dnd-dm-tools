// Random Generators Data for D&D

const GENERATOR_DATA = {
    // NPC Names by Race
    names: {
        human: {
            male: ["Aldric", "Bram", "Cedric", "Dorian", "Edmund", "Felix", "Gareth", "Henrik", "Ivan", "Jasper", "Klaus", "Leander", "Marcus", "Nolan", "Otto", "Pierce", "Quinn", "Roland", "Stefan", "Tobias", "Ulric", "Victor", "Willem", "Xavier", "Yuri", "Zander"],
            female: ["Adeline", "Beatrice", "Clara", "Diana", "Elena", "Fiona", "Gwendolyn", "Helena", "Iris", "Julia", "Katherine", "Lydia", "Margaret", "Natasha", "Ophelia", "Penelope", "Quinn", "Rosalind", "Sophia", "Theodora", "Ursula", "Victoria", "Willow", "Xena", "Yvonne", "Zelda"],
            surnames: ["Ashford", "Blackwood", "Cromwell", "Drayton", "Everhart", "Fairfax", "Greystone", "Hartwell", "Ironside", "Jameson", "Kensington", "Lancaster", "Millbrook", "Northcott", "Oakley", "Pemberton", "Quincy", "Ravencroft", "Sterling", "Thornwood", "Underhill", "Vance", "Whitmore", "York"]
        },
        elf: {
            male: ["Aerindel", "Belanor", "Caelum", "Drannor", "Elaris", "Faelar", "Galadon", "Haelion", "Ithildin", "Jhaeros", "Kethryllia", "Laucian", "Merethyl", "Naevys", "Orion", "Phaendar", "Quellan", "Rhistel", "Sildar", "Thalion", "Uthemar", "Vaeril", "Wysaerie", "Xanaphel", "Yhendorn", "Zephrym"],
            female: ["Aelindra", "Bethrynna", "Caelynn", "Daenys", "Eilistraee", "Fhaornik", "Gaelira", "Halueth", "Ilanis", "Jhessail", "Kethryllia", "Leshanna", "Meriele", "Naivara", "Ophyra", "Phaerl", "Quelenna", "Rylai", "Sariel", "Theirastra", "Uriala", "Valanthe", "Wysaerie", "Xiloscient", "Yaeldrin", "Zephyrine"],
            surnames: ["Amakiir (Gemflower)", "Galanodel (Moonwhisper)", "Holimion (Diamonddew)", "Liadon (Silverfrond)", "Meliamne (Oakenheel)", "Nailo (Nightbreeze)", "Siannodel (Moonbrook)", "Xiloscient (Goldpetal)"]
        },
        dwarf: {
            male: ["Adrik", "Baern", "Darrak", "Eberk", "Flint", "Gardain", "Harbek", "Kildrak", "Morgran", "Orsik", "Rurik", "Taklinn", "Thoradin", "Thorin", "Tordek", "Travok", "Ulfgar", "Vondal"],
            female: ["Amber", "Artin", "Audhild", "Bardryn", "Dagnal", "Diesa", "Eldeth", "Falkrunn", "Gunnloda", "Helja", "Kathra", "Kristryd", "Mardred", "Riswynn", "Sannl", "Torbera", "Vistra"],
            surnames: ["Battlehammer", "Boulderlock", "Dankil", "Fireforge", "Frostbeard", "Gorunn", "Holderhek", "Ironfist", "Loderr", "Rumnaheim", "Strakeln", "Torunn", "Ungart"]
        },
        halfling: {
            male: ["Alton", "Ander", "Cade", "Corrin", "Eldon", "Errich", "Finnan", "Garret", "Lindal", "Lyle", "Merric", "Milo", "Osborn", "Perrin", "Reed", "Roscoe", "Wellby"],
            female: ["Andry", "Bree", "Callie", "Cora", "Eupemia", "Jillian", "Kithri", "Lavinia", "Lidda", "Merla", "Nedda", "Paela", "Portia", "Seraphina", "Shaena", "Trym", "Vani", "Verna"],
            surnames: ["Brushgather", "Goodbarrel", "Greenbottle", "Highhill", "Hilltopple", "Leagallow", "Tealeaf", "Thorngage", "Tosscobble", "Underbough"]
        },
        tiefling: {
            male: ["Akmenos", "Amnon", "Barakas", "Damakos", "Ekemon", "Iados", "Kairon", "Leucis", "Melech", "Mordai", "Morthos", "Pelaios", "Skamos", "Therai"],
            female: ["Akta", "Bryseis", "Damaia", "Ea", "Kallista", "Lerissa", "Makaria", "Nemeia", "Orianna", "Phelaia", "Rieta"],
            surnames: ["Art", "Carrion", "Chant", "Creed", "Despair", "Fear", "Glory", "Hope", "Ideal", "Music", "Nowhere", "Open", "Poetry", "Quest", "Random", "Sorrow", "Torment", "Weary"]
        },
        dragonborn: {
            male: ["Arjhan", "Balasar", "Bharash", "Donaar", "Ghesh", "Heskan", "Kriv", "Medrash", "Mehen", "Nadarr", "Pandjed", "Patrin", "Rhogar", "Shamash", "Shedinn", "Tarhun", "Torinn"],
            female: ["Akra", "Biri", "Daar", "Farideh", "Harann", "Havilar", "Jheri", "Kava", "Korinn", "Mishann", "Nala", "Perra", "Raiann", "Sora", "Surina", "Thava", "Uadjit"],
            surnames: ["Clethtinthiallor", "Daardendrian", "Delmirev", "Drachedandion", "Fenkenkabradon", "Kepeshkmolik", "Kerrhylon", "Kimbatuul", "Linxakasendalor", "Myastan", "Nemmonis", "Norixius", "Ophinshtalajiir", "Prexijandilin", "Shestendeliath", "Turnuroth", "Verthisathurgiesh", "Yarjerit"]
        },
        orc: {
            male: ["Dench", "Feng", "Gell", "Henk", "Holg", "Imsh", "Keth", "Krusk", "Mhurren", "Ront", "Shump", "Thokk"],
            female: ["Baggi", "Emen", "Engong", "Kansif", "Myev", "Neega", "Ovak", "Ownka", "Shautha", "Sutha", "Vola", "Volen", "Yevelda"],
            surnames: ["Bloodfist", "Doom Hammer", "Eye Gouger", "Flesh Ripper", "Iron Tusk", "Skull Cleaver", "Spine Snapper", "Thunder Caller"]
        },
        gnome: {
            male: ["Alston", "Alvyn", "Boddynock", "Brocc", "Burgell", "Dimble", "Eldon", "Erky", "Fonkin", "Frug", "Gerbo", "Gimble", "Glim", "Jebeddo", "Kellen", "Namfoodle", "Orryn", "Roondar", "Seebo", "Sindri", "Warryn", "Wrenn", "Zook"],
            female: ["Bimpnottin", "Breena", "Caramip", "Carlin", "Donella", "Duvamil", "Ella", "Ellyjobell", "Ellywick", "Lilli", "Loopmottin", "Lorilla", "Mardnab", "Nissa", "Nyx", "Oda", "Orla", "Roywyn", "Shamil", "Tana", "Waywocket", "Zanna"],
            surnames: ["Beren", "Daergel", "Folkor", "Garrick", "Nackle", "Murnig", "Ningel", "Raulnor", "Scheppen", "Timbers", "Turen"]
        }
    },

    // NPC Personality Traits
    personality: {
        traits: [
            "Always speaks in rhymes",
            "Constantly fidgets with a lucky charm",
            "Laughs at inappropriate moments",
            "Never makes eye contact",
            "Speaks incredibly slowly",
            "Always whispers",
            "Obsessed with cleanliness",
            "Collects strange items (teeth, buttons, etc.)",
            "Tells obviously false stories about their past",
            "References an imaginary friend",
            "Always hungry, always eating",
            "Paranoid about being followed",
            "Overly formal, even in casual situations",
            "Uses big words incorrectly",
            "Has a catchphrase they overuse"
        ],
        ideals: [
            "Honor: I always keep my word",
            "Freedom: No one should be shackled",
            "Knowledge: Learning is the greatest treasure",
            "Power: The strong rule the weak",
            "Tradition: The old ways are best",
            "Charity: Help those in need",
            "Glory: Fame and recognition matter most",
            "Balance: Everything has its place",
            "Redemption: Everyone deserves a second chance",
            "Chaos: Rules are meant to be broken"
        ],
        bonds: [
            "Protective of their family",
            "Owes a life debt to someone",
            "Seeking revenge for a past wrong",
            "Devoted to their deity",
            "Loyal to their homeland",
            "Bound by an unbreakable oath",
            "Searching for a lost love",
            "Trying to restore family honor",
            "Protecting a dangerous secret",
            "Responsible for an orphaned child"
        ],
        flaws: [
            "Terrible liar",
            "Greedy for gold",
            "Has a dark secret",
            "Trusts no one",
            "Overconfident in abilities",
            "Addicted to gambling",
            "Holds grudges forever",
            "Easily distracted by shiny things",
            "Cowardly in dangerous situations",
            "Can't resist a pretty face"
        ]
    },

    // Tavern Names
    taverns: {
        adjectives: ["The Rusty", "The Golden", "The Silver", "The Drunken", "The Prancing", "The Laughing", "The Sleepy", "The Wandering", "The Lucky", "The Broken", "The Gilded", "The Crimson", "The Frosty", "The Mystic", "The Noble", "The Dancing", "The Howling", "The Flying", "The Salty", "The Hungry"],
        nouns: ["Dragon", "Griffin", "Unicorn", "Stag", "Boar", "Kraken", "Phoenix", "Mermaid", "Goblin", "Owl", "Wolf", "Bear", "Fox", "Raven", "Serpent", "Hammer", "Sword", "Shield", "Crown", "Tankard", "Barrel", "Helm", "Anchor", "Lantern", "Star"]
    },

    // Quest Hooks
    quests: {
        rescue: [
            "A noble's child has been kidnapped by bandits demanding ransom",
            "Villagers have gone missing in the old mine",
            "A famous bard is being held captive by a jealous rival",
            "The blacksmith's apprentice wandered into the haunted forest",
            "A merchant caravan was ambushed; survivors are hostages"
        ],
        hunt: [
            "A dire wolf has been terrorizing the countryside",
            "A troll has made its lair under the bridge",
            "Reports of a young dragon spotted near the village",
            "Giant spiders have infested the old tower",
            "An owlbear is attacking travelers on the road"
        ],
        fetch: [
            "Retrieve a stolen family heirloom from thieves' guild",
            "Find rare herbs in the dangerous swamp",
            "Recover an ancient tome from ruins",
            "Obtain giant eagle feathers for a wizard's ritual",
            "Bring back proof of a monster's defeat"
        ],
        mystery: [
            "Why did the temple's holy symbol start bleeding?",
            "Who murdered the merchant found in the locked room?",
            "What caused all the animals to flee the forest?",
            "Why do people hear singing from the abandoned well?",
            "What happened to the wizard who vanished mid-spell?"
        ],
        escort: [
            "Protect a merchant caravan through dangerous territory",
            "Guide a noble's heir safely to their wedding",
            "Escort a witness to testify at the capital",
            "Transport a dangerous prisoner to the fortress",
            "Lead a group of refugees to safety"
        ]
    },

    // Treasure
    treasure: {
        coins: {
            1: { cp: "3d6 x 10", sp: "2d6 x 10", ep: "0", gp: "1d6", pp: "0" },
            5: { cp: "5d6 x 100", sp: "3d6 x 100", ep: "2d6 x 10", gp: "2d6 x 10", pp: "1d6" },
            11: { cp: "4d6 x 1000", sp: "6d6 x 100", ep: "3d6 x 100", gp: "2d6 x 100", pp: "2d6 x 10" },
            17: { cp: "12d6 x 1000", sp: "8d6 x 1000", ep: "0", gp: "6d6 x 1000", pp: "3d6 x 1000" }
        },
        gemstones: {
            10: ["Azurite", "Banded Agate", "Blue Quartz", "Eye Agate", "Hematite", "Lapis Lazuli", "Malachite", "Moss Agate", "Obsidian", "Rhodochrosite", "Tiger Eye", "Turquoise"],
            50: ["Bloodstone", "Carnelian", "Chalcedony", "Chrysoprase", "Citrine", "Jasper", "Moonstone", "Onyx", "Quartz", "Sardonyx", "Star Rose Quartz", "Zircon"],
            100: ["Amber", "Amethyst", "Chrysoberyl", "Coral", "Garnet", "Jade", "Jet", "Pearl", "Spinel", "Tourmaline"],
            500: ["Alexandrite", "Aquamarine", "Black Pearl", "Blue Spinel", "Peridot", "Topaz"],
            1000: ["Black Opal", "Blue Sapphire", "Emerald", "Fire Opal", "Opal", "Star Ruby", "Star Sapphire", "Yellow Sapphire"],
            5000: ["Black Sapphire", "Diamond", "Jacinth", "Ruby"]
        },
        magicItems: {
            common: ["Potion of Healing", "Spell Scroll (cantrip)", "Potion of Climbing", "Candle of the Deep", "Clothes of Mending"],
            uncommon: ["Potion of Greater Healing", "+1 Weapon", "+1 Armor", "Bag of Holding", "Boots of Elvenkind", "Cloak of Protection", "Goggles of Night", "Immovable Rod"],
            rare: ["Potion of Superior Healing", "+2 Weapon", "+2 Armor", "Cloak of Displacement", "Flame Tongue", "Ring of Protection", "Staff of the Python", "Wings of Flying"]
        }
    },

    // Plot Twists
    plotTwists: [
        "The quest giver is actually the villain",
        "The monster they're hunting is innocent; the real threat is human",
        "An ally has been a traitor all along",
        "The treasure is cursed",
        "The 'evil cult' is actually trying to prevent a greater evil",
        "The dead aren't staying dead",
        "The hero prophesied to save everyone is one of the party",
        "Two factions the party trusted are working together against them",
        "The villain is a relative of a party member",
        "The solution requires sacrifice from the party",
        "Everything they know about the world is a lie",
        "The 'damsel in distress' is the most dangerous person in the room"
    ],

    // Random Encounters by Environment
    encounters: {
        forest: {
            1: ["2d4 Wolves", "1d4 Giant Spiders", "4d6 Goblins", "1d4 Dire Wolves", "2d4 Bandits"],
            5: ["1d4 Owlbears", "1 Treant", "2d4 Gnolls", "1 Green Hag", "1d4 Werewolves"],
            11: ["1 Young Green Dragon", "1d4 Trolls", "1 Unicorn with druid guardian", "2d4 Dryads"]
        },
        dungeon: {
            1: ["2d4 Skeletons", "1d4 Zombies", "2d4 Goblins", "1 Gelatinous Cube", "1d4 Giant Rats"],
            5: ["1d4 Ghasts", "1 Mimic", "2d4 Hobgoblins", "1 Wraith", "1d4 Shadows"],
            11: ["1 Beholder Zombie", "2d4 Specters", "1 Mummy Lord", "1d4 Vampiric Mist"]
        },
        city: {
            1: ["2d4 Bandits", "1d4 Thugs", "1 Spy", "Press Gang (4d4 bandits)", "Pickpocket encounter"],
            5: ["1 Assassin", "Thieves Guild Ambush", "Corrupt Guard Patrol", "1 Wererat + gang"],
            11: ["Noble assassins", "Cult gathering", "Devil in disguise", "1 Rakshasa"]
        },
        road: {
            1: ["Merchant caravan needing help", "2d4 Bandits", "Broken wagon blocking path", "Lost travelers", "1d4 Wolves"],
            5: ["Bandit Captain's roadblock", "Traveling merchants under attack", "Knight errant seeking duel", "Refugee caravan"],
            11: ["Noble's carriage attack", "Bounty hunters seeking party", "Dragon flyover", "Army patrol"]
        },
        mountain: {
            1: ["1d4 Giant Goats", "2d4 Kobolds", "1d4Harpies", "Rock slide trap", "1 Griffon"],
            5: ["1d4 Ogres", "1 Stone Giant", "1d4 Perytons", "1 Chimera"],
            11: ["1 Cloud Giant", "1d4 Frost Giants", "1 Adult White Dragon", "1 Roc"]
        }
    },

    // Traps
    traps: {
        setback: [
            { name: "Poison Dart Trap", dc: 10, damage: "1d4 poison", description: "Hidden dart shoots from wall" },
            { name: "Pit Trap", dc: 10, damage: "1d6 falling", description: "10ft pit opens beneath feet" },
            { name: "Alarm Trap", dc: 12, damage: "None", description: "Loud bell or magic alert; enemies alerted" },
            { name: "Tripwire Net", dc: 10, damage: "None", description: "Target restrained until freed" }
        ],
        dangerous: [
            { name: "Poisoned Needle Lock", dc: 15, damage: "2d10 poison + poisoned 1 hour", description: "Lock has hidden needle" },
            { name: "Spiked Pit", dc: 15, damage: "2d6 + 2d6 piercing", description: "20ft pit with spikes" },
            { name: "Collapsing Ceiling", dc: 15, damage: "4d6 bludgeoning", description: "Pressure plate collapses roof" },
            { name: "Flame Jet", dc: 13, damage: "4d6 fire", description: "Hidden nozzle shoots flames" }
        ],
        deadly: [
            { name: "Sphere of Annihilation", dc: 20, damage: "4d10 force, destroyed on fail by 5+", description: "Hidden sphere trap" },
            { name: "Poison Gas Room", dc: 18, damage: "6d10 poison", description: "Room fills with gas, doors lock" },
            { name: "Crush Walls", dc: 20, damage: "10d10 bludgeoning", description: "Walls slowly close in" },
            { name: "Disintegration Ray", dc: 18, damage: "10d6+40 force", description: "Magical eye fires ray" }
        ]
    },

    // Riddles
    riddles: [
        { riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", answer: "A map" },
        { riddle: "The more you take, the more you leave behind. What am I?", answer: "Footsteps" },
        { riddle: "I can be cracked, made, told, and played. What am I?", answer: "A joke" },
        { riddle: "What has keys but no locks, space but no room, and you can enter but can't go inside?", answer: "A keyboard" },
        { riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", answer: "An echo" },
        { riddle: "Forward I'm heavy, backward I'm not. What am I?", answer: "Ton" },
        { riddle: "What can travel around the world while staying in a corner?", answer: "A stamp" },
        { riddle: "I have teeth but cannot bite. What am I?", answer: "A comb" }
    ],

    // Weather
    weather: {
        temperate: ["Clear and sunny", "Partly cloudy", "Overcast", "Light rain", "Heavy rain", "Thunderstorm", "Foggy", "Light breeze", "Strong winds", "Hail"],
        tropical: ["Hot and humid", "Monsoon rain", "Tropical storm", "Sweltering heat", "Brief afternoon showers", "Muggy and still", "Hurricane approaching"],
        arctic: ["Blizzard", "Heavy snow", "Biting cold wind", "Ice storm", "Whiteout conditions", "Clear but freezing", "Light snow", "Aurora visible at night"],
        desert: ["Scorching heat", "Sandstorm", "Dry winds", "Cool night", "Dust devils", "Rare rainfall", "Haze", "Clear starry night"]
    },

    // Combat Descriptions
    combatDescriptions: {
        hit: {
            sword: ["The blade bites deep into flesh", "Steel meets bone with a sickening crunch", "The sword slashes across their body", "A precise thrust finds its mark"],
            axe: ["The axe cleaves through armor", "A brutal chop sends them staggering", "The heavy blade buries into their side", "Wood splinters as the axe connects"],
            bow: ["The arrow finds its mark", "The shaft pierces through", "A clean shot connects", "The arrow thuds into their body"],
            spell: ["Arcane energy crackles against them", "The spell slams into them with force", "Magic burns through their defenses", "Mystical power strikes true"],
            fist: ["The punch connects solidly", "Knuckles crack against jaw", "A devastating blow lands", "The strike sends them reeling"]
        },
        miss: {
            sword: ["The blade whistles past", "Steel rings against stone", "They dance away from the strike", "The swing goes wide"],
            axe: ["The heavy weapon misses by inches", "The axe buries in wood instead", "They duck under the swing", "Your momentum carries you past"],
            bow: ["The arrow flies wide", "The shaft clatters off stone", "Wind carries the arrow astray", "They sidestep the shot"],
            spell: ["The spell fizzles against their ward", "Arcane energy disperses harmlessly", "They dodge the magical blast", "The spell goes wild"],
            fist: ["Your fist meets empty air", "They weave away from the blow", "The punch glances off", "They catch your strike"]
        },
        crit: {
            sword: ["The blade sings through the air, finding the perfect opening and striking a devastating blow!", "A masterful strike! The sword bites deep, blood spraying!", "Time seems to slow as the blade finds the gap in their defenses!"],
            axe: ["The axe comes down with tremendous force, cleaving through all resistance!", "A mighty blow! The weapon nearly splits them in two!", "The brutal strike lands with bone-crushing impact!"],
            bow: ["The arrow flies true, striking a vital point!", "A perfect shot! The arrow buries to the fletching!", "The shaft finds the smallest gap in their armor!"],
            spell: ["The spell explodes with devastating force!", "Raw arcane power surges through them!", "Magic tears through them with terrible fury!"],
            fist: ["A devastating blow that could shatter stone!", "The impact echoes through the battlefield!", "A thunderous punch that leaves them dazed!"]
        },
        kill: {
            sword: ["The final blow is struck, and they crumple to the ground", "Your blade ends their life with a decisive thrust", "They fall, never to rise again"],
            axe: ["The killing blow cleaves them down", "They collapse under the final devastating chop", "The axe claims another victim"],
            bow: ["The killing shot strikes true", "They fall with an arrow through their heart", "The final shaft ends their threat forever"],
            spell: ["Arcane power consumes them entirely", "The spell tears the life from their body", "Magic ends their existence in a flash"],
            fist: ["The killing blow drops them instantly", "They fall and move no more", "Your final strike ends the fight permanently"]
        }
    },

    // Shop Inventories
    shops: {
        general: [
            { name: "Backpack", price: "2 gp" },
            { name: "Bedroll", price: "1 gp" },
            { name: "Torch (10)", price: "1 sp" },
            { name: "Rope, 50 ft", price: "1 gp" },
            { name: "Rations (1 day)", price: "5 sp" },
            { name: "Waterskin", price: "2 sp" },
            { name: "Tinderbox", price: "5 sp" },
            { name: "Candles (10)", price: "1 sp" },
            { name: "Oil flask", price: "1 sp" },
            { name: "Chalk (10 pieces)", price: "1 sp" }
        ],
        blacksmith: [
            { name: "Longsword", price: "15 gp" },
            { name: "Shortsword", price: "10 gp" },
            { name: "Greataxe", price: "30 gp" },
            { name: "Dagger", price: "2 gp" },
            { name: "Chain Mail", price: "75 gp" },
            { name: "Leather Armor", price: "10 gp" },
            { name: "Shield", price: "10 gp" },
            { name: "Longbow", price: "50 gp" },
            { name: "Arrows (20)", price: "1 gp" },
            { name: "Repair services", price: "5 gp" }
        ],
        magic: [
            { name: "Potion of Healing", price: "50 gp" },
            { name: "Scroll of Identify", price: "100 gp" },
            { name: "Potion of Climbing", price: "75 gp" },
            { name: "Arcane Focus", price: "10 gp" },
            { name: "Component Pouch", price: "25 gp" },
            { name: "Spell Scroll (1st)", price: "75 gp" },
            { name: "Potion of Greater Healing", price: "150 gp" },
            { name: "Bag of Holding", price: "500 gp" }
        ],
        potion: [
            { name: "Potion of Healing", price: "50 gp" },
            { name: "Antitoxin", price: "50 gp" },
            { name: "Potion of Fire Breath", price: "150 gp" },
            { name: "Potion of Resistance", price: "300 gp" },
            { name: "Potion of Water Breathing", price: "180 gp" },
            { name: "Potion of Heroism", price: "180 gp" },
            { name: "Potion of Greater Healing", price: "150 gp" },
            { name: "Oil of Slipperiness", price: "480 gp" }
        ],
        tavern: [
            { name: "Ale (mug)", price: "4 cp" },
            { name: "Wine (pitcher)", price: "2 sp" },
            { name: "Fine wine (bottle)", price: "10 gp" },
            { name: "Bread and cheese", price: "3 cp" },
            { name: "Meat stew", price: "5 cp" },
            { name: "Roast fowl", price: "1 sp" },
            { name: "Room (common)", price: "5 sp/night" },
            { name: "Room (private)", price: "2 gp/night" },
            { name: "Stable for mount", price: "5 sp/night" },
            { name: "Hot bath", price: "3 cp" }
        ]
    }
};
