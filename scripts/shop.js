// Shop Generator Module - Create and manage shop inventories
const ShopGenerator = {
    savedShops: [],
    currentShop: null,

    shopTypes: {
        blacksmith: {
            name: 'Blacksmith',
            icon: '⚔️',
            items: [
                { name: 'Longsword', price: 15, rarity: 'common' },
                { name: 'Shortsword', price: 10, rarity: 'common' },
                { name: 'Greatsword', price: 50, rarity: 'common' },
                { name: 'Dagger', price: 2, rarity: 'common' },
                { name: 'Handaxe', price: 5, rarity: 'common' },
                { name: 'Battleaxe', price: 10, rarity: 'common' },
                { name: 'Greataxe', price: 30, rarity: 'common' },
                { name: 'Warhammer', price: 15, rarity: 'common' },
                { name: 'Maul', price: 10, rarity: 'common' },
                { name: 'Mace', price: 5, rarity: 'common' },
                { name: 'Morningstar', price: 15, rarity: 'common' },
                { name: 'Flail', price: 10, rarity: 'common' },
                { name: 'Spear', price: 1, rarity: 'common' },
                { name: 'Pike', price: 5, rarity: 'common' },
                { name: 'Halberd', price: 20, rarity: 'common' },
                { name: 'Glaive', price: 20, rarity: 'common' },
                { name: 'Trident', price: 5, rarity: 'common' },
                { name: 'Rapier', price: 25, rarity: 'common' },
                { name: 'Scimitar', price: 25, rarity: 'common' },
                { name: 'Chain Mail', price: 75, rarity: 'common' },
                { name: 'Scale Mail', price: 50, rarity: 'common' },
                { name: 'Breastplate', price: 400, rarity: 'uncommon' },
                { name: 'Half Plate', price: 750, rarity: 'uncommon' },
                { name: 'Plate Armor', price: 1500, rarity: 'rare' },
                { name: 'Shield', price: 10, rarity: 'common' },
                { name: 'Helmet', price: 5, rarity: 'common' },
                { name: 'Gauntlets', price: 3, rarity: 'common' }
            ]
        },
        magic: {
            name: 'Magic Shop',
            icon: '✨',
            items: [
                { name: 'Potion of Healing', price: 50, rarity: 'common' },
                { name: 'Potion of Greater Healing', price: 150, rarity: 'uncommon' },
                { name: 'Potion of Superior Healing', price: 450, rarity: 'rare' },
                { name: 'Scroll of Identify', price: 25, rarity: 'common' },
                { name: 'Scroll of Magic Missile', price: 50, rarity: 'common' },
                { name: 'Scroll of Shield', price: 50, rarity: 'common' },
                { name: 'Scroll of Fireball', price: 300, rarity: 'uncommon' },
                { name: 'Scroll of Lightning Bolt', price: 300, rarity: 'uncommon' },
                { name: 'Bag of Holding', price: 500, rarity: 'uncommon' },
                { name: 'Cloak of Protection', price: 1500, rarity: 'uncommon' },
                { name: 'Ring of Protection', price: 3500, rarity: 'rare' },
                { name: 'Boots of Elvenkind', price: 2500, rarity: 'uncommon' },
                { name: 'Cloak of Elvenkind', price: 2500, rarity: 'uncommon' },
                { name: 'Goggles of Night', price: 1500, rarity: 'uncommon' },
                { name: 'Immovable Rod', price: 5000, rarity: 'uncommon' },
                { name: 'Wand of Magic Missiles', price: 8000, rarity: 'uncommon' },
                { name: 'Pearl of Power', price: 6000, rarity: 'uncommon' },
                { name: 'Amulet of Proof Against Detection', price: 20000, rarity: 'rare' },
                { name: '+1 Weapon (your choice)', price: 1000, rarity: 'uncommon' },
                { name: '+1 Shield', price: 1500, rarity: 'uncommon' },
                { name: '+1 Armor (your choice)', price: 1500, rarity: 'uncommon' }
            ]
        },
        potion: {
            name: 'Potion Shop',
            icon: '🧪',
            items: [
                { name: 'Potion of Healing', price: 50, rarity: 'common' },
                { name: 'Potion of Greater Healing', price: 150, rarity: 'uncommon' },
                { name: 'Potion of Superior Healing', price: 450, rarity: 'rare' },
                { name: 'Potion of Supreme Healing', price: 1350, rarity: 'very rare' },
                { name: 'Antitoxin', price: 50, rarity: 'common' },
                { name: 'Potion of Poison', price: 100, rarity: 'uncommon' },
                { name: 'Potion of Resistance (Fire)', price: 300, rarity: 'uncommon' },
                { name: 'Potion of Resistance (Cold)', price: 300, rarity: 'uncommon' },
                { name: 'Potion of Resistance (Lightning)', price: 300, rarity: 'uncommon' },
                { name: 'Potion of Water Breathing', price: 180, rarity: 'uncommon' },
                { name: 'Potion of Invisibility', price: 180, rarity: 'very rare' },
                { name: 'Potion of Speed', price: 400, rarity: 'very rare' },
                { name: 'Potion of Giant Strength (Hill)', price: 500, rarity: 'uncommon' },
                { name: 'Potion of Giant Strength (Frost)', price: 1000, rarity: 'rare' },
                { name: 'Potion of Giant Strength (Fire)', price: 2500, rarity: 'rare' },
                { name: 'Potion of Flying', price: 500, rarity: 'very rare' },
                { name: 'Potion of Heroism', price: 180, rarity: 'rare' },
                { name: 'Potion of Mind Reading', price: 180, rarity: 'rare' },
                { name: 'Oil of Slipperiness', price: 480, rarity: 'uncommon' },
                { name: 'Philter of Love', price: 90, rarity: 'uncommon' }
            ]
        },
        general: {
            name: 'General Store',
            icon: '🏪',
            items: [
                { name: 'Backpack', price: 2, rarity: 'common' },
                { name: 'Bedroll', price: 1, rarity: 'common' },
                { name: 'Rope (50 feet)', price: 1, rarity: 'common' },
                { name: 'Torch (10)', price: 0.1, rarity: 'common' },
                { name: 'Rations (1 day)', price: 0.5, rarity: 'common' },
                { name: 'Waterskin', price: 0.2, rarity: 'common' },
                { name: 'Tinderbox', price: 0.5, rarity: 'common' },
                { name: 'Lantern (Hooded)', price: 5, rarity: 'common' },
                { name: 'Oil Flask', price: 0.1, rarity: 'common' },
                { name: 'Crowbar', price: 2, rarity: 'common' },
                { name: 'Grappling Hook', price: 2, rarity: 'common' },
                { name: 'Hammer', price: 1, rarity: 'common' },
                { name: 'Pitons (10)', price: 0.5, rarity: 'common' },
                { name: 'Tent (2-person)', price: 2, rarity: 'common' },
                { name: 'Caltrops (bag of 20)', price: 1, rarity: 'common' },
                { name: 'Ball Bearings (bag of 1000)', price: 1, rarity: 'common' },
                { name: 'Chalk (10 pieces)', price: 0.1, rarity: 'common' },
                { name: 'Ink (1 oz bottle)', price: 10, rarity: 'common' },
                { name: 'Paper (10 sheets)', price: 2, rarity: 'common' },
                { name: 'Sealing Wax', price: 0.5, rarity: 'common' },
                { name: 'Soap', price: 0.02, rarity: 'common' },
                { name: 'Mirror (Steel)', price: 5, rarity: 'common' },
                { name: 'Mess Kit', price: 0.2, rarity: 'common' },
                { name: "Healer's Kit", price: 5, rarity: 'common' },
                { name: "Climber's Kit", price: 25, rarity: 'common' },
                { name: "Disguise Kit", price: 25, rarity: 'common' },
                { name: "Thieves' Tools", price: 25, rarity: 'common' },
                { name: 'Spyglass', price: 1000, rarity: 'uncommon' }
            ]
        },
        tavern: {
            name: 'Tavern',
            icon: '🍺',
            items: [
                { name: 'Ale (mug)', price: 0.04, rarity: 'common' },
                { name: 'Ale (gallon)', price: 0.2, rarity: 'common' },
                { name: 'Wine (common, pitcher)', price: 0.2, rarity: 'common' },
                { name: 'Wine (fine, bottle)', price: 10, rarity: 'uncommon' },
                { name: 'Mead (mug)', price: 0.05, rarity: 'common' },
                { name: 'Meal (poor)', price: 0.1, rarity: 'common' },
                { name: 'Meal (modest)', price: 0.3, rarity: 'common' },
                { name: 'Meal (comfortable)', price: 0.5, rarity: 'common' },
                { name: 'Meal (wealthy)', price: 0.8, rarity: 'common' },
                { name: 'Cheese (hunk)', price: 0.1, rarity: 'common' },
                { name: 'Bread (loaf)', price: 0.02, rarity: 'common' },
                { name: 'Room (poor, night)', price: 0.1, rarity: 'common' },
                { name: 'Room (modest, night)', price: 0.5, rarity: 'common' },
                { name: 'Room (comfortable, night)', price: 1, rarity: 'common' },
                { name: 'Room (wealthy, night)', price: 2, rarity: 'common' },
                { name: 'Stabling (per night)', price: 0.5, rarity: 'common' }
            ]
        },
        temple: {
            name: 'Temple',
            icon: '⛪',
            items: [
                { name: 'Cure Wounds (service)', price: 10, rarity: 'common' },
                { name: 'Lesser Restoration (service)', price: 40, rarity: 'uncommon' },
                { name: 'Remove Curse (service)', price: 90, rarity: 'uncommon' },
                { name: 'Greater Restoration (service)', price: 450, rarity: 'rare' },
                { name: 'Raise Dead (service)', price: 1000, rarity: 'rare' },
                { name: 'Resurrection (service)', price: 3000, rarity: 'very rare' },
                { name: 'Holy Water (flask)', price: 25, rarity: 'common' },
                { name: 'Holy Symbol (amulet)', price: 5, rarity: 'common' },
                { name: 'Holy Symbol (emblem)', price: 5, rarity: 'common' },
                { name: 'Holy Symbol (reliquary)', price: 5, rarity: 'common' },
                { name: 'Incense (block)', price: 0.01, rarity: 'common' },
                { name: 'Prayer Book', price: 1, rarity: 'common' },
                { name: 'Candles (10)', price: 0.1, rarity: 'common' }
            ]
        }
    },

    ownerFirstNames: ['Aldric', 'Bran', 'Cedric', 'Doran', 'Elara', 'Fiona', 'Gareth', 'Helena', 'Ivan', 'Jasmine', 'Kira', 'Liam', 'Mira', 'Nigel', 'Ophelia', 'Piotr', 'Quinn', 'Rosa', 'Stefan', 'Thalia', 'Ulric', 'Vera', 'Willem', 'Xena', 'Yuri', 'Zara'],
    ownerLastNames: ['Ironforge', 'Goldleaf', 'Stormwind', 'Brightwood', 'Darkhollow', 'Silverstone', 'Thornwood', 'Oakenshield', 'Flameheart', 'Frostbane', 'Shadowmere', 'Sunfire', 'Moonbrook', 'Starfall', 'Thunderstone', 'Ravencrest', 'Wolfsbane', 'Dragonscale', 'Crystalvale', 'Mistwood'],

    init() {
        this.loadSavedShops();
        this.bindEvents();
        this.renderSavedList();
    },

    loadSavedShops() {
        const saved = localStorage.getItem('dnd-shops');
        this.savedShops = saved ? JSON.parse(saved) : [];
    },

    saveToDisk() {
        localStorage.setItem('dnd-shops', JSON.stringify(this.savedShops));
    },

    bindEvents() {
        // Shop type selection
        document.getElementById('shopType')?.addEventListener('change', () => {
            // Ready to generate
        });

        // Generate shop
        document.getElementById('generateShop')?.addEventListener('click', () => {
            this.generateShop();
        });

        // Save current shop
        document.getElementById('saveShop')?.addEventListener('click', () => {
            this.saveCurrentShop();
        });

        // Add custom item
        document.getElementById('addShopItem')?.addEventListener('click', () => {
            this.addCustomItem();
        });
    },

    generateShop() {
        const shopTypeSelect = document.getElementById('shopType');
        console.log('Shop type select element:', shopTypeSelect);
        console.log('Selected value:', shopTypeSelect?.value);
        console.log('Selected index:', shopTypeSelect?.selectedIndex);

        const typeKey = shopTypeSelect?.value || 'general';
        console.log('Using typeKey:', typeKey);

        const shopType = this.shopTypes[typeKey];
        console.log('Shop type data:', shopType);

        if (!shopType) {
            console.error('Shop type not found for key:', typeKey);
            return;
        }

        // Generate owner
        const ownerFirst = this.ownerFirstNames[Math.floor(Math.random() * this.ownerFirstNames.length)];
        const ownerLast = this.ownerLastNames[Math.floor(Math.random() * this.ownerLastNames.length)];

        // Generate shop name
        const shopNames = [
            `${ownerFirst}'s ${shopType.name}`,
            `The ${this.randomAdjective()} ${this.randomNoun(typeKey)}`,
            `${ownerLast}'s ${shopType.name}`,
            `The ${ownerLast} ${shopType.name}`
        ];
        const shopName = shopNames[Math.floor(Math.random() * shopNames.length)];

        // Generate inventory (15-25 items)
        const itemCount = 15 + Math.floor(Math.random() * 11);
        const availableItems = [...shopType.items];
        const inventory = [];

        for (let i = 0; i < itemCount && availableItems.length > 0; i++) {
            const idx = Math.floor(Math.random() * availableItems.length);
            const item = availableItems.splice(idx, 1)[0];

            // Random quantity
            const qty = item.rarity === 'common' ? 1 + Math.floor(Math.random() * 5) :
                item.rarity === 'uncommon' ? 1 + Math.floor(Math.random() * 3) :
                    1;

            // Slight price variation (-10% to +10%)
            const priceVariation = 0.9 + Math.random() * 0.2;
            const price = Math.round(item.price * priceVariation * 100) / 100;

            inventory.push({
                name: item.name,
                price: price,
                quantity: qty,
                rarity: item.rarity
            });
        }

        this.currentShop = {
            id: Date.now().toString(),
            name: shopName,
            type: typeKey,
            typeName: shopType.name,
            icon: shopType.icon,
            owner: `${ownerFirst} ${ownerLast}`,
            inventory: inventory
        };

        this.displayShop(this.currentShop);
        showToast('Shop generated!', 'success');
    },

    randomAdjective() {
        const adj = ['Golden', 'Silver', 'Rusty', 'Shining', 'Hidden', 'Lucky', 'Wandering', 'Enchanted', 'Dusty', 'Crimson', 'Azure', 'Emerald'];
        return adj[Math.floor(Math.random() * adj.length)];
    },

    randomNoun(type) {
        const nouns = {
            blacksmith: ['Anvil', 'Hammer', 'Forge', 'Blade', 'Shield'],
            magic: ['Wand', 'Scroll', 'Crystal', 'Tome', 'Orb'],
            potion: ['Cauldron', 'Vial', 'Flask', 'Elixir', 'Brew'],
            general: ['Barrel', 'Crate', 'Lantern', 'Cart', 'Chest'],
            tavern: ['Mug', 'Barrel', 'Hearth', 'Tankard', 'Fireplace'],
            temple: ['Candle', 'Altar', 'Blessing', 'Sanctuary', 'Chapel']
        };
        const list = nouns[type] || nouns.general;
        return list[Math.floor(Math.random() * list.length)];
    },

    displayShop(shop) {
        const container = document.getElementById('shopDisplay');
        if (!container) return;

        const totalValue = shop.inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        container.innerHTML = `
            <div class="shop-card">
                <div class="shop-header">
                    <div class="shop-title">
                        <span class="shop-icon">${shop.icon}</span>
                        <div>
                            <h3 class="shop-name">${shop.name}</h3>
                            <span class="shop-type">${shop.typeName}</span>
                        </div>
                    </div>
                    <div class="shop-actions">
                        <button class="btn btn-primary" id="saveShop">
                            <span>💾</span> Save
                        </button>
                        <button class="btn btn-secondary" id="addShopItem">
                            <span>➕</span> Add Item
                        </button>
                    </div>
                </div>
                <div class="shop-owner">
                    <span>👤 Owner:</span> <strong>${shop.owner}</strong>
                </div>
                <div class="shop-inventory">
                    <div class="inventory-header">
                        <span>Item</span>
                        <span>Price</span>
                        <span>Qty</span>
                        <span></span>
                    </div>
                    ${shop.inventory.map((item, idx) => `
                        <div class="inventory-item rarity-${item.rarity}" data-idx="${idx}">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price">${this.formatPrice(item.price)} gp</span>
                            <span class="item-qty">${item.quantity}</span>
                            <button class="icon-btn delete" onclick="ShopGenerator.removeItem(${idx})" title="Remove">✕</button>
                        </div>
                    `).join('')}
                </div>
                <div class="shop-footer">
                    <span>Total Inventory Value: <strong>${this.formatPrice(totalValue)} gp</strong></span>
                    <span>${shop.inventory.length} items</span>
                </div>
            </div>
        `;

        // Rebind buttons
        document.getElementById('saveShop')?.addEventListener('click', () => this.saveCurrentShop());
        document.getElementById('addShopItem')?.addEventListener('click', () => this.addCustomItem());
    },

    formatPrice(price) {
        if (price < 1) {
            return Math.round(price * 100) + ' cp';
        }
        return Math.round(price * 10) / 10;
    },

    removeItem(idx) {
        if (!this.currentShop) return;
        this.currentShop.inventory.splice(idx, 1);
        this.displayShop(this.currentShop);
    },

    addCustomItem() {
        if (!this.currentShop) {
            showToast('Generate a shop first', 'warning');
            return;
        }

        const modalHtml = `
            <div id="addItemModal" class="modal active">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add Item</h3>
                        <button class="modal-close" onclick="document.getElementById('addItemModal').remove()">&times;</button>
                    </div>
                    <form id="addItemForm" class="modal-form">
                        <div class="form-group">
                            <label for="itemName">Item Name</label>
                            <input type="text" id="itemName" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="itemPrice">Price (gp)</label>
                                <input type="number" id="itemPrice" value="10" min="0" step="0.01">
                            </div>
                            <div class="form-group">
                                <label for="itemQty">Quantity</label>
                                <input type="number" id="itemQty" value="1" min="1">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="itemRarity">Rarity</label>
                            <select id="itemRarity">
                                <option value="common">Common</option>
                                <option value="uncommon">Uncommon</option>
                                <option value="rare">Rare</option>
                                <option value="very rare">Very Rare</option>
                                <option value="legendary">Legendary</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="document.getElementById('addItemModal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('addItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.currentShop.inventory.push({
                name: document.getElementById('itemName').value,
                price: parseFloat(document.getElementById('itemPrice').value) || 0,
                quantity: parseInt(document.getElementById('itemQty').value) || 1,
                rarity: document.getElementById('itemRarity').value
            });
            document.getElementById('addItemModal').remove();
            this.displayShop(this.currentShop);
            showToast('Item added!', 'success');
        });
    },

    saveCurrentShop() {
        if (!this.currentShop) {
            showToast('No shop to save', 'warning');
            return;
        }

        // Check if already exists
        const existingIdx = this.savedShops.findIndex(s => s.id === this.currentShop.id);
        if (existingIdx >= 0) {
            this.savedShops[existingIdx] = this.currentShop;
        } else {
            this.savedShops.unshift(this.currentShop);
        }

        this.saveToDisk();
        this.renderSavedList();
        showToast(`Shop "${this.currentShop.name}" saved!`, 'success');
    },

    loadShop(id) {
        const shop = this.savedShops.find(s => s.id === id);
        if (shop) {
            this.currentShop = JSON.parse(JSON.stringify(shop)); // Deep copy
            this.displayShop(this.currentShop);
            showToast(`Loaded "${shop.name}"`, 'success');
        }
    },

    deleteShop(id) {
        this.savedShops = this.savedShops.filter(s => s.id !== id);
        this.saveToDisk();
        this.renderSavedList();
        showToast('Shop deleted', 'info');
    },

    renderSavedList() {
        const container = document.getElementById('savedShopList');
        if (!container) return;

        if (this.savedShops.length === 0) {
            container.innerHTML = `
                <div class="empty-state small">
                    <p>No saved shops</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.savedShops.map(shop => `
            <div class="saved-shop-item" data-id="${shop.id}">
                <div class="saved-shop-info" onclick="ShopGenerator.loadShop('${shop.id}')">
                    <span class="saved-shop-icon">${shop.icon}</span>
                    <div>
                        <span class="saved-shop-name">${shop.name}</span>
                        <span class="saved-shop-type">${shop.typeName}</span>
                    </div>
                </div>
                <div class="saved-shop-actions">
                    <button class="icon-btn" onclick="ShopGenerator.loadShop('${shop.id}')" title="Load">📂</button>
                    <button class="icon-btn delete" onclick="ShopGenerator.deleteShop('${shop.id}')" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ShopGenerator.init();
});
