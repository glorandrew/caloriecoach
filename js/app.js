// ====== localStorage Migration ======
(function() {
    var oldPrefix = 'fitpulse-';
    var newPrefix = 'caloriecoach-';
    var migrated = localStorage.getItem(newPrefix + 'migrated');
    if (migrated) return;
    var keys = [
        'history', 'theme', 'food-prefs', 'macro-split', 'water',
        'weight-logs', 'shopping-checks', 'custom-foods', 'api-cache',
        'meal-schedule', 'exercise', 'intake-logs', 'last-target',
        'food-db-cache', 'food-db-ts'
    ];
    for (var i = 0; i < keys.length; i++) {
        var oldVal = localStorage.getItem(oldPrefix + keys[i]);
        if (oldVal !== null) {
            localStorage.setItem(newPrefix + keys[i], oldVal);
            localStorage.removeItem(oldPrefix + keys[i]);
        }
    }
    localStorage.setItem(newPrefix + 'migrated', '1');
})();

// ====== Focus Trap & A11y Utilities ======
let lastFocusedEl = null;
const activeModalIds = [];

function getFocusableElements(container) {
    if (typeof container === 'string') container = document.getElementById(container);
    if (!container) return [];
    return Array.from(container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null);
}

function openModal(id, options = {}) {
    const overlay = document.getElementById(`${id}-overlay`);
    const modal = document.getElementById(id);
    if (!overlay || !modal) return;

    lastFocusedEl = document.activeElement;
    activeModalIds.push(id);

    overlay.classList.add('show');
    modal.classList.add('show');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    if (options.label) modal.setAttribute('aria-label', options.label);
    document.body.style.overflow = 'hidden';

    const focusable = getFocusableElements(modal);
    if (focusable.length > 0) {
        setTimeout(() => focusable[0].focus(), 50);
    }

    modal.addEventListener('keydown', function handleModalKeydown(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal(id);
            return;
        }
        if (e.key !== 'Tab') return;

        const els = getFocusableElements(modal);
        if (els.length === 0) return;

        const first = els[0], last = els[els.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
}

function closeModal(id) {
    const overlay = document.getElementById(`${id}-overlay`);
    const modal = document.getElementById(id);
    if (!overlay || !modal) return;

    overlay.classList.remove('show');
    modal.classList.remove('show');
    document.body.style.overflow = '';

    const idx = activeModalIds.indexOf(id);
    if (idx > -1) activeModalIds.splice(idx, 1);

    if (lastFocusedEl && lastFocusedEl.focus) {
        setTimeout(() => lastFocusedEl.focus(), 50);
    }
}

// ====== Theme toggle ======
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('caloriecoach-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', `Toggle ${savedTheme === 'dark' ? 'light' : 'dark'} theme`);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('caloriecoach-theme', next);
        themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
        themeToggle.setAttribute('aria-label', `Toggle ${next === 'dark' ? 'light' : 'dark'} theme`);
    });
})();

// ====== Scroll spy for nav links ======
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a, .mobile-nav a');

    const scrollSpyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksAll.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => scrollSpyObserver.observe(section));
})();

// ====== Mobile hamburger menu ======
(function() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');

    function toggleMobileNav() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileNav);
        hamburger.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileNav();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMobileNav);
    }

    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMobileNav);
        });
    }
})();

