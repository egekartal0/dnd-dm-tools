// Map Maker Module - Dungeon/City Generator & Manual Editor
const MapMaker = {
    canvas: null,
    ctx: null,
    gridSize: 20,
    tileSize: 25,
    map: [],
    currentTool: 'floor',
    isDrawing: false,
    savedMaps: [],

    tiles: {
        empty: { color: '#1a1a2e', symbol: '' },
        floor: { color: '#4a4a5e', symbol: '' },
        wall: { color: '#2d2d3e', symbol: '' },
        door: { color: '#8b4513', symbol: '🚪' },
        water: { color: '#1e90ff', symbol: '~' },
        grass: { color: '#228b22', symbol: '' },
        stone: { color: '#696969', symbol: '' },
        wood: { color: '#8b4513', symbol: '' },
        stairs_up: { color: '#4a4a5e', symbol: '△' },
        stairs_down: { color: '#4a4a5e', symbol: '▽' },
        trap: { color: '#8b0000', symbol: '⚠' },
        chest: { color: '#ffd700', symbol: '📦' },
        bed: { color: '#deb887', symbol: '🛏' },
        table: { color: '#8b4513', symbol: '▪' },
        chair: { color: '#a0522d', symbol: '·' },
        fountain: { color: '#00ced1', symbol: '⛲' },
        tree: { color: '#228b22', symbol: '🌲' },
        house: { color: '#cd853f', symbol: '🏠' },
        shop: { color: '#daa520', symbol: '🏪' },
        temple: { color: '#9370db', symbol: '⛪' },
        tavern: { color: '#d2691e', symbol: '🍺' },
        road: { color: '#a9a9a9', symbol: '' },
        bridge: { color: '#8b4513', symbol: '═' }
    },

    init() {
        this.loadSavedMaps();
        this.setupCanvas();
        this.bindEvents();
        this.initMap();
        this.render();
    },

    loadSavedMaps() {
        const saved = localStorage.getItem('dnd-maps');
        this.savedMaps = saved ? JSON.parse(saved) : [];
        this.renderSavedList();
    },

    saveToDisk() {
        localStorage.setItem('dnd-maps', JSON.stringify(this.savedMaps));
    },

    setupCanvas() {
        this.canvas = document.getElementById('mapCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    },

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = this.gridSize * this.tileSize;
        this.canvas.height = this.gridSize * this.tileSize;
    },

    initMap() {
        this.map = [];
        for (let y = 0; y < this.gridSize; y++) {
            this.map[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                this.map[y][x] = 'empty';
            }
        }
    },

    bindEvents() {
        // Canvas drawing events
        this.canvas?.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            this.draw(e);
        });

        this.canvas?.addEventListener('mousemove', (e) => {
            if (this.isDrawing) this.draw(e);
        });

        this.canvas?.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });

        this.canvas?.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });

        // Tool selection
        document.querySelectorAll('.tile-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.tile-btn.active')?.classList.remove('active');
                btn.classList.add('active');
                this.currentTool = btn.dataset.tile;
            });
        });

        // Grid size
        document.getElementById('mapGridSize')?.addEventListener('change', (e) => {
            this.gridSize = parseInt(e.target.value);
            this.resizeCanvas();
            this.initMap();
            this.render();
        });

        // Random generators
        document.getElementById('generateDungeon')?.addEventListener('click', () => {
            this.generateDungeon();
        });

        document.getElementById('generateCity')?.addEventListener('click', () => {
            this.generateCity();
        });

        // Clear
        document.getElementById('clearMap')?.addEventListener('click', () => {
            this.initMap();
            this.render();
        });

        // Save
        document.getElementById('saveMap')?.addEventListener('click', () => {
            this.saveCurrentMap();
        });

        // Export as image
        document.getElementById('exportMapImage')?.addEventListener('click', () => {
            this.exportAsImage();
        });
    },

    draw(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.tileSize);
        const y = Math.floor((e.clientY - rect.top) / this.tileSize);

        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            this.map[y][x] = this.currentTool;
            this.render();
        }
    },

    render() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const tile = this.tiles[this.map[y][x]] || this.tiles.empty;
                const px = x * this.tileSize;
                const py = y * this.tileSize;

                // Draw tile background
                this.ctx.fillStyle = tile.color;
                this.ctx.fillRect(px, py, this.tileSize, this.tileSize);

                // Draw grid lines
                this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                this.ctx.strokeRect(px, py, this.tileSize, this.tileSize);

                // Draw symbol if any
                if (tile.symbol) {
                    this.ctx.fillStyle = '#fff';
                    this.ctx.font = `${this.tileSize * 0.6}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(tile.symbol, px + this.tileSize / 2, py + this.tileSize / 2);
                }
            }
        }
    },

    // ========== DUNGEON GENERATOR ==========
    generateDungeon() {
        this.initMap();
        const rooms = [];
        // More rooms based on grid size
        const numRooms = Math.floor(this.gridSize * this.gridSize / 40) + 4;
        const maxAttempts = numRooms * 10;

        // Generate rooms
        for (let i = 0; i < maxAttempts; i++) {
            if (rooms.length >= numRooms) break;

            const w = this.randInt(3, 6);
            const h = this.randInt(3, 6);
            const x = this.randInt(1, this.gridSize - w - 1);
            const y = this.randInt(1, this.gridSize - h - 1);

            const room = { x, y, w, h, cx: Math.floor(x + w / 2), cy: Math.floor(y + h / 2) };

            // Check for overlap
            let overlaps = false;
            for (const other of rooms) {
                if (this.roomsOverlap(room, other)) {
                    overlaps = true;
                    break;
                }
            }

            if (!overlaps) {
                rooms.push(room);
                this.carveRoom(room);
            }
        }

        // Connect rooms with corridors
        for (let i = 1; i < rooms.length; i++) {
            this.carveCorridor(rooms[i - 1], rooms[i]);
        }

        // Add doors at corridor entrances
        this.addDoors();

        // Add details
        this.addDungeonDetails(rooms);

        // Surround with walls
        this.addWalls();

        this.render();
        showToast('Dungeon generated!', 'success');
    },

    roomsOverlap(a, b) {
        return !(a.x + a.w + 1 < b.x || b.x + b.w + 1 < a.x ||
            a.y + a.h + 1 < b.y || b.y + b.h + 1 < a.y);
    },

    carveRoom(room) {
        for (let y = room.y; y < room.y + room.h; y++) {
            for (let x = room.x; x < room.x + room.w; x++) {
                if (y >= 0 && y < this.gridSize && x >= 0 && x < this.gridSize) {
                    this.map[y][x] = 'floor';
                }
            }
        }
    },

    carveCorridor(from, to) {
        let x = from.cx;
        let y = from.cy;

        // Horizontal first, then vertical (or vice versa randomly)
        if (Math.random() < 0.5) {
            while (x !== to.cx) {
                if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                    this.map[y][x] = 'floor';
                }
                x += x < to.cx ? 1 : -1;
            }
            while (y !== to.cy) {
                if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                    this.map[y][x] = 'floor';
                }
                y += y < to.cy ? 1 : -1;
            }
        } else {
            while (y !== to.cy) {
                if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                    this.map[y][x] = 'floor';
                }
                y += y < to.cy ? 1 : -1;
            }
            while (x !== to.cx) {
                if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                    this.map[y][x] = 'floor';
                }
                x += x < to.cx ? 1 : -1;
            }
        }
    },

    addDoors() {
        let doorCount = 0;
        const maxDoors = Math.max(2, Math.floor(this.gridSize / 8)); // Max 2-4 doors based on size

        // Collect potential door locations
        const potentialDoors = [];

        for (let y = 1; y < this.gridSize - 1; y++) {
            for (let x = 1; x < this.gridSize - 1; x++) {
                if (this.map[y][x] === 'floor') {
                    // Check if this is a narrow corridor passage (chokepoint)
                    const hasWallsNS = this.map[y - 1][x] === 'empty' && this.map[y + 1][x] === 'empty';
                    const hasWallsEW = this.map[y][x - 1] === 'empty' && this.map[y][x + 1] === 'empty';
                    const hasFloorNS = this.map[y - 1][x] === 'floor' && this.map[y + 1][x] === 'floor';
                    const hasFloorEW = this.map[y][x - 1] === 'floor' && this.map[y][x + 1] === 'floor';

                    if ((hasWallsNS && hasFloorEW) || (hasWallsEW && hasFloorNS)) {
                        potentialDoors.push({ x, y });
                    }
                }
            }
        }

        // Shuffle and pick only a few doors
        potentialDoors.sort(() => Math.random() - 0.5);
        for (const pos of potentialDoors) {
            if (doorCount >= maxDoors) break;
            this.map[pos.y][pos.x] = 'door';
            doorCount++;
        }
    },

    addDungeonDetails(rooms) {
        // Add stairs in first and last room
        if (rooms.length > 0) {
            const first = rooms[0];
            this.map[first.cy][first.cx] = 'stairs_up';
        }
        if (rooms.length > 1) {
            const last = rooms[rooms.length - 1];
            this.map[last.cy][last.cx] = 'stairs_down';
        }

        // Add random details
        for (const room of rooms) {
            if (Math.random() < 0.3) {
                // Add chest
                const cx = room.x + this.randInt(0, room.w - 1);
                const cy = room.y + this.randInt(0, room.h - 1);
                if (this.map[cy][cx] === 'floor') {
                    this.map[cy][cx] = 'chest';
                }
            }
            if (Math.random() < 0.2) {
                // Add trap
                const tx = room.x + this.randInt(0, room.w - 1);
                const ty = room.y + this.randInt(0, room.h - 1);
                if (this.map[ty][tx] === 'floor') {
                    this.map[ty][tx] = 'trap';
                }
            }
        }
    },

    addWalls() {
        const newMap = JSON.parse(JSON.stringify(this.map));
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.map[y][x] === 'empty') {
                    // Check if adjacent to floor
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const ny = y + dy;
                            const nx = x + dx;
                            if (ny >= 0 && ny < this.gridSize && nx >= 0 && nx < this.gridSize) {
                                if (this.map[ny][nx] === 'floor' || this.map[ny][nx] === 'door') {
                                    newMap[y][x] = 'wall';
                                }
                            }
                        }
                    }
                }
            }
        }
        this.map = newMap;
    },

    // ========== CITY GENERATOR ==========
    generateCity() {
        this.initMap();

        // Fill with grass
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                this.map[y][x] = 'grass';
            }
        }

        // Create main roads
        const midX = Math.floor(this.gridSize / 2);
        const midY = Math.floor(this.gridSize / 2);

        // Main horizontal road
        for (let x = 0; x < this.gridSize; x++) {
            this.map[midY][x] = 'road';
            if (midY > 0) this.map[midY - 1][x] = 'road';
        }

        // Main vertical road
        for (let y = 0; y < this.gridSize; y++) {
            this.map[y][midX] = 'road';
            if (midX > 0) this.map[y][midX - 1] = 'road';
        }

        // Add secondary roads
        const roadPos = [Math.floor(this.gridSize / 4), Math.floor(3 * this.gridSize / 4)];
        for (const pos of roadPos) {
            if (pos < this.gridSize) {
                for (let x = 0; x < this.gridSize; x++) {
                    if (this.map[pos][x] !== 'road') this.map[pos][x] = 'road';
                }
                for (let y = 0; y < this.gridSize; y++) {
                    if (this.map[y][pos] !== 'road') this.map[y][pos] = 'road';
                }
            }
        }

        // Place buildings
        const buildings = ['house', 'house', 'house', 'house', 'shop', 'tavern', 'temple'];

        for (let y = 1; y < this.gridSize - 1; y++) {
            for (let x = 1; x < this.gridSize - 1; x++) {
                if (this.map[y][x] === 'grass') {
                    // Check if near road
                    const nearRoad = this.isNearRoad(x, y);
                    if (nearRoad && Math.random() < 0.4) {
                        this.map[y][x] = buildings[this.randInt(0, buildings.length - 1)];
                    }
                }
            }
        }

        // Add central fountain at crossroads
        this.map[midY][midX] = 'fountain';

        // Add water (river or pond)
        if (Math.random() < 0.5) {
            const riverX = this.gridSize - 3;
            for (let y = 0; y < this.gridSize; y++) {
                this.map[y][riverX] = 'water';
                this.map[y][riverX + 1] = 'water';
            }
            // Add bridge
            this.map[midY][riverX] = 'bridge';
            this.map[midY][riverX + 1] = 'bridge';
        }

        // Add some trees
        for (let i = 0; i < this.gridSize; i++) {
            const tx = this.randInt(0, this.gridSize - 1);
            const ty = this.randInt(0, this.gridSize - 1);
            if (this.map[ty][tx] === 'grass') {
                this.map[ty][tx] = 'tree';
            }
        }

        this.render();
        showToast('City generated!', 'success');
    },

    isNearRoad(x, y) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const ny = y + dy;
                const nx = x + dx;
                if (ny >= 0 && ny < this.gridSize && nx >= 0 && nx < this.gridSize) {
                    if (this.map[ny][nx] === 'road') {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    // ========== SAVE/LOAD ==========
    saveCurrentMap() {
        const name = prompt('Enter a name for this map:', 'My Map');
        if (!name) return;

        const mapData = {
            id: Date.now().toString(),
            name: name,
            gridSize: this.gridSize,
            map: this.map,
            created: new Date().toISOString()
        };

        this.savedMaps.unshift(mapData);
        this.saveToDisk();
        this.renderSavedList();
        showToast(`Map "${name}" saved!`, 'success');
    },

    loadMap(id) {
        const mapData = this.savedMaps.find(m => m.id === id);
        if (!mapData) return;

        this.gridSize = mapData.gridSize;
        document.getElementById('mapGridSize').value = this.gridSize;
        this.resizeCanvas();
        this.map = mapData.map;
        this.render();
        showToast(`Map "${mapData.name}" loaded!`, 'success');
    },

    deleteMap(id) {
        this.savedMaps = this.savedMaps.filter(m => m.id !== id);
        this.saveToDisk();
        this.renderSavedList();
        showToast('Map deleted', 'info');
    },

    renderSavedList() {
        const container = document.getElementById('savedMapList');
        if (!container) return;

        if (this.savedMaps.length === 0) {
            container.innerHTML = `
                <div class="empty-state small">
                    <p>No saved maps</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.savedMaps.map(m => `
            <div class="saved-map-item">
                <span class="saved-map-name" onclick="MapMaker.loadMap('${m.id}')">${m.name}</span>
                <div class="saved-map-actions">
                    <button class="icon-btn" onclick="MapMaker.loadMap('${m.id}')" title="Load">📂</button>
                    <button class="icon-btn delete" onclick="MapMaker.deleteMap('${m.id}')" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    },

    exportAsImage() {
        const link = document.createElement('a');
        link.download = 'dnd-map.png';
        link.href = this.canvas.toDataURL();
        link.click();
        showToast('Map exported as image!', 'success');
    },

    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    MapMaker.init();
});
