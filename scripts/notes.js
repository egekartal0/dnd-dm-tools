// Session Notes Module

const Notes = {
    notes: [],

    init() {
        this.loadState();
        this.bindEvents();
        this.render();
    },

    loadState() {
        this.notes = Storage.get(Storage.KEYS.NOTES, []);
    },

    saveState() {
        Storage.set(Storage.KEYS.NOTES, this.notes);
    },

    bindEvents() {
        // Add note button
        document.getElementById('addNote').addEventListener('click', () => this.openModal());

        // Search
        document.getElementById('notesSearch').addEventListener('input', (e) => {
            this.filterNotes(e.target.value);
        });

        // Category filters
        document.querySelectorAll('.note-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.note-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterByCategory(btn.dataset.category);
            });
        });

        // Modal events
        const modal = document.getElementById('noteModal');
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        modal.querySelector('.modal-cancel').addEventListener('click', () => this.closeModal());

        document.getElementById('noteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNote();
        });

        document.getElementById('deleteNote').addEventListener('click', () => this.deleteNote());

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
    },

    openModal(noteId = null) {
        const modal = document.getElementById('noteModal');
        const form = document.getElementById('noteForm');
        const deleteBtn = document.getElementById('deleteNote');
        const title = document.getElementById('noteModalTitle');

        if (noteId) {
            const note = this.notes.find(n => n.id === noteId);
            if (note) {
                title.textContent = 'Edit Note';
                document.getElementById('noteId').value = note.id;
                document.getElementById('noteTitle').value = note.title;
                document.getElementById('noteCategory').value = note.category;
                document.getElementById('noteContent').value = note.content;
                deleteBtn.style.display = 'inline-flex';
            }
        } else {
            title.textContent = 'New Note';
            form.reset();
            document.getElementById('noteId').value = '';
            deleteBtn.style.display = 'none';
        }

        modal.classList.add('active');
        document.getElementById('noteTitle').focus();
    },

    closeModal() {
        document.getElementById('noteModal').classList.remove('active');
        document.getElementById('noteForm').reset();
    },

    saveNote() {
        const id = document.getElementById('noteId').value;
        const title = document.getElementById('noteTitle').value;
        const category = document.getElementById('noteCategory').value;
        const content = document.getElementById('noteContent').value;

        if (id) {
            // Update existing
            const note = this.notes.find(n => n.id === id);
            if (note) {
                note.title = title;
                note.category = category;
                note.content = content;
                note.updatedAt = new Date().toISOString();
            }
            showToast('Note updated', 'success');
        } else {
            // Create new
            this.notes.unshift({
                id: generateId(),
                title,
                category,
                content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            showToast('Note created', 'success');
        }

        this.saveState();
        this.render();
        this.closeModal();
    },

    deleteNote() {
        const id = document.getElementById('noteId').value;
        if (id && confirm('Delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== id);
            this.saveState();
            this.render();
            this.closeModal();
            showToast('Note deleted', 'warning');
        }
    },

    render() {
        const container = document.getElementById('notesContainer');

        if (this.notes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📝</span>
                    <p>No notes yet</p>
                    <p class="empty-hint">Click "New Note" to start documenting your campaign</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.notes.map(note => this.renderNoteCard(note)).join('');
        this.bindCardEvents();
    },

    renderNoteCard(note) {
        const date = new Date(note.updatedAt || note.createdAt);
        const dateStr = date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const preview = note.content.substring(0, 150) + (note.content.length > 150 ? '...' : '');

        return `
            <div class="note-card" data-id="${note.id}" data-category="${note.category}">
                <div class="note-card-header">
                    <div class="note-card-title">
                        <h4>${this.escapeHtml(note.title)}</h4>
                        <span class="note-date">${dateStr}</span>
                    </div>
                    <span class="note-category-badge ${note.category}">${note.category}</span>
                </div>
                <div class="note-card-content">
                    ${this.escapeHtml(preview)}
                </div>
            </div>
        `;
    },

    bindCardEvents() {
        document.querySelectorAll('.note-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openModal(card.dataset.id);
            });
        });
    },

    filterNotes(searchTerm) {
        const term = searchTerm.toLowerCase();
        document.querySelectorAll('.note-card').forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const content = card.querySelector('.note-card-content').textContent.toLowerCase();
            const matches = title.includes(term) || content.includes(term);
            card.style.display = matches ? 'block' : 'none';
        });
    },

    filterByCategory(category) {
        document.querySelectorAll('.note-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