// ====== Event Binding Init ======
document.addEventListener('DOMContentLoaded', () => {
    const $ = id => document.getElementById(id);
    const bind = (id, event, handler) => {
        const el = $(id);
        if (el) el.addEventListener(event, handler);
    };

    // Calculator form
    bind('calculate-btn', 'click', UI.calculate);
    bind('weight-unit', 'click', UI.toggleWeightUnit);
    bind('height-unit', 'click', UI.toggleHeightUnit);
    bind('diet-plan-default', 'click', e => UI.selectDietPlan('default', e));
    bind('diet-plan-custom', 'click', e => UI.selectDietPlan('custom', e));
    bind('diet-plan-weekly', 'click', e => UI.selectDietPlan('weekly', e));

    // Macro split
    bind('macro-split-toggle', 'click', UI.toggleMacroSplit);
    bind('macro-split-apply', 'click', UI.normalizeMacroSplit);
    ['protein-pct', 'carbs-pct', 'fat-pct'].forEach(id => {
        const el = $(id);
        if (el) el.addEventListener('input', UI.normalizeMacroSplit);
    });

    // Schedule editor
    bind('schedule-toggle', 'click', UI.toggleScheduleEditor);

    // Food panel
    bind('food-category-all', 'click', () => UI.filterByCategory('all'));
    bind('food-category-protein', 'click', () => UI.filterByCategory('protein'));
    bind('food-category-carbs', 'click', () => UI.filterByCategory('carbs'));
    bind('food-category-vegetables', 'click', () => UI.filterByCategory('vegetables'));
    bind('food-category-fruits', 'click', () => UI.filterByCategory('fruits'));
    bind('food-category-dairy', 'click', () => UI.filterByCategory('dairy'));
    bind('food-category-fats', 'click', () => UI.filterByCategory('fats'));
    bind('food-category-custom', 'click', () => UI.filterByCategory('custom'));
    bind('food-category-api', 'click', () => UI.filterByCategory('api'));

    const searchInput = $('food-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            UI.filterFoods();
        });
    }

    // Custom food
    bind('add-custom-food-btn', 'click', UI.showAddFoodForm);
    bind('cancel-custom-food', 'click', UI.hideAddFoodForm);
    bind('save-custom-food', 'click', UI.saveCustomFood);
    bind('apply-custom-diet-btn', 'click', UI.applyCustomDiet);

    // Preference modal
    bind('confirm-preferences', 'click', UI.confirmFoodPreferences);
    bind('skip-preferences', 'click', UI.skipFoodPreferences);

    // Water tracker
    bind('water-add-100', 'click', () => UI.addWater(100));
    bind('water-add-200', 'click', () => UI.addWater(200));
    bind('water-add-330', 'click', () => UI.addWater(330));
    bind('water-add-500', 'click', () => UI.addWater(500));
    bind('water-reset', 'click', UI.resetWaterTracker);

    // Exercise log
    bind('exercise-toggle', 'click', UI.toggleExerciseLog);
    bind('exercise-log-btn', 'click', UI.logExercise);

    // Weight log
    bind('log-weight-btn', 'click', UI.logWeight);

    // Export bar
    bind('export-pdf-btn', 'click', UI.exportPDF);
    bind('copy-summary-btn', 'click', UI.copySummary);
    bind('shopping-list-btn', 'click', UI.showShoppingList);
    bind('micros-btn', 'click', UI.toggleMicros);
    bind('backup-btn', 'click', UI.exportBackup);

    // Import backup
    const importInput = $('import-file-input');
    if (importInput) {
        importInput.addEventListener('change', UI.importBackup);
    }
    const restoreBtn = $('restore-btn');
    if (restoreBtn && importInput) {
        restoreBtn.addEventListener('click', () => importInput.click());
    }

    // Modal close buttons
    bind('close-pref-btn', 'click', UI.closeFoodPreferences);
    bind('close-shopping-btn', 'click', UI.closeShoppingList);
    bind('close-shopping-footer-btn', 'click', UI.closeShoppingList);
    bind('close-qty-btn', 'click', UI.closeFoodQuantityModal);
    bind('cancel-qty-btn', 'click', UI.closeFoodQuantityModal);
    bind('confirm-qty-btn', 'click', UI.confirmFoodQuantity);
    bind('close-recipe-btn', 'click', UI.closeRecipeModal);
    bind('close-recipe-footer-btn', 'click', UI.closeRecipeModal);

    // Overlay clicks to close
    const overlays = ['pref-modal-overlay', 'shopping-modal-overlay', 'quantity-modal-overlay', 'recipe-modal-overlay'];
    overlays.forEach(overlayId => {
        const el = $(overlayId);
        if (el) {
            el.addEventListener('click', () => {
                const modalId = overlayId.replace('-overlay', '');
                if (modalId === 'pref-modal') UI.closeFoodPreferences();
                else if (modalId === 'shopping-modal') UI.closeShoppingList();
                else if (modalId === 'recipe-modal') UI.closeRecipeModal();
                else if (modalId === 'quantity-modal') UI.closeFoodQuantityModal();
            });
        }
    });

    // Quantity slider
    const qtySlider = $('quantity-slider');
    if (qtySlider) {
        qtySlider.addEventListener('input', UI.updateQuantityPreview);
    }

    // Shopping list modal
    bind('clear-shopping-checks', 'click', UI.clearShoppingChecks);
    bind('copy-shopping-list', 'click', UI.copyShoppingList);
    const scaleSlider = $('shopping-scale-slider');
    if (scaleSlider) {
        scaleSlider.addEventListener('input', UI.updateShoppingScale);
    }

    // Recipe modal
    bind('print-recipe-btn', 'click', UI.printRecipe);
    bind('skip-preferences', 'click', UI.skipFoodPreferences);
    bind('confirm-preferences', 'click', UI.confirmFoodPreferences);

    // Progress dashboard
    bind('progress-toggle', 'click', UI.toggleProgressDashboard);
    bind('log-intake-btn', 'click', UI.logIntake);
    bind('close-micros-btn', 'click', UI.toggleMicros);

    // Weekly plan day tabs
    for (let i = 0; i <= 6; i++) {
        bind(`day-tab-${i}`, 'click', () => UI.showWeekDay(i));
    }
    bind('regenerate-day-btn', 'click', UI.regenerateWeekDay);

    // Load remote food database
    if (typeof FoodDBLoader !== 'undefined' && FoodDBLoader.init) {
        FoodDBLoader.init(function(err) {
            if (!err && UI && UI.filterFoods) {
                UI.filterFoods();
            }
        });
    }

    // Initial renders
    if (UI.loadHistory) UI.loadHistory();
    if (UI.updateMealTabs) UI.updateMealTabs();
});
