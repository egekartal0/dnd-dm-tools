// Main App Module - Navigation and Initialization

const App = {
    init() {
        this.bindNavigation();
        this.bindExportImport();
        this.initModules();
        this.registerServiceWorker();
    },

    bindNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                this.navigateTo(page);
            });
        });
    },

    navigateTo(page) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Update pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');
    },

    bindExportImport() {
        document.getElementById('exportBtn').addEventListener('click', () => {
            Storage.exportData();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });

        document.getElementById('importFile').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                await Storage.importData(file);
                // Reload all modules
                location.reload();
            }
            e.target.value = '';
        });
    },

    initModules() {
        Combat.init();
        Rules.init();
        Encounters.init();
        Notes.init();
        Generators.init();
        DMScreen.init();
    },

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(err => console.log('Service Worker not registered:', err));
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
