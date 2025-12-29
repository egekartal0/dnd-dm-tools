// NPC Generator Data
const NPCData = {
    races: [
        { name: 'Human', nameStyle: 'common' },
        { name: 'Elf', nameStyle: 'elvish' },
        { name: 'Dwarf', nameStyle: 'dwarvish' },
        { name: 'Halfling', nameStyle: 'halfling' },
        { name: 'Dragonborn', nameStyle: 'draconic' },
        { name: 'Gnome', nameStyle: 'gnomish' },
        { name: 'Half-Elf', nameStyle: 'common' },
        { name: 'Half-Orc', nameStyle: 'orcish' },
        { name: 'Tiefling', nameStyle: 'infernal' },
        { name: 'Aasimar', nameStyle: 'celestial' },
        { name: 'Goliath', nameStyle: 'goliath' },
        { name: 'Tabaxi', nameStyle: 'tabaxi' },
        { name: 'Kenku', nameStyle: 'kenku' },
        { name: 'Tortle', nameStyle: 'tortle' },
        { name: 'Firbolg', nameStyle: 'firbolg' }
    ],

    genders: ['Male', 'Female', 'Non-binary'],

    names: {
        common: {
            male: ['Aldric', 'Bram', 'Cedric', 'Dorian', 'Edmund', 'Felix', 'Gareth', 'Hugo', 'Ivan', 'James', 'Kendrick', 'Liam', 'Marcus', 'Nolan', 'Oliver', 'Patrick', 'Quinn', 'Roland', 'Sebastian', 'Thomas', 'Victor', 'William', 'Zachary'],
            female: ['Adeline', 'Beatrice', 'Clara', 'Diana', 'Elena', 'Fiona', 'Gwendolyn', 'Helena', 'Iris', 'Julia', 'Katherine', 'Lydia', 'Margaret', 'Natalie', 'Ophelia', 'Penelope', 'Rose', 'Sophia', 'Theodora', 'Victoria', 'Winifred', 'Yvonne'],
            surnames: ['Blackwood', 'Cromwell', 'Dunmore', 'Fairfax', 'Goldwyn', 'Hartwell', 'Ironside', 'Kingsley', 'Lockwood', 'Mercer', 'Northcott', 'Oakheart', 'Pemberton', 'Ravencroft', 'Silverstone', 'Thornwood', 'Westbrook', 'Whitmore']
        },
        elvish: {
            male: ['Aelindor', 'Caelum', 'Erevan', 'Faelar', 'Galinndan', 'Hadarai', 'Ivellios', 'Korfel', 'Laucian', 'Mindartis', 'Nuvian', 'Paelias', 'Quarion', 'Riardon', 'Soveliss', 'Thamior', 'Varis', 'Zelphar'],
            female: ['Adrie', 'Birel', 'Caelynn', 'Drusilia', 'Enna', 'Felosial', 'Gaelin', 'Holone', 'Ielenia', 'Keyleth', 'Lia', 'Mialee', 'Naivara', 'Quelenna', 'Sariel', 'Thia', 'Valanthe', 'Xanaphia'],
            surnames: ['Amakiir', 'Galanodel', 'Holimion', 'Ilphelkiir', 'Liadon', 'Meliamne', 'Naïlo', 'Siannodel', 'Xiloscient']
        },
        dwarvish: {
            male: ['Adrik', 'Baern', 'Brottor', 'Darrak', 'Eberk', 'Fargrim', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Rurik', 'Taklinn', 'Thoradin', 'Thorin', 'Tordek', 'Traubon', 'Ulfgar', 'Vondal'],
            female: ['Amber', 'Artin', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth', 'Falkrunn', 'Gunnloda', 'Helja', 'Kathra', 'Kristryd', 'Mardred', 'Riswynn', 'Torbera', 'Vistra'],
            surnames: ['Balderk', 'Battlehammer', 'Brawnanvil', 'Dankil', 'Fireforge', 'Frostbeard', 'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart']
        },
        halfling: {
            male: ['Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'],
            female: ['Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna'],
            surnames: ['Brushgather', 'Goodbarrel', 'Greenbottle', 'Highhill', 'Hilltopple', 'Leagallow', 'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough']
        },
        draconic: {
            male: ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Kriv', 'Medrash', 'Mehen', 'Nadarr', 'Pandjed', 'Patrin', 'Rhogar', 'Shamash', 'Shedinn', 'Tarhun', 'Torinn'],
            female: ['Akra', 'Biri', 'Daar', 'Farideh', 'Harann', 'Havilar', 'Jheri', 'Kava', 'Korinn', 'Mishann', 'Nala', 'Perra', 'Raiann', 'Sora', 'Surina', 'Thava', 'Uadjit'],
            surnames: ['Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion', 'Fenkenkabradon', 'Kepeshkmolik', 'Kerrhylon', 'Kimbatuul', 'Linxakasendalor', 'Myastan', 'Nemmonis', 'Norixius', 'Ophinshtalajiir', 'Prexijandilin', 'Shestendeliath', 'Turnuroth', 'Verthisathurgiesh', 'Yarjerit']
        },
        gnomish: {
            male: ['Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon', 'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble', 'Glim', 'Jebeddo', 'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri', 'Warryn', 'Wrenn', 'Zook'],
            female: ['Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Duvamil', 'Ella', 'Ellyjobell', 'Ellywick', 'Lilli', 'Loopmottin', 'Lorilla', 'Mardnab', 'Nissa', 'Nyx', 'Oda', 'Orla', 'Roywyn', 'Shamil', 'Tana', 'Waywocket', 'Zanna'],
            surnames: ['Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig', 'Ningel', 'Raulnor', 'Scheppen', 'Timbers', 'Turen']
        },
        orcish: {
            male: ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Karash', 'Keth', 'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk', 'Urzul', 'Vrag'],
            female: ['Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen', 'Yevelda'],
            surnames: ['Bonebreaker', 'Doomfist', 'Goreclaw', 'Ironhide', 'Skullcrusher', 'Stonefist', 'Thunderaxe', 'Warblood']
        },
        infernal: {
            male: ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon', 'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios', 'Skamos', 'Therai'],
            female: ['Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea', 'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta'],
            surnames: ['Ashfall', 'Darkflame', 'Hellborn', 'Infernalis', 'Nightshade', 'Shadowmere', 'Soulfire']
        },
        celestial: {
            male: ['Arael', 'Cassiel', 'Ezekiel', 'Gabriel', 'Hariel', 'Israfil', 'Jophiel', 'Kemuel', 'Malahidael', 'Nathaniel', 'Raziel', 'Sachiel', 'Uriel', 'Zadkiel'],
            female: ['Anael', 'Bethel', 'Camael', 'Diniel', 'Eloa', 'Haniel', 'Israfel', 'Lailah', 'Muriel', 'Rahmiel', 'Sariel', 'Tzaphkiel', 'Verchiel'],
            surnames: ['Dawnbringer', 'Lightbane', 'Morningstar', 'Radiance', 'Skyborn', 'Suncrest', 'Twilight']
        },
        goliath: {
            male: ['Aukan', 'Eglath', 'Gauthak', 'Ilikan', 'Keothi', 'Kuori', 'Lo-Kag', 'Manneo', 'Maveith', 'Nalla', 'Orilo', 'Paavu', 'Pethani', 'Thalai', 'Thotham', 'Uthal', 'Vaunea', 'Vimak'],
            female: ['Gae-Al', 'Gauthak', 'Ilikan', 'Kuori', 'Manneo', 'Nalla', 'Orilo', 'Pethani', 'Thalai', 'Uthal', 'Vaunea'],
            surnames: ['Anakalathai', 'Elanithino', 'Gathakanathi', 'Kalagiano', 'Katho-Olavi', 'Kolae-Gileana', 'Ogolakanu', 'Thuliaga', 'Thunukalathi', 'Vaimei-Laga']
        },
        tabaxi: {
            male: ['Cloud on the Mountain', 'Distant Rain', 'Five Timber', 'Jade Shoe', 'Left-Handed Hummingbird', 'Seven Thundercloud', 'Skirt of Snakes', 'Smoking Mirror'],
            female: ['Brook of White Mist', 'Flower That Dreams', 'Garnet Point', 'Humming Rose', 'Jade Sea', 'Morning Dew', 'Spring Honey', 'Summer Flame'],
            surnames: ['Bright Cliffs', 'Distant Rain', 'Mountain Tree', 'Rumbling River', 'Snoring Mountain']
        },
        kenku: {
            male: ['Clatter', 'Creak', 'Crash', 'Doom', 'Gust', 'Hoot', 'Plink', 'Rustle', 'Screech', 'Slam', 'Snap', 'Thunder', 'Whisper', 'Whoosh'],
            female: ['Breeze', 'Chirp', 'Coo', 'Drip', 'Flutter', 'Patter', 'Rustle', 'Shimmer', 'Sigh', 'Song', 'Splash', 'Trill', 'Whistle'],
            surnames: []
        },
        tortle: {
            male: ['Baka', 'Damu', 'Gar', 'Gura', 'Ini', 'Jappa', 'Kinlek', 'Krull', 'Lim', 'Lop', 'Nortle', 'Nulka', 'Olo', 'Plop', 'Quee', 'Quog', 'Sunny', 'Tibor', 'Ubo', 'Xopa', 'Yog'],
            female: ['Bahla', 'Gahla', 'Huhla', 'Kahla', 'Nahla', 'Pahla', 'Rahla', 'Tahla', 'Vahla', 'Wahla', 'Yahla', 'Zahla'],
            surnames: []
        },
        firbolg: {
            male: ['Adran', 'Aodhan', 'Bran', 'Ciaran', 'Conan', 'Dara', 'Eamon', 'Fionn', 'Lorcan', 'Oisin', 'Padraig', 'Ruairi', 'Seamus', 'Tadhg'],
            female: ['Aine', 'Aoife', 'Brianna', 'Ciara', 'Deirdre', 'Eimear', 'Fiona', 'Grainne', 'Niamh', 'Orla', 'Roisin', 'Siobhan', 'Tara'],
            surnames: []
        }
    },

    ages: ['Young Adult', 'Adult', 'Middle-Aged', 'Elderly', 'Ancient'],

    appearance: {
        height: ['Very Short', 'Short', 'Average Height', 'Tall', 'Very Tall'],
        build: ['Thin', 'Lean', 'Average', 'Athletic', 'Muscular', 'Heavyset', 'Stocky'],
        hairColor: ['Black', 'Brown', 'Blonde', 'Red', 'Auburn', 'Gray', 'White', 'Silver', 'Blue', 'Green', 'Purple', 'Bald'],
        hairStyle: ['Long and Straight', 'Long and Wavy', 'Long and Curly', 'Short and Neat', 'Short and Messy', 'Braided', 'In a Bun', 'Ponytail', 'Mohawk', 'Shaved Sides', 'Bald', 'Receding'],
        eyeColor: ['Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Amber', 'Violet', 'Red', 'Gold', 'Silver', 'Black', 'Heterochromatic'],
        skinTone: ['Pale', 'Fair', 'Light', 'Tan', 'Olive', 'Brown', 'Dark Brown', 'Ebony', 'Ashen', 'Greenish', 'Bluish', 'Reddish'],
        distinguishing: [
            'A prominent scar across the face',
            'A missing eye covered by a patch',
            'Intricate tattoos covering visible skin',
            'A birthmark on the cheek',
            'Pointed ears that twitch when excited',
            'Unusually sharp teeth',
            'A crooked nose',
            'Freckles covering the face',
            'Deep wrinkles from age',
            'Burn scars on the hands',
            'A limp in their walk',
            'Always squinting',
            'Heterochromatic eyes',
            'An elaborate hairstyle',
            'Jewelry piercings',
            'A nervous tic',
            'Constantly fidgeting hands',
            'A melodious voice',
            'A raspy voice',
            'An accent from a distant land'
        ]
    },

    personality: {
        traits: [
            'Always speaks in rhymes',
            'Uses big words to sound smart',
            'Incredibly superstitious',
            'Laughs at inappropriate moments',
            'Never looks anyone in the eye',
            'Compulsive liar',
            'Brutally honest',
            'Paranoid about being followed',
            'Constantly cleaning things',
            'Always eating or snacking',
            'Speaks very slowly',
            'Speaks incredibly fast',
            'Uses hand gestures extensively',
            'Whistles or hums constantly',
            'Has a catchphrase they repeat',
            'Collects strange items',
            'Tells stories about their past',
            'Never sits with back to door',
            'Obsessed with a particular topic',
            'Always looking for a good deal'
        ],
        ideals: [
            'Freedom - Everyone should be free to live as they choose',
            'Honor - A word given is a bond that cannot be broken',
            'Power - The strong should rule the weak',
            'Knowledge - Understanding is the key to everything',
            'Wealth - Gold makes the world go round',
            'Family - Blood is thicker than water',
            'Justice - The guilty must be punished',
            'Beauty - Art and beauty make life worth living',
            'Nature - The natural world must be protected',
            'Faith - The gods guide all things',
            'Balance - All things must be in harmony',
            'Redemption - Everyone deserves a second chance'
        ],
        bonds: [
            'Searching for a long-lost family member',
            'Owes a debt to a powerful figure',
            'Protecting a sacred artifact',
            'Seeking revenge against someone',
            'Devoted to their hometown',
            'Loyal to their guild or organization',
            'Caring for an elderly parent',
            'Training an apprentice',
            'Searching for a legendary item',
            'Haunted by a past mistake',
            'Sworn to a secret oath',
            'In love with someone forbidden'
        ],
        flaws: [
            'Addicted to gambling',
            'Crippling fear of the dark',
            'Cannot resist a pretty face',
            'Pathological liar',
            'Terrible temper',
            'Greedy beyond reason',
            'Cowardly when facing danger alone',
            'Stubborn to a fault',
            'Holds grudges forever',
            'Easily manipulated by flattery',
            'Overconfident in their abilities',
            'Trusts no one completely'
        ]
    },

    occupations: [
        'Blacksmith', 'Innkeeper', 'Merchant', 'Farmer', 'Guard', 'Soldier',
        'Healer', 'Priest', 'Scholar', 'Librarian', 'Alchemist', 'Herbalist',
        'Hunter', 'Tracker', 'Fisherman', 'Sailor', 'Shipwright', 'Carpenter',
        'Mason', 'Tailor', 'Weaver', 'Cobbler', 'Tanner', 'Jeweler',
        'Scribe', 'Messenger', 'Courier', 'Stablehand', 'Cook', 'Baker',
        'Brewer', 'Vintner', 'Butcher', 'Chandler', 'Potter', 'Glassblower',
        'Miner', 'Prospector', 'Lumberjack', 'Shepherd', 'Beekeeper', 'Miller',
        'Undertaker', 'Gravedigger', 'Rat Catcher', 'Street Sweeper', 'Beggar',
        'Thief', 'Pickpocket', 'Smuggler', 'Fence', 'Spy', 'Assassin',
        'Entertainer', 'Bard', 'Actor', 'Jester', 'Acrobat', 'Fortune Teller',
        'Noble', 'Knight', 'Squire', 'Herald', 'Diplomat', 'Tax Collector',
        'Judge', 'Lawyer', 'Jailer', 'Executioner', 'Bounty Hunter', 'Mercenary',
        'Wizard', 'Sorcerer', 'Warlock', 'Witch', 'Sage', 'Astronomer',
        'Cartographer', 'Explorer', 'Archaeologist', 'Antiquarian', 'Collector'
    ],

    backgrounds: [
        'Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero',
        'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage',
        'Sailor', 'Soldier', 'Urchin', 'Haunted One', 'Far Traveler'
    ],

    motivations: [
        'Seeking wealth and treasure',
        'Looking for adventure and excitement',
        'Searching for a missing loved one',
        'Running from a dark past',
        'Seeking knowledge and secrets',
        'Trying to make a name for themselves',
        'Serving their god faithfully',
        'Protecting the innocent',
        'Seeking revenge',
        'Trying to lift a curse',
        'Building a business empire',
        'Finding true love',
        'Escaping persecution',
        'Proving themselves worthy',
        'Discovering their true heritage',
        'Atoning for past sins'
    ],

    quirks: [
        'Always carries a lucky charm',
        'Refuses to sleep indoors',
        'Only eats food they prepare themselves',
        'Speaks to animals as if they understand',
        'Collects teeth from defeated enemies',
        'Never uses contractions when speaking',
        'Always counts their steps',
        'Keeps a detailed journal of everything',
        'Refuses to touch gold directly',
        'Always faces north when sleeping',
        'Has a pet they talk to constantly',
        'Carves small figurines when bored',
        'Hums battle songs before conflict',
        'Always introduces themselves with a title',
        'Refuses to drink anything but water',
        'Always sits on the floor, never chairs'
    ]
};
