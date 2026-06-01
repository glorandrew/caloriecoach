// ====== UI Module - Extracted from app.js ======

// ====== Global State Variables ======
let weightUnit = 'kg';
let heightUnit = 'cm';
let mealCount = 5;
const mealConfigs = {
    3: { meals: ['breakfast', 'lunch', 'dinner'], labels: { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner' }, icons: { breakfast: '🌅', lunch: '☀️', dinner: '🌙' }, times: { breakfast: '8:00 AM', lunch: '1:00 PM', dinner: '7:30 PM' }, dist: { breakfast: 0.30, lunch: 0.40, dinner: 0.30 } },
    4: { meals: ['breakfast', 'lunch', 'afternoonSnack', 'dinner'], labels: { breakfast: 'Breakfast', lunch: 'Lunch', afternoonSnack: 'Afternoon Snack', dinner: 'Dinner' }, icons: { breakfast: '🌅', lunch: '☀️', afternoonSnack: '🍪', dinner: '🌙' }, times: { breakfast: '8:00 AM', lunch: '1:00 PM', afternoonSnack: '4:30 PM', dinner: '7:30 PM' }, dist: { breakfast: 0.25, lunch: 0.35, afternoonSnack: 0.15, dinner: 0.25 } },
    5: { meals: ['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner'], labels: { breakfast: 'Breakfast', morningSnack: 'Morning Snack', lunch: 'Lunch', afternoonSnack: 'Afternoon Snack', dinner: 'Dinner' }, icons: { breakfast: '🌅', morningSnack: '🥤', lunch: '☀️', afternoonSnack: '🍪', dinner: '🌙' }, times: { breakfast: '7:00 AM', morningSnack: '10:30 AM', lunch: '1:00 PM', afternoonSnack: '4:30 PM', dinner: '7:30 PM' }, dist: { breakfast: 0.25, morningSnack: 0.10, lunch: 0.30, afternoonSnack: 0.10, dinner: 0.25 } },
    6: { meals: ['breakfast', 'morningSnack', 'lunch', 'afternoonSnack', 'dinner', 'eveningSnack'], labels: { breakfast: 'Breakfast', morningSnack: 'Morning Snack', lunch: 'Lunch', afternoonSnack: 'Afternoon Snack', dinner: 'Dinner', eveningSnack: 'Evening Snack' }, icons: { breakfast: '🌅', morningSnack: '🥤', lunch: '☀️', afternoonSnack: '🍪', dinner: '🌙', eveningSnack: '🌃' }, times: { breakfast: '7:00 AM', morningSnack: '10:00 AM', lunch: '12:30 PM', afternoonSnack: '3:30 PM', dinner: '6:30 PM', eveningSnack: '9:00 PM' }, dist: { breakfast: 0.20, morningSnack: 0.10, lunch: 0.25, afternoonSnack: 0.10, dinner: 0.25, eveningSnack: 0.10 } }
};
let selectedFoodsByMeal = {};
let currentMealTab = 'breakfast';
let currentCategory = 'all';
let currentSearch = '';
let currentApiResults = [];
let globalTargetCalories = 0;
let globalGoal = '';
let globalDiet = '';
let weeklyMode = false;
let weeklyDietHtml = [];
let currentWeekDay = 0;
const weekDayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekDayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let userFoodPreferences = {};
let pendingFood = null;
let macroSplitOpen = false;
let exerciseLogOpen = false;
let currentTDEE = 0;
let scheduleEditorOpen = false;
let microsVisible = false;
const backupKeys = [
    'caloriecoach-history', 'caloriecoach-theme', 'caloriecoach-food-prefs',
    'caloriecoach-macro-split', 'caloriecoach-water', 'caloriecoach-weight-logs',
    'caloriecoach-shopping-checks', 'caloriecoach-custom-foods',
    'caloriecoach-meal-schedule', 'caloriecoach-exercise', 'caloriecoach-intake-logs'
];

function initSelectedFoods(count) {
    const cfg = getMealConfig(count);
    selectedFoodsByMeal = {};
    cfg.meals.forEach(m => { selectedFoodsByMeal[m] = []; });
    currentMealTab = cfg.meals[0];
}

// ====== Unit Toggles ======
function toggleWeightUnit() {
    const input = document.getElementById('weight');
    const label = document.getElementById('weight-unit');
    const val = parseFloat(input.value);

    if (isNaN(val)) {
        weightUnit = weightUnit === 'kg' ? 'lbs' : 'kg';
        label.textContent = weightUnit;
        return;
    }

    if (weightUnit === 'kg') {
        input.value = (val * 2.20462).toFixed(1);
        weightUnit = 'lbs';
        label.textContent = 'lbs';
    } else {
        input.value = (val / 2.20462).toFixed(1);
        weightUnit = 'kg';
        label.textContent = 'kg';
    }
}

function toggleHeightUnit() {
    const input = document.getElementById('height');
    const label = document.getElementById('height-unit');
    const val = parseFloat(input.value);

    if (isNaN(val)) {
        heightUnit = heightUnit === 'cm' ? 'in' : 'cm';
        label.textContent = heightUnit;
        return;
    }

    if (heightUnit === 'cm') {
        input.value = (val / 2.54).toFixed(1);
        heightUnit = 'in';
        label.textContent = 'in';
    } else {
        input.value = (val * 2.54).toFixed(1);
        heightUnit = 'cm';
        label.textContent = 'cm';
    }
}

function getWeightInKg() {
    const val = parseFloat(document.getElementById('weight').value);
    return weightUnit === 'lbs' ? val / 2.20462 : val;
}

function getHeightInCm() {
    const val = parseFloat(document.getElementById('height').value);
    return heightUnit === 'in' ? val * 2.54 : val;
}

// ====== Progress Tracking ======
function saveToHistory(result) {
    const history = JSON.parse(localStorage.getItem('caloriecoach-history') || '[]');
    history.unshift(result);
    if (history.length > 20) history.pop();
    localStorage.setItem('caloriecoach-history', JSON.stringify(history));
}

function loadHistory() {
    return JSON.parse(localStorage.getItem('caloriecoach-history') || '[]');
}

function renderHistory() {
    const history = loadHistory();
    const container = document.getElementById('history-list');
    if (!container) return;

    if (history.length === 0) {
        container.innerHTML = '<p class="history-empty">No calculations yet. Complete the calculator above to start tracking your progress.</p>';
        return;
    }

    container.innerHTML = history.map((h, i) => {
        const prev = history[i + 1];
        const trend = prev ? (h.bmr > prev.bmr ? '↑' : h.bmr < prev.bmr ? '↓' : '→') : '';
        const trendClass = prev ? (h.bmr > prev.bmr ? 'trend-up' : h.bmr < prev.bmr ? 'trend-down' : 'trend-same') : '';
        return `<div class="history-item">
            <div class="history-date">${new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            <div class="history-details">
            <span class="history-metric"><strong>BMR:</strong> ${h.bmr} kcal</span>
            <span class="history-metric"><strong>TDEE:</strong> ${h.tdee} kcal</span>
            <span class="history-metric"><strong>Target:</strong> ${h.target} kcal</span>
            <span class="history-metric"><strong>BMI:</strong> ${h.bmi}</span>
            <span class="history-metric"><strong>Goal:</strong> ${h.goal}</span>
            ${trend ? `<span class="history-trend ${trendClass}">${trend}</span>` : ''}
            </div>
            </div>`;
    }).join('');
}

// ====== Meal Schedule Editor ======
function getMealConfig(count) {
    const cfg = mealConfigs[count] || mealConfigs[5];
    const saved = loadMealSchedule();
    if (saved && saved.count === count) {
        const merged = { meals: cfg.meals.slice(), labels: {}, icons: {}, times: {}, dist: {} };
        cfg.meals.forEach(m => {
            merged.labels[m] = (saved.labels && saved.labels[m]) || cfg.labels[m];
            merged.times[m] = (saved.times && saved.times[m]) || cfg.times[m];
            merged.icons[m] = cfg.icons[m];
            merged.dist[m] = cfg.dist[m];
        });
        return merged;
    }
    return cfg;
}

function loadMealSchedule() {
    try { return JSON.parse(localStorage.getItem('caloriecoach-meal-schedule')); } catch (e) { return null; }
}

function saveMealSchedule(data) {
    localStorage.setItem('caloriecoach-meal-schedule', JSON.stringify(data));
}

function toggleScheduleEditor() {
    const panel = document.getElementById('schedule-panel');
    const arrow = document.getElementById('schedule-arrow');
    scheduleEditorOpen = !scheduleEditorOpen;
    panel.classList.toggle('show', scheduleEditorOpen);
    arrow.classList.toggle('open', scheduleEditorOpen);
    if (scheduleEditorOpen) renderScheduleEditor();
}

function renderScheduleEditor() {
    const grid = document.getElementById('schedule-editor-grid');
    if (!grid) return;
    const count = parseInt(document.getElementById('meal-count').value) || 5;
    const cfg = mealConfigs[count] || mealConfigs[5];
    let saved = loadMealSchedule();
    if (!saved || saved.count !== count) {
        saved = { count: count, labels: {}, times: {} };
        cfg.meals.forEach(m => {
            saved.labels[m] = cfg.labels[m];
            saved.times[m] = cfg.times[m];
        });
    }

    grid.innerHTML = cfg.meals.map(m => {
        return `<div class="schedule-editor-row">
            <span class="schedule-editor-icon">${cfg.icons[m]}</span>
            <div class="schedule-editor-fields">
            <label>Meal Name</label>
            <input type="text" class="form-control schedule-name-input" value="${saved.labels[m] || cfg.labels[m]}" data-meal="${m}" onchange="saveScheduleName('${m}',this.value)">
            </div>
            <div class="schedule-editor-fields">
            <label>Time</label>
            <input type="text" class="form-control schedule-time-input" value="${saved.times[m] || cfg.times[m]}" data-meal="${m}" onchange="saveScheduleTime('${m}',this.value)">
            </div>
            </div>`;
    }).join('');
}

function saveScheduleName(meal, value) {
    const count = parseInt(document.getElementById('meal-count').value) || 5;
    const saved = loadMealSchedule() || { count: count, labels: {}, times: {} };
    if (!saved.labels) saved.labels = {};
    saved.labels[meal] = value;
    saveMealSchedule(saved);
}

function saveScheduleTime(meal, value) {
    const count = parseInt(document.getElementById('meal-count').value) || 5;
    const saved = loadMealSchedule() || { count: count, labels: {}, times: {} };
    if (!saved.times) saved.times = {};
    saved.times[meal] = value;
    saveMealSchedule(saved);
}

// ====== Form Validation ======
function validateForm() {
    let isValid = true;

    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const weight = document.getElementById('weight');
    const height = document.getElementById('height');
    const activity = document.getElementById('activity');
    const goal = document.getElementById('goal');
    const gender = document.querySelector('input[name="gender"]:checked');

    document.querySelectorAll('.form-control').forEach(el => { el.classList.remove('error'); });
    document.querySelectorAll('.error-message').forEach(el => { el.classList.remove('show'); });

    if (!name.value || name.value.trim() === '') {
        name.classList.add('error');
        document.getElementById('name-error').classList.add('show');
        isValid = false;
    }

    if (!age.value || age.value < 15 || age.value > 100) {
        age.classList.add('error');
        document.getElementById('age-error').classList.add('show');
        isValid = false;
    }

    if (!gender) {
        document.getElementById('gender-error').classList.add('show');
        isValid = false;
    }

    if (!weight.value || weight.value < 30 || weight.value > 300) {
        weight.classList.add('error');
        document.getElementById('weight-error').classList.add('show');
        isValid = false;
    }

    const hMin = heightUnit === 'in' ? 36 : 100;
    const hMax = heightUnit === 'in' ? 96 : 250;
    if (!height.value || height.value < hMin || height.value > hMax) {
        height.classList.add('error');
        document.getElementById('height-error').classList.add('show');
        isValid = false;
    }

    if (!activity.value) {
        activity.classList.add('error');
        document.getElementById('activity-error').classList.add('show');
        isValid = false;
    }

    if (!goal.value) {
        goal.classList.add('error');
        document.getElementById('goal-error').classList.add('show');
        isValid = false;
    }

    const diet = document.querySelector('input[name="diet"]:checked');
    if (!diet) {
        document.getElementById('diet-error').classList.add('show');
        isValid = false;
    }

    return isValid;
}

// ====== Custom Food Management ======
function showAddFoodForm() {
    const form = document.getElementById('add-food-form');
    if (form) form.classList.add('show');
}

function hideAddFoodForm() {
    const form = document.getElementById('add-food-form');
    if (form) form.classList.remove('show');
    document.getElementById('custom-food-name').value = '';
    document.getElementById('custom-food-calories').value = '';
    document.getElementById('custom-food-protein').value = '';
    document.getElementById('custom-food-carbs').value = '';
    document.getElementById('custom-food-fat').value = '';
}

function saveCustomFood() {
    const name = document.getElementById('custom-food-name').value.trim();
    const calories = parseFloat(document.getElementById('custom-food-calories').value);
    const protein = parseFloat(document.getElementById('custom-food-protein').value) || 0;
    const carbs = parseFloat(document.getElementById('custom-food-carbs').value) || 0;
    const fat = parseFloat(document.getElementById('custom-food-fat').value) || 0;

    if (!name) { alert('Please enter a food name.'); return; }
    if (isNaN(calories) || calories <= 0) { alert('Please enter valid calories per 100g.'); return; }

    CustomFoodDB.add({
        name: name,
        calories: Math.round(calories),
        protein: protein,
        carbs: carbs,
        fat: fat,
        serving: '100g'
    });

    hideAddFoodForm();
    currentCategory = 'custom';
    document.querySelectorAll('.food-category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === 'custom') {
            btn.classList.add('active');
        }
    });
    renderFoodGrid();
}

function deleteCustomFood(id) {
    if (!id) return;
    const allCustom = CustomFoodDB.getAll();
    let found = null;
    for (let ci = 0; ci < allCustom.length; ci++) {
        if (allCustom[ci].id === id) { found = allCustom[ci]; break; }
    }
    const customName = found ? found.name : null;
    if (customName) {
        Object.keys(selectedFoodsByMeal).forEach(meal => {
            selectedFoodsByMeal[meal] = selectedFoodsByMeal[meal].filter(f => f.name !== customName);
        });
    }
    CustomFoodDB.remove(id);
    renderFoodGrid();
    renderSelectedFoods();
}

// ====== Food Quantity Modal ======
function openFoodQuantityModal(name, calPer100, protPer100, carbsPer100, fatPer100, serving, category) {
    const existing = selectedFoodsByMeal[currentMealTab].find(f => f.name === name);
    const defaultQty = existing ? existing.quantity : 100;

    pendingFood = {
        name: name,
        calPer100: calPer100,
        protPer100: protPer100,
        carbsPer100: carbsPer100,
        fatPer100: fatPer100,
        serving: serving,
        category: category
    };

    document.getElementById('quantity-food-name').textContent = name;
    const slider = document.getElementById('quantity-slider');
    slider.value = defaultQty;
    const initPct = ((defaultQty - 10) / (300 - 10)) * 100;
    slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${initPct}%, var(--border) ${initPct}%, var(--border) 100%)`;
    updateQuantityPreview();
    openModal('quantity-modal', { label: 'Set food quantity' });
}

function closeFoodQuantityModal() {
    closeModal('quantity-modal');
    pendingFood = null;
}

function updateQuantityPreview() {
    if (!pendingFood) return;
    const qty = parseInt(document.getElementById('quantity-slider').value) || 100;
    const factor = qty / 100;
    document.getElementById('quantity-grams-display').textContent = qty;
    document.getElementById('preview-calories').textContent = Math.round(pendingFood.calPer100 * factor);
    document.getElementById('preview-protein').textContent = `${(pendingFood.protPer100 * factor).toFixed(1)}g`;
    document.getElementById('preview-carbs').textContent = `${(pendingFood.carbsPer100 * factor).toFixed(1)}g`;
    document.getElementById('preview-fat').textContent = `${(pendingFood.fatPer100 * factor).toFixed(1)}g`;

    const slider = document.getElementById('quantity-slider');
    const pct = ((qty - 10) / (300 - 10)) * 100;
    slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--border) ${pct}%, var(--border) 100%)`;
}

function confirmFoodQuantity() {
    if (!pendingFood) return;
    const qty = parseInt(document.getElementById('quantity-slider').value) || 100;
    const factor = qty / 100;

    toggleFood(
        pendingFood.name,
        Math.round(pendingFood.calPer100 * factor),
        Math.round(pendingFood.protPer100 * factor * 10) / 10,
        Math.round(pendingFood.carbsPer100 * factor * 10) / 10,
        Math.round(pendingFood.fatPer100 * factor * 10) / 10,
        `${qty}g (${pendingFood.serving})`,
        pendingFood.category,
        qty
    );

    closeFoodQuantityModal();
}

// ====== Food Grid & Meal Tabs ======
function updateMealTabs() {
    const container = document.getElementById('meal-tabs');
    if (!container) return;
    const cfg = getMealConfig(mealCount);
    const validForCurrent = cfg.meals.indexOf(currentMealTab) > -1;
    if (!validForCurrent) currentMealTab = cfg.meals[0];
    container.innerHTML = cfg.meals.map(m => {
        const active = m === currentMealTab ? ' active' : '';
        return `<button class="meal-tab${active}" data-meal="${m}" role="tab" aria-selected="${m === currentMealTab}" onclick="selectMealTab('${m}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectMealTab('${m}')}">${cfg.icons[m] || '🍽️'} ${cfg.labels[m]}</button>`;
    }).join('');
    selectMealTab(currentMealTab);
}

function renderFoodGrid() {
    const grid = document.getElementById('food-grid');
    let foods = [];

    if (currentCategory === 'all' || currentCategory === 'custom') {
        const customFoods = CustomFoodDB.getAll();
        customFoods.forEach(f => {
            const existing = foods.some(ef => ef.id && ef.id === f.id);
            if (!existing) {
                foods.push({
                    id: f.id,
                    name: f.name,
                    calories: f.calories,
                    protein: f.protein,
                    carbs: f.carbs,
                    fat: f.fat,
                    serving: f.serving || 'custom',
                    category: 'custom',
                    source: 'custom'
                });
            }
        });
    }

    if (currentCategory === 'all') {
        Object.keys(foodDatabaseDetailed).forEach(cat => {
            foodDatabaseDetailed[cat].forEach(f => {
                foods.push(f);
            });
        });
    } else if (currentCategory !== 'custom' && currentCategory !== 'api') {
        const staticFoods = foodDatabaseDetailed[currentCategory] || [];
        staticFoods.forEach(f => {
            foods.push(f);
        });
    }

    const apiResults = window.currentApiResults || [];
    if (apiResults.length > 0 && (currentCategory === 'all' || currentCategory === 'api')) {
        apiResults.forEach(f => {
            const dup = foods.some(ef => ef.name === f.name);
            if (!dup) {
                foods.push(f);
            }
        });
    }

    if (currentSearch) {
        const q = currentSearch.toLowerCase();
        foods = foods.filter(f => f.name.toLowerCase().includes(q));
    }

    if (foods.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
            ${currentSearch ? `No foods found. Try a different search or <a href="#" onclick="showAddFoodForm();return false;" style="color:var(--accent);">add a custom food</a>.` : 'No foods available.'}
            </div>`;
        return;
    }

    grid.innerHTML = foods.map((food, index) => {
        const isSelected = selectedFoodsByMeal[currentMealTab].some(f => f.name === food.name);
        const selectedFood = selectedFoodsByMeal[currentMealTab].find(f => f.name === food.name);
        const nameAttr = (food.name || '').replace(/'/g, "\\'");
        const calPer100 = food.calories || 0;
        const protPer100 = food.protein || 0;
        const carbsPer100 = food.carbs || 0;
        const fatPer100 = food.fat || 0;
        const servingEscaped = (food.serving || '100g').replace(/'/g, "\\'");
        const catEscaped = (food.category || 'all').replace(/'/g, "\\'");
        return `<div class="food-item ${isSelected ? 'selected' : ''}" role="button" tabindex="0" onclick="openFoodQuantityModal('${nameAttr}',${calPer100},${protPer100},${carbsPer100},${fatPer100},'${servingEscaped}','${catEscaped}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFoodQuantityModal('${nameAttr}',${calPer100},${protPer100},${carbsPer100},${fatPer100},'${servingEscaped}','${catEscaped}')}" aria-pressed="${isSelected}">
            <div class="food-item-header">
            <span class="food-item-name">${food.name || 'Unknown'}</span>
            <span class="food-item-calories">${Math.round(food.calories || 0)} cal</span>
            </div>
            <div class="food-item-macros">
            <span class="food-macro protein">🥩 ${(food.protein || 0).toFixed(1)}g</span>
            <span class="food-macro carbs">🍚 ${(food.carbs || 0).toFixed(1)}g</span>
            <span class="food-macro fat">🥑 ${(food.fat || 0).toFixed(1)}g</span>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 8px;">Per ${food.serving || '100g'}</div>
            ${isSelected && selectedFood
                ? `<div style="margin-top: 4px;"><span class="selected-food-qty">✓ ${selectedFood.quantity}g · ${selectedFood.calories} cal</span></div>`
                : ''}
            ${food.source === 'custom'
                ? `<div style="margin-top: 6px;"><span style="font-size: 11px; background: rgba(255,230,109,0.2); color: var(--warning); padding: 2px 8px; border-radius: 4px;">Custom</span> <button onclick="event.stopPropagation();deleteCustomFood('${food.id || ''}')" style="background:none;border:none;color:var(--coral);cursor:pointer;font-size:12px;padding:2px 6px;">✕</button></div>`
                : food.source === 'api'
                    ? `<div style="margin-top: 6px;"><span style="font-size: 11px; background: rgba(0,180,216,0.15); color: #00B4D8; padding: 2px 8px; border-radius: 4px;">Open Food Facts</span></div>`
                    : ''}
            </div>`;
    }).join('');
}

function selectMealTab(meal) {
    const cfg = getMealConfig(mealCount);
    if (cfg.meals.indexOf(meal) === -1) meal = cfg.meals[0];
    currentMealTab = meal;
    document.querySelectorAll('.meal-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.meal === meal);
        tab.setAttribute('aria-selected', tab.dataset.meal === meal);
    });
    document.getElementById('current-meal-label').textContent = cfg.labels[meal] || 'Meal';
    renderFoodGrid();
    renderSelectedFoods();
}

function toggleFood(name, calories, protein, carbs, fat, serving, category, quantity) {
    const mealFoods = selectedFoodsByMeal[currentMealTab];
    const existingIndex = mealFoods.findIndex(f => f.name === name);

    if (existingIndex > -1) {
        if (quantity !== undefined) {
            mealFoods[existingIndex].calories = calories;
            mealFoods[existingIndex].protein = protein;
            mealFoods[existingIndex].carbs = carbs;
            mealFoods[existingIndex].fat = fat;
            mealFoods[existingIndex].serving = serving;
            mealFoods[existingIndex].quantity = quantity;
        } else {
            mealFoods.splice(existingIndex, 1);
        }
    } else {
        const item = { name, calories, protein, carbs, fat, serving, category };
        if (quantity !== undefined) item.quantity = quantity;
        mealFoods.push(item);
    }

    renderFoodGrid();
    renderSelectedFoods();
}

function removeFood(index) {
    selectedFoodsByMeal[currentMealTab].splice(index, 1);
    renderFoodGrid();
    renderSelectedFoods();
}

function renderSelectedFoods() {
    const list = document.getElementById('selected-foods-list');
    const mealFoods = selectedFoodsByMeal[currentMealTab];
    const totalCal = mealFoods.reduce((sum, f) => sum + f.calories, 0);
    const totalPro = mealFoods.reduce((sum, f) => sum + f.protein, 0);
    const totalCarbs = mealFoods.reduce((sum, f) => sum + f.carbs, 0);
    const totalFat = mealFoods.reduce((sum, f) => sum + f.fat, 0);

    const targets = calculateMealTargets(currentMealTab);

    const remainingHtml = `<div class="remaining-macros">
        <div class="remaining-item"><span class="label">🔥 Cal</span><span class="value ${totalCal <= targets.calories ? 'positive' : 'negative'}">${targets.calories - totalCal}</span><span style="font-size:10px;color:var(--text-secondary);">/${targets.calories}</span></div>
        <div class="remaining-item"><span class="label">🥩 Protein</span><span class="value ${(totalPro <= targets.protein * 1.1) ? 'positive' : 'negative'}">${Math.max(0, targets.protein - Math.round(totalPro))}g</span><span style="font-size:10px;color:var(--text-secondary);">/${targets.protein}g</span></div>
        <div class="remaining-item"><span class="label">🍚 Carbs</span><span class="value ${(totalCarbs <= targets.carbs * 1.1) ? 'positive' : 'negative'}">${Math.max(0, targets.carbs - Math.round(totalCarbs))}g</span><span style="font-size:10px;color:var(--text-secondary);">/${targets.carbs}g</span></div>
        </div>`;

    if (mealFoods.length === 0) {
        list.innerHTML = `<div style="color: var(--text-secondary); font-size: 14px; padding: 12px;">No foods selected for this meal yet. Click a food to add it.</div>${remainingHtml}`;
        return;
    }

    list.innerHTML = mealFoods.map((food, index) => {
        return `<div class="selected-food-tag">
            <span>${food.name}</span>
            ${food.quantity ? `<span class="selected-food-qty">${food.quantity}g</span>` : ''}
            <span style="color: var(--accent); font-size: 12px;">(${food.calories} cal)</span>
            <button onclick="removeFood(${index})" aria-label="Remove ${food.name}">×</button>
            </div>`;
    }).join('') + `<div style="color: var(--text-secondary); font-size: 13px; padding: 8px 0;">Meal total: <strong style="color: var(--accent);">${totalCal} cal</strong> · P: ${totalPro.toFixed(1)}g · C: ${totalCarbs.toFixed(1)}g · F: ${totalFat.toFixed(1)}g</div>${remainingHtml}`;
    updateMacroBalancer();
}

function filterByCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.food-category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    if (category === 'api' && currentSearch.length < 2) {
        document.getElementById('food-search').focus();
    }
    renderFoodGrid();
}

function filterFoods() {
    currentSearch = document.getElementById('food-search').value;
    if (currentSearch.length >= 2) {
        searchFoodsFromApi(currentSearch);
    } else {
        window.currentApiResults = [];
        renderFoodGrid();
    }
}

function selectDietPlan(plan, evt) {
    document.querySelectorAll('.diet-plan-option').forEach(opt => { opt.classList.remove('selected'); });
    const target = evt && evt.currentTarget ? evt.currentTarget : (evt && evt.target ? evt.target.closest('.diet-plan-option') : null);
    if (target) target.classList.add('selected');

    const foodPanel = document.getElementById('food-selection-panel');
    const dietChart = document.querySelector('.diet-chart');

    weeklyMode = (plan === 'weekly');
    if (!weeklyMode) weeklyDietHtml = [];
    document.getElementById('week-tabs').style.display = weeklyMode ? 'flex' : 'none';
    if (plan === 'custom') {
        foodPanel.classList.add('show');
        if (dietChart) dietChart.style.display = 'none';
        renderFoodGrid();
    } else {
        foodPanel.classList.remove('show');
        initSelectedFoods(mealCount);
        currentMealTab = getMealConfig(mealCount).meals[0];
        updateMealTabs();
        renderSelectedFoods();
        showFoodPreferences();
    }
}

// ====== Food Preferences ======
function showFoodPreferences() {
    openModal('pref-modal', { label: 'Select food preferences' });

    const saved = localStorage.getItem('caloriecoach-food-prefs');
    if (saved) {
        try { userFoodPreferences = JSON.parse(saved); } catch (e) { userFoodPreferences = {}; }
    }

    const dietPref = document.querySelector('input[name="diet"]:checked');
    const isVeg = dietPref && dietPref.value === 'veg';

    if (isVeg) {
        Object.keys(userFoodPreferences).forEach(cat => {
            userFoodPreferences[cat] = (userFoodPreferences[cat] || []).filter(name => {
                const foods = foodDatabaseDetailed[cat] || [];
                const match = foods.find(f => f.name === name);
                return !match || !match.type || match.type === 'veg';
            });
        });
    }

    function renderPrefCategory(key, icon, label, foods, countId) {
        const selected = userFoodPreferences[key] || [];
        const foodHtml = foods.map(f => {
            const isSelected = selected.indexOf(f.name) > -1;
            return `<div class="pref-food-item ${isSelected ? 'selected' : ''}" role="option" aria-selected="${isSelected}" tabindex="0" onclick="toggleFoodPreference('${key}','${f.name.replace(/'/g, "\\'")}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleFoodPreference('${key}','${f.name.replace(/'/g, "\\'")}')}">
                <div class="pref-check">✓</div>
                <span class="pref-name">${f.name}</span>
                <span class="pref-macro">${Math.round(f.calories)} cal</span>
                </div>`;
        }).join('');
        const noneMsg = `<div class="pref-none-selected${foods.length > 0 ? '" style="display:none;"' : ''}">No foods available</div>`;
        const cid = countId || key;
        return `<div class="pref-category" data-category="${key}">
            <div class="pref-category-header">
            <span>${icon} ${label}</span>
            <span class="pref-count" id="pref-count-${cid}">${selected.length} selected</span>
            </div>
            <div class="pref-food-grid">${foodHtml}</div>
            ${noneMsg}
            </div>`;
    }

    const allProtein = foodDatabaseDetailed.protein || [];
    const vegProtein = allProtein.filter(f => !f.type || f.type === 'veg');
    const nonVegProtein = allProtein.filter(f => f.type === 'nonveg');

    let html = '';
    if (isVeg) {
        html += renderPrefCategory('protein', '🥩', 'Veg Protein', vegProtein, 'protein-veg');
    } else {
        html += renderPrefCategory('protein', '🥩', 'Veg Protein', vegProtein, 'protein-veg');
        html += renderPrefCategory('protein', '🥩', 'Non-Veg Protein', nonVegProtein, 'protein-nonveg');
    }

    const otherCategories = [
        { key: 'carbs', icon: '🍚', label: 'Carbs' },
        { key: 'vegetables', icon: '🥦', label: 'Vegetables' },
        { key: 'fruits', icon: '🍎', label: 'Fruits' },
        { key: 'dairy', icon: '🧀', label: 'Dairy' },
        { key: 'fats', icon: '🥑', label: 'Fats & Seeds' }
    ];

    otherCategories.forEach(cat => {
        const foods = foodDatabaseDetailed[cat.key] || [];
        html += renderPrefCategory(cat.key, cat.icon, cat.label, foods);
    });

    document.getElementById('food-preference-grid').innerHTML = html;
}

function toggleFoodPreference(category, name) {
    if (!userFoodPreferences[category]) userFoodPreferences[category] = [];
    const idx = userFoodPreferences[category].indexOf(name);
    if (idx > -1) {
        userFoodPreferences[category].splice(idx, 1);
    } else {
        userFoodPreferences[category].push(name);
    }
    const countEls = document.querySelectorAll('[id^="pref-count-' + category + '"]');
    countEls.forEach(el => {
        el.textContent = `${userFoodPreferences[category].length} selected`;
    });
    const items = document.querySelectorAll(`#food-preference-grid .pref-category[data-category="${category}"] .pref-food-item`);
    items.forEach(item => {
        const nameEl = item.querySelector('.pref-name');
        if (nameEl && nameEl.textContent === name) {
            item.classList.toggle('selected');
            item.setAttribute('aria-selected', item.classList.contains('selected'));
        }
    });
}

function closeFoodPreferences() {
    closeModal('pref-modal');
}

function confirmFoodPreferences() {
    let hasSelection = false;
    const requiredCats = ['protein', 'carbs', 'vegetables'];
    for (let ci = 0; ci < requiredCats.length; ci++) {
        const cat = requiredCats[ci];
        if (userFoodPreferences[cat] && userFoodPreferences[cat].length > 0) { hasSelection = true; break; }
    }
    if (!hasSelection) {
        alert('Please select at least one food from Protein, Carbs, or Vegetables.');
        return;
    }
    localStorage.setItem('caloriecoach-food-prefs', JSON.stringify(userFoodPreferences));
    closeFoodPreferences();
    if (weeklyMode) {
        generateWeek();
    } else {
        generateDietWithPreferences();
    }
}

function skipFoodPreferences() {
    closeFoodPreferences();
    if (weeklyMode) {
        weeklyDietHtml = [];
        for (let di = 0; di < 7; di++) {
            for (let ri = 0; ri < di * 5; ri++) { Math.random(); }
            generateDefaultDiet();
            weeklyDietHtml[di] = document.getElementById('diet-chart-body').innerHTML;
        }
        showWeekDay(0);
    } else {
        generateDefaultDiet();
    }
}

// ====== Weekly Meal Plan ======
function generateWeek() {
    weeklyDietHtml = [];
    document.getElementById('week-tabs').style.display = 'flex';
    for (let d = 0; d < 7; d++) {
        generateDietWithPreferences();
        weeklyDietHtml[d] = document.getElementById('diet-chart-body').innerHTML;
    }
    currentWeekDay = 0;
    showWeekDay(0);
}

function showWeekDay(idx) {
    if (idx < 0 || idx >= weeklyDietHtml.length) return;
    currentWeekDay = idx;
    const tbody = document.getElementById('diet-chart-body');
    if (tbody && weeklyDietHtml[idx]) {
        tbody.innerHTML = weeklyDietHtml[idx];
    }
    document.querySelectorAll('.day-tab').forEach(tab => {
        tab.classList.toggle('active', parseInt(tab.dataset.day) === idx);
        if (tab.dataset.day !== undefined) {
            tab.setAttribute('aria-selected', parseInt(tab.dataset.day) === idx);
        }
    });
}

function regenerateWeekDay() {
    if (weeklyDietHtml.length === 0) return;
    for (let ri = 0; ri < currentWeekDay * 7 + 3; ri++) { Math.random(); }
    generateDietWithPreferences();
    weeklyDietHtml[currentWeekDay] = document.getElementById('diet-chart-body').innerHTML;
    showWeekDay(currentWeekDay);
}

// ====== Diet Chart Generation ======
function renderMacroComparisonRow(totalCal, totalP, totalC, totalF, targetCal, targetP, targetC, targetF) {
    const pct = (a, b) => b > 0 ? Math.round((a / b) * 100) : 0;
    const bar = (pctVal) => {
        const c = pctVal > 110 ? 'var(--coral)' : pctVal >= 90 ? 'var(--accent)' : 'var(--warning)';
        return `<div style="width:60px;height:4px;background:var(--border);border-radius:2px;display:inline-block;vertical-align:middle;margin-left:6px;"><div style="width:${Math.min(pctVal,100)}%;height:100%;background:${c};border-radius:2px;"></div></div>`;
    };
    const macroIndicator = (actual, target) => {
        const r = target > 0 ? actual / target : 1;
        if (r > 1.10) return '⚠️';
        if (r >= 0.90) return '✅';
        return '🎯';
    };
    const macroColor = (actual, target) => {
        const r = target > 0 ? actual / target : 1;
        if (r > 1.10) return 'var(--coral)';
        if (r >= 0.90) return 'inherit';
        return 'var(--warning)';
    };
    const calDiff = totalCal - targetCal;
    const calPct = targetCal > 0 ? (totalCal / targetCal) : 1;
    const calStatus = calDiff > 10 ? `+${calDiff}` : calDiff < -10 ? `${calDiff}` : '0';
    const calColor = calPct > 1.10 ? 'var(--coral)' : calPct < 0.90 ? 'var(--warning)' : 'var(--accent)';
    return `<tr style="background:rgba(0,245,212,0.06);font-weight:600;">
        <td style="padding:14px 20px;"><strong>📊 Daily Total</strong></td>
        <td style="padding:14px 20px;">
            <div style="display:flex;flex-direction:column;gap:4px;font-size:13px;">
                <span style="color:#FF6B6B;">P: <strong>${Math.round(totalP)}g</strong> / ${targetP}g ${macroIndicator(totalP, targetP)} <span style="color:${macroColor(totalP, targetP)};">${pct(totalP,targetP)}%</span> ${bar(pct(totalP,targetP))}</span>
                <span style="color:#FFE66D;">C: <strong>${Math.round(totalC)}g</strong> / ${targetC}g ${macroIndicator(totalC, targetC)} <span style="color:${macroColor(totalC, targetC)};">${pct(totalC,targetC)}%</span> ${bar(pct(totalC,targetC))}</span>
                <span style="color:#00F5D4;">F: <strong>${Math.round(totalF)}g</strong> / ${targetF}g ${macroIndicator(totalF, targetF)} <span style="color:${macroColor(totalF, targetF)};">${pct(totalF,targetF)}%</span> ${bar(pct(totalF,targetF))}</span>
            </div>
        </td>
        <td class="calories-cell" style="padding:14px 20px;">
            <div style="font-size:20px;color:${calColor};">${totalCal} cal (${Math.round(calPct * 100)}%)</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Target: ${targetCal} cal <span style="color:${calColor};">${calStatus}</span></div>
        </td>
    </tr>`;
}

function generateDefaultDiet() {
    const dietChart = document.querySelector('.diet-chart');
    if (dietChart) dietChart.style.display = 'block';

    const dietChartData = generateDietChart(globalTargetCalories, globalGoal, globalDiet);
    const cfg = getMealConfig(mealCount);
    const ratios = getMacroRatios();
    let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;

    const tbody = document.getElementById('diet-chart-body');
    let rows = dietChartData.map(item => {
        const mealLabel = cfg.labels[item.meal] || (item.meal.charAt(0).toUpperCase() + item.meal.slice(1));
        item.foods.forEach(f => {
            totalCal += f.calories;
            totalP += f.protein;
            totalC += f.carbs;
            totalF += f.fat;
        });
        return `<tr>
            <td>
            <div class="meal-time">
            <span class="meal-time-icon">${item.time.icon}</span> ${mealLabel}
            </div>
            <div style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">${item.time.time}</div>
            </td>
            <td>
            <ul class="food-list">
            ${item.foods.map(food => {
                return `<li>${recipeLink(food.name)}<br><span style="color: var(--text-secondary); font-size: 13px;">${food.servingG}g</span> <span style="color: var(--accent); font-size: 12px;">${food.calories} cal</span><br><span style="font-size: 12px;"><span style="color: #FF6B6B;">P: ${food.protein}g</span> · <span style="color: #FFE66D;">C: ${food.carbs}g</span> · <span style="color: #00F5D4;">F: ${food.fat}g</span></span></li>`;
            }).join('')}
            </ul>
            </td>
            <td class="calories-cell">${item.totalCalories} cal</td>
            </tr>`;
    }).join('');

    const targetP = Math.round((globalTargetCalories * ratios.protein) / 4);
    const targetC = Math.round((globalTargetCalories * ratios.carbs) / 4);
    const targetF = Math.round((globalTargetCalories * ratios.fat) / 9);

    rows += renderMacroComparisonRow(totalCal, totalP, totalC, totalF, globalTargetCalories, targetP, targetC, targetF);
    tbody.innerHTML = rows;
}

function generateDietWithPreferences() {
    const dietChart = document.querySelector('.diet-chart');
    if (dietChart) dietChart.style.display = 'block';

    const cfg = getMealConfig(mealCount);
    const ratios = getMacroRatios();
    const tbody = document.getElementById('diet-chart-body');
    let rows = '';
    let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;

    const getFoodData = (name, category) => {
        const foods = foodDatabaseDetailed[category] || [];
        for (let fi = 0; fi < foods.length; fi++) {
            if (foods[fi].name === name) return foods[fi];
        }
        return null;
    };

    const shuffleArr = (arr) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
        return a;
    };

    const queues = {
        protein: shuffleArr(userFoodPreferences['protein'] || []),
        carbs: shuffleArr(userFoodPreferences['carbs'] || []),
        veg: shuffleArr(userFoodPreferences['vegetables'] || []),
        fruit: shuffleArr(userFoodPreferences['fruits'] || []),
        dairy: shuffleArr(userFoodPreferences['dairy'] || []),
        fats: shuffleArr(userFoodPreferences['fats'] || [])
    };

    const pickOne = (queue) => {
        if (queue.length === 0) return null;
        const item = queue.shift();
        queue.push(item);
        return item;
    };

    cfg.meals.forEach(meal => {
        const mealTarget = Math.round(globalTargetCalories * (cfg.dist[meal] || 0));

        const targetP = Math.round((mealTarget * ratios.protein) / 4);
        const targetC = Math.round((mealTarget * ratios.carbs) / 4);
        const targetF = Math.round((mealTarget * ratios.fat) / 9);

        const pickedProtein = pickOne(queues.protein);
        const pickedCarb = pickOne(queues.carbs);
        const pickedVeg = pickOne(queues.veg);
        const pickedDairy = (meal === 'breakfast' || meal === 'morningSnack' || meal === 'afternoonSnack' || meal === 'eveningSnack') ? pickOne(queues.dairy) : null;
        const pickedFruit = (meal === 'morningSnack' || meal === 'afternoonSnack' || meal === 'eveningSnack') ? pickOne(queues.fruit) : null;
        const pickedFat = pickOne(queues.fats);

        const proteinData = pickedProtein ? getFoodData(pickedProtein, 'protein') : null;
        const carbData = pickedCarb ? getFoodData(pickedCarb, 'carbs') : null;
        const vegData = pickedVeg ? getFoodData(pickedVeg, 'vegetables') : null;
        const dairyData = pickedDairy ? getFoodData(pickedDairy, 'dairy') : null;
        const fruitData = pickedFruit ? getFoodData(pickedFruit, 'fruits') : null;
        const fatData = pickedFat ? getFoodData(pickedFat, 'fats') : null;

        const fixedFoods = [];
        if (vegData && (meal === 'lunch' || meal === 'dinner')) {
            fixedFoods.push({ name: vegData.name, data: vegData, cat: 'vegetables', servingG: 80 });
        } else if (vegData) {
            fixedFoods.push({ name: vegData.name, data: vegData, cat: 'vegetables', servingG: 50 });
        }
        if (dairyData) fixedFoods.push({ name: dairyData.name, data: dairyData, cat: 'dairy', servingG: 120 });
        if (fruitData) fixedFoods.push({ name: fruitData.name, data: fruitData, cat: 'fruits', servingG: 100 });

        let fixedP = 0, fixedC = 0, fixedF = 0;
        fixedFoods.forEach(p => {
            const f = p.servingG / 100;
            fixedP += (p.data.protein || 0) * f;
            fixedC += (p.data.carbs || 0) * f;
            fixedF += (p.data.fat || 0) * f;
        });
        const fixedCal = fixedP * 4 + fixedC * 4 + fixedF * 9;

        let remP = Math.max(0, targetP - fixedP);
        let remC = Math.max(0, targetC - fixedC);
        let remF = Math.max(0, targetF - fixedF);

        const picked = [];
        let actualP = fixedP, actualC = fixedC, actualF = fixedF;

        if (proteinData && proteinData.protein > 0 && remP > 0.5) {
            let pServing = Math.round((remP / proteinData.protein) * 100);
            if (pServing < 20) pServing = 20;
            if (pServing > 300) pServing = 300;
            picked.push({ name: proteinData.name, data: proteinData, cat: 'protein', servingG: pServing });
            const pf = pServing / 100;
            actualP += (proteinData.protein || 0) * pf;
            actualC += (proteinData.carbs || 0) * pf;
            actualF += (proteinData.fat || 0) * pf;
            remC = Math.max(0, remC - (proteinData.carbs || 0) * pf);
            remF = Math.max(0, remF - (proteinData.fat || 0) * pf);
        }

        if (carbData && carbData.carbs > 0 && remC > 0.5) {
            let cServing = Math.round((remC / carbData.carbs) * 100);
            if (cServing < 20) cServing = 20;
            if (cServing > 350) cServing = 350;
            picked.push({ name: carbData.name, data: carbData, cat: 'carbs', servingG: cServing });
            const cf = cServing / 100;
            actualP += (carbData.protein || 0) * cf;
            actualC += (carbData.carbs || 0) * cf;
            actualF += (carbData.fat || 0) * cf;
            remP = Math.max(0, remP - (carbData.protein || 0) * cf);
            remF = Math.max(0, remF - (carbData.fat || 0) * cf);
        }

        if (fatData && fatData.fat > 0 && remF > 0.5) {
            let fServing = Math.round((remF / fatData.fat) * 100);
            if (fServing < 5) fServing = 5;
            if (fServing > 60) fServing = 60;
            picked.push({ name: fatData.name, data: fatData, cat: 'fats', servingG: fServing });
            const ff = fServing / 100;
            actualP += (fatData.protein || 0) * ff;
            actualC += (fatData.carbs || 0) * ff;
            actualF += (fatData.fat || 0) * ff;
        } else if (fatData) {
            picked.push({ name: fatData.name, data: fatData, cat: 'fats', servingG: 5 });
            const ff = 0.05;
            actualP += (fatData.protein || 0) * ff;
            actualC += (fatData.carbs || 0) * ff;
            actualF += (fatData.fat || 0) * ff;
        }

        const balPickedCal = picked.reduce((s, p) => s + Math.round((p.data.calories || 0) * p.servingG / 100), 0);
        const balTotal = balPickedCal + Math.round(fixedCal);
        if (balPickedCal > 0 && Math.abs(balTotal - mealTarget) > 50) {
            const balRemaining = Math.max(0, mealTarget - fixedCal);
            if (balRemaining > 0) {
                const balFactor = balRemaining / balPickedCal;
                picked.forEach(p => {
                    let newServing = Math.round(p.servingG * balFactor);
                    if (p.cat === 'fats') {
                        p.servingG = Math.max(3, Math.min(60, newServing));
                    } else if (p.cat === 'protein') {
                        p.servingG = Math.max(10, Math.min(350, newServing));
                    } else {
                        p.servingG = Math.max(10, Math.min(400, newServing));
                    }
                });
            }
        }

        fixedFoods.forEach(f => { picked.push(f); });

        if (picked.length === 0) {
            const fallback = generateDietChart(globalTargetCalories, globalGoal, globalDiet);
            const fallbackMeal = fallback.find(m => m.meal === meal);
            if (fallbackMeal) {
                rows += `<tr>
                    <td><div class="meal-time"><span class="meal-time-icon">${cfg.icons[meal]}</span> ${cfg.labels[meal]}</div><div style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">${cfg.times[meal]}</div></td>
                    <td><ul class="food-list">
                    ${fallbackMeal.foods.map(f => {
                        totalCal += f.calories;
                        totalP += f.protein;
                        totalC += f.carbs;
                        totalF += f.fat;
                        return `<li>${recipeLink(f.name)}<br><span style="color: var(--text-secondary); font-size: 13px;">${f.servingG}g</span> <span style="color: var(--accent); font-size: 12px;">${f.calories} cal</span><br><span style="font-size: 12px;"><span style="color: #FF6B6B;">P: ${f.protein}g</span> · <span style="color: #FFE66D;">C: ${f.carbs}g</span> · <span style="color: #00F5D4;">F: ${f.fat}g</span></span></li>`;
                    }).join('')}
                    </ul></td>
                    <td class="calories-cell">${fallbackMeal.totalCalories} cal</td>
                    </tr>`;
                return;
            }
            rows += `<tr><td colspan="3" style="text-align:center;color:var(--text-secondary);padding:20px;">No foods selected for this meal</td></tr>`;
            return;
        }

        let mealTotalCal = 0;
        let mealDisplayP = 0, mealDisplayC = 0, mealDisplayF = 0;
        let foodsHtml = '';

        picked.forEach(p => {
            const factor = p.servingG / 100;
            const cal = Math.round((p.data.calories || 0) * factor);
            const prot = Math.round((p.data.protein || 0) * factor * 10) / 10;
            const carb = Math.round((p.data.carbs || 0) * factor * 10) / 10;
            const fat = Math.round((p.data.fat || 0) * factor * 10) / 10;

            mealTotalCal += cal;
            mealDisplayP += prot;
            mealDisplayC += carb;
            mealDisplayF += fat;

            foodsHtml += `<li>${recipeLink(p.name)}<br><span style="color: var(--text-secondary); font-size: 13px;">${p.servingG}g</span> <span style="color: var(--accent); font-size: 12px;">${cal} cal</span><br><span style="font-size: 12px;"><span style="color: #FF6B6B;">P: ${prot}g</span> · <span style="color: #FFE66D;">C: ${carb}g</span> · <span style="color: #00F5D4;">F: ${fat}g</span></span></li>`;
        });

        totalCal += mealTotalCal;
        totalP += mealDisplayP;
        totalC += mealDisplayC;
        totalF += mealDisplayF;

        const targetPct = Math.round(ratios.protein * 100);
        const targetCct = Math.round(ratios.carbs * 100);
        const targetFct = Math.round(ratios.fat * 100);
        const calDiff = mealTotalCal - mealTarget;
        const calStatus = calDiff > 5 ? '⚠️ +' + calDiff : calDiff < -5 ? '⚠️ ' + calDiff : '✅';

        rows += `<tr>
            <td>
            <div class="meal-time">
            <span class="meal-time-icon">${cfg.icons[meal]}</span> ${cfg.labels[meal]}
            </div>
            <div style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">${cfg.times[meal]}</div>
            </td>
            <td><ul class="food-list">${foodsHtml}</ul></td>
            <td class="calories-cell">
            <div style="font-size:20px;color:var(--accent);">${mealTotalCal} cal</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">Target: ${mealTarget} cal ${calStatus}</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">
            <span style="color:#FF6B6B;">P ${Math.round(mealDisplayP)}g</span> ·
            <span style="color:#FFE66D;">C ${Math.round(mealDisplayC)}g</span> ·
            <span style="color:#00F5D4;">F ${Math.round(mealDisplayF)}g</span>
            <br><span style="font-size:11px;">Target: ${targetP}g P · ${targetC}g C · ${targetF}g F (${targetPct}/${targetCct}/${targetFct})</span>
            </div>
            </td>
            </tr>`;
    });

    const targetP = Math.round((globalTargetCalories * ratios.protein) / 4);
    const targetC = Math.round((globalTargetCalories * ratios.carbs) / 4);
    const targetF = Math.round((globalTargetCalories * ratios.fat) / 9);

    rows += renderMacroComparisonRow(totalCal, totalP, totalC, totalF, globalTargetCalories, targetP, targetC, targetF);
    tbody.innerHTML = rows;
    document.getElementById('goal-text').textContent = (globalGoal === 'lose' ? 'Lose Weight' : globalGoal === 'gain' ? 'Gain Weight' : 'Maintain Weight') + ' (Custom)';
    document.getElementById('goal-badge').style.display = 'inline-flex';
    document.getElementById('diet-badge').style.display = 'inline-flex';
}

function applyCustomDiet() {
    const allFoods = Object.values(selectedFoodsByMeal).flat();
    if (allFoods.length === 0) {
        alert('Please select at least one food item');
        return;
    }

    const customProtein = allFoods.reduce((sum, f) => sum + f.protein, 0);
    const customCarbs = allFoods.reduce((sum, f) => sum + f.carbs, 0);
    const customFat = allFoods.reduce((sum, f) => sum + f.fat, 0);

    document.getElementById('protein-value').textContent = `${customProtein.toFixed(1)}g`;
    document.getElementById('carbs-value').textContent = `${customCarbs.toFixed(1)}g`;
    document.getElementById('fat-value').textContent = `${customFat.toFixed(1)}g`;

    const goalLabels = { lose: 'Lose Weight', maintain: 'Maintain Weight', gain: 'Gain Weight' };
    const cfg = getMealConfig(mealCount);

    const tbody = document.getElementById('diet-chart-body');
    let rows = '';

    cfg.meals.forEach(meal => {
        const foods = selectedFoodsByMeal[meal];
        if (foods.length === 0) return;

        const mealCal = foods.reduce((sum, f) => sum + f.calories, 0);
        const meta = { icon: cfg.icons[meal] || '🍽️', label: cfg.labels[meal] || meal, time: cfg.times[meal] || '' };

        rows += `<tr>
            <td>
            <div class="meal-time">
            <span class="meal-time-icon">${meta.icon}</span> ${meta.label}
            </div>
            <div style="color: var(--text-secondary); font-size: 12px; margin-top: 4px;">${meta.time}</div>
            </td>
            <td>
            <ul class="food-list">
            ${foods.map(food => {
                return `<li>${recipeLink(food.name)}<br><span style="color: var(--text-secondary); font-size: 13px;">${food.serving}</span>
                    <div style="display: flex; gap: 8px; margin-top: 4px; font-size: 12px;">
                    <span class="food-macro protein">P: ${food.protein}g</span>
                    <span class="food-macro carbs">C: ${food.carbs}g</span>
                    <span class="food-macro fat">F: ${food.fat}g</span>
                    </div>
                    </li>`;
            }).join('')}
            </ul>
            </td>
            <td class="calories-cell">
            <div style="font-size: 20px; color: var(--accent);">${mealCal} cal</div>
            </td>
            </tr>`;
    });

    const totalCal = allFoods.reduce((sum, f) => sum + f.calories, 0);
    const totalP = allFoods.reduce((sum, f) => sum + f.protein, 0);
    const totalC = allFoods.reduce((sum, f) => sum + f.carbs, 0);
    const totalF = allFoods.reduce((sum, f) => sum + f.fat, 0);

    if (rows) {
        const ratios = getMacroRatios();
        const targetP = Math.round((globalTargetCalories * ratios.protein) / 4);
        const targetC = Math.round((globalTargetCalories * ratios.carbs) / 4);
        const targetF = Math.round((globalTargetCalories * ratios.fat) / 9);
        rows += renderMacroComparisonRow(totalCal, totalP, totalC, totalF, globalTargetCalories, targetP, targetC, targetF);
    }

    tbody.innerHTML = rows;
    const dietChart = document.querySelector('.diet-chart');
    if (dietChart) dietChart.style.display = 'block';
    document.getElementById('food-selection-panel').classList.remove('show');
    document.getElementById('goal-text').textContent = `${goalLabels[globalGoal]} (Custom)`;
}

function scaleFoodsForMeal(foods, mealTarget) {
    const base = foods.map(function(f) {
        var factor = f.servingG / 100;
        return {
            name: f.name,
            servingG: f.servingG,
            calories: Math.round(f.per100g.calories * factor),
            protein: Math.round(f.per100g.protein * factor * 10) / 10,
            carbs: Math.round(f.per100g.carbs * factor * 10) / 10,
            fat: Math.round(f.per100g.fat * factor * 10) / 10
        };
    });
    var rawTotal = base.reduce(function(s, f) { return s + f.calories; }, 0);
    var scale = rawTotal > 0 ? mealTarget / rawTotal : 1;
    return base.map(function(f) {
        return {
            name: f.name,
            servingG: Math.round(f.servingG * scale),
            calories: Math.round(f.calories * scale),
            protein: Math.round(f.protein * scale * 10) / 10,
            carbs: Math.round(f.carbs * scale * 10) / 10,
            fat: Math.round(f.fat * scale * 10) / 10
        };
    });
}

function macroFitScore(foods, mealTarget, ratios) {
    var tp = (mealTarget * ratios.protein) / 4;
    var tc = (mealTarget * ratios.carbs) / 4;
    var tf = (mealTarget * ratios.fat) / 9;
    var ap = foods.reduce(function(s, f) { return s + f.protein; }, 0);
    var ac = foods.reduce(function(s, f) { return s + f.carbs; }, 0);
    var af = foods.reduce(function(s, f) { return s + f.fat; }, 0);
    return Math.abs(ap - tp) / Math.max(tp, 1) + Math.abs(ac - tc) / Math.max(tc, 1) + Math.abs(af - tf) / Math.max(tf, 1);
}

function generateDietChart(targetCalories, goal, diet) {
    var cfg = getMealConfig(mealCount);
    var ratios = getMacroRatios();
    var chart = [];

    cfg.meals.forEach(function(meal) {
        var mealTarget = Math.round(targetCalories * (cfg.dist[meal] || 0));
        if (!foodDatabase[meal]) return;
        var available = foodDatabase[meal][diet][goal];

        var bestFoods = null;
        var bestScore = Infinity;

        for (var attempt = 0; attempt < 8; attempt++) {
            var picked = shuffleArray(available).slice(0, 3);
            var scaled = scaleFoodsForMeal(picked, mealTarget);
            var score = macroFitScore(scaled, mealTarget, ratios);
            if (score < bestScore) {
                bestScore = score;
                bestFoods = scaled;
            }
            if (score < 0.4) break;
        }

        chart.push({
            meal: meal,
            time: { icon: cfg.icons[meal] || '\uD83C\uDF7D\uFE0F', time: cfg.times[meal] || '' },
            foods: bestFoods,
            totalCalories: mealTarget
        });
    });

    var targetP = (targetCalories * ratios.protein) / 4;
    var targetC = (targetCalories * ratios.carbs) / 4;
    var targetF = (targetCalories * ratios.fat) / 9;
    var totalP = 0, totalC = 0, totalF = 0;
    chart.forEach(function(meal) {
        meal.foods.forEach(function(f) {
            totalP += f.protein;
            totalC += f.carbs;
            totalF += f.fat;
        });
    });
    var scale = Math.min(1, targetP / Math.max(totalP, 1), targetC / Math.max(totalC, 1), targetF / Math.max(totalF, 1));
    if (scale < 1) {
        chart.forEach(function(meal) {
            var mealCal = 0;
            meal.foods.forEach(function(f) {
                f.protein = Math.round(f.protein * scale * 10) / 10;
                f.carbs = Math.round(f.carbs * scale * 10) / 10;
                f.fat = Math.round(f.fat * scale * 10) / 10;
                f.calories = Math.round(f.protein * 4 + f.carbs * 4 + f.fat * 9);
                f.servingG = Math.round(f.servingG * scale);
                mealCal += f.calories;
            });
            meal.totalCalories = mealCal;
        });
    }

    return chart;
}

// ====== Main Calculate Function ======
function calculate() {
    if (!validateForm()) return;

    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const dietPlanChoice = document.getElementById('diet-plan-choice');

    loading.classList.add('show');
    results.classList.remove('show');
    dietPlanChoice.classList.remove('show');
    document.getElementById('food-selection-panel').classList.remove('show');
    const dietChart = document.querySelector('.diet-chart');
    if (dietChart) dietChart.style.display = 'none';

    setTimeout(() => {
        const age = parseInt(document.getElementById('age').value);
        const weight = getWeightInKg();
        const height = getHeightInCm();
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const diet = document.querySelector('input[name="diet"]:checked').value;

        globalGoal = goal;
        globalDiet = diet;
        mealCount = parseInt(document.getElementById('meal-count').value) || 5;

        const bmr = calculateBMR(weight, height, age, gender);
        const tdee = Math.round(bmr * activity);
        let targetCalories;

        const goalLabels = {
            lose: 'Lose Weight',
            maintain: 'Maintain Weight',
            gain: 'Gain Weight'
        };

        switch (goal) {
            case 'lose':
                targetCalories = tdee - 500;
                break;
            case 'gain':
                targetCalories = tdee + 500;
                break;
            default:
                targetCalories = tdee;
        }

        let calorieFloorWarning = targetCalories < 1200;
        if (calorieFloorWarning) {
            targetCalories = 1200;
        }

        globalTargetCalories = targetCalories;

        const bmi = calculateBMI(weight, height);
        const bmiCat = getBMICategory(bmi);

        const macroRatios = getMacroRatios();
        const protein = Math.round((targetCalories * macroRatios.protein) / 4);
        const carbs = Math.round((targetCalories * macroRatios.carbs) / 4);
        const fat = Math.round((targetCalories * macroRatios.fat) / 9);

        let activityFactor;
        if (activity >= 1.725) {
            activityFactor = 1.5;
        } else if (activity >= 1.55) {
            activityFactor = 1.2;
        } else if (activity >= 1.375) {
            activityFactor = 1.1;
        } else {
            activityFactor = 1;
        }
        const waterLiters = (weight * 0.033 * activityFactor).toFixed(1);

        document.getElementById('calorie-warning').style.display = calorieFloorWarning ? 'flex' : 'none';
        document.getElementById('goal-label').textContent = goalLabels[goal];
        document.getElementById('bmi-category').textContent = bmiCat.text;
        document.getElementById('bmi-category').style.color = bmiCat.color;
        document.getElementById('goal-text').textContent = goalLabels[goal];
        document.getElementById('diet-text').textContent = diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian';
        document.getElementById('water-value').textContent = `${waterLiters}L`;

        loading.classList.remove('show');
        results.classList.add('show');
        dietPlanChoice.classList.add('show');

        animateCounter(document.getElementById('bmr-value'), bmr, 1000);
        animateCounter(document.getElementById('tdee-value'), tdee, 1100);
        animateCounter(document.getElementById('target-calories'), targetCalories, 1200);
        animateCounter(document.getElementById('bmi-value'), parseFloat(bmi), 900, '');
        animateCounter(document.getElementById('protein-value'), protein, 1000, 'g');
        animateCounter(document.getElementById('carbs-value'), carbs, 1000, 'g');
        animateCounter(document.getElementById('fat-value'), fat, 1000, 'g');

        initWaterTracker(waterLiters);
        updateExerciseCard(tdee);
        initProgressDashboard(targetCalories, protein, carbs, fat);

        const totalMacroCalories = (protein * 4) + (carbs * 4) + (fat * 9);
        setTimeout(() => {
            document.getElementById('protein-bar').style.width = `${(protein * 4 / totalMacroCalories) * 100}%`;
            document.getElementById('carbs-bar').style.width = `${(carbs * 4 / totalMacroCalories) * 100}%`;
            document.getElementById('fat-bar').style.width = `${(fat * 9 / totalMacroCalories) * 100}%`;
        }, 300);

        setTimeout(() => {
            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        const name = document.getElementById('name').value || '';
        saveToHistory({
            date: new Date().toISOString(),
            name,
            bmr,
            tdee: tdee,
            target: targetCalories,
            bmi: parseFloat(bmi).toFixed(1),
            goal: goalLabels[goal],
            weight: weight.toFixed(1),
            protein,
            carbs,
            fat
        });
        renderHistory();

    }, 800);
}

// ====== Custom Macro Split ======
function toggleMacroSplit() {
    const panel = document.getElementById('macro-split-panel');
    const arrow = document.getElementById('macro-split-arrow');
    macroSplitOpen = !macroSplitOpen;
    panel.classList.toggle('show', macroSplitOpen);
    arrow.classList.toggle('open', macroSplitOpen);
}

function normalizeMacroSplit() {
    let p = parseFloat(document.getElementById('protein-pct').value) || 30;
    let c = parseFloat(document.getElementById('carbs-pct').value) || 40;
    let f = parseFloat(document.getElementById('fat-pct').value) || 30;
    let total = p + c + f;
    const sumEl = document.getElementById('macro-split-sum');
    if (total === 0) { sumEl.textContent = 'Total: 0% ❌'; sumEl.className = 'macro-split-sum invalid'; return; }
    const diff = 100 - total;
    if (Math.abs(diff) > 0.5) {
        let adjusted = false;
        if (p > 5 && diff !== 0) { p = Math.round((p / total) * 100); adjusted = true; }
        if (c > 5 && diff !== 0) { c = Math.round((c / total) * 100); adjusted = true; }
        if (f > 5 && diff !== 0) { f = Math.round((f / total) * 100); adjusted = true; }
        if (adjusted) {
            total = p + c + f;
            if (total !== 100) {
                let maxIdx = 0;
                const vals = [p, c, f];
                for (let vi = 1; vi < 3; vi++) { if (vals[vi] > vals[maxIdx]) maxIdx = vi; }
                vals[maxIdx] += (100 - total);
                p = vals[0]; c = vals[1]; f = vals[2];
            }
            document.getElementById('protein-pct').value = p;
            document.getElementById('carbs-pct').value = c;
            document.getElementById('fat-pct').value = f;
        }
    }
    sumEl.textContent = `Total: ${p + c + f}% ✅`;
    sumEl.className = 'macro-split-sum';
}

// ====== Water Intake Tracker ======
function initWaterTracker(goalLiters) {
    const tracker = document.getElementById('water-tracker');
    if (!tracker) return;
    tracker.style.display = 'block';
    const goalMl = Math.round(parseFloat(goalLiters || 2) * 1000);
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('caloriecoach-water') || '{}');
    if (data.date !== today) {
        data.date = today;
        data.logged = 0;
        data.goal = goalMl;
        localStorage.setItem('caloriecoach-water', JSON.stringify(data));
    }
    if (data.goal !== goalMl) data.goal = goalMl;
    renderWaterTracker(data);
}

function renderWaterTracker(data) {
    if (!data) {
        data = JSON.parse(localStorage.getItem('caloriecoach-water') || '{}');
    }
    const logged = data.logged || 0;
    const goal = data.goal || 2000;
    const pct = Math.min((logged / goal) * 100, 100);
    document.getElementById('water-logged-text').textContent = `${logged} / ${goal} ml (${Math.round(pct)}%)`;
    document.getElementById('water-progress-bar').style.width = `${pct}%`;
}

function addWater(ml) {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem('caloriecoach-water') || '{}');
    if (data.date !== today) {
        data.date = today;
        data.logged = 0;
        data.goal = data.goal || 2000;
    }
    data.logged = (data.logged || 0) + ml;
    if (data.logged > data.goal * 2) data.logged = data.goal * 2;
    localStorage.setItem('caloriecoach-water', JSON.stringify(data));
    renderWaterTracker(data);
}

function resetWaterTracker() {
    const data = JSON.parse(localStorage.getItem('caloriecoach-water') || '{}');
    data.logged = 0;
    data.date = new Date().toDateString();
    localStorage.setItem('caloriecoach-water', JSON.stringify(data));
    renderWaterTracker(data);
}

// ====== Exercise Log & TDEE Adjustment ======
function toggleExerciseLog() {
    const panel = document.getElementById('exercise-panel');
    const arrow = document.getElementById('exercise-arrow');
    exerciseLogOpen = !exerciseLogOpen;
    panel.style.display = exerciseLogOpen ? 'block' : 'none';
    arrow.classList.toggle('open', exerciseLogOpen);
    if (exerciseLogOpen) renderExerciseLog();
}

function logExercise() {
    const type = document.getElementById('exercise-type').value.trim();
    const duration = parseInt(document.getElementById('exercise-duration').value);
    const calories = parseInt(document.getElementById('exercise-calories').value);

    if (!type || isNaN(duration) || duration < 1 || isNaN(calories) || calories < 1) {
        alert('Please fill in all exercise fields.');
        return;
    }

    const allLogs = JSON.parse(localStorage.getItem('caloriecoach-exercise') || '[]');
    allLogs.push({
        date: new Date().toISOString(),
        type,
        duration,
        calories
    });
    if (allLogs.length > 200) allLogs.splice(0, allLogs.length - 200);
    localStorage.setItem('caloriecoach-exercise', JSON.stringify(allLogs));

    document.getElementById('exercise-type').value = '';
    document.getElementById('exercise-duration').value = '';
    document.getElementById('exercise-calories').value = '';
    renderExerciseLog();
}

function deleteExercise(index) {
    const allLogs = JSON.parse(localStorage.getItem('caloriecoach-exercise') || '[]');
    const today = new Date().toDateString();
    const todaysLogs = allLogs.filter(e => new Date(e.date).toDateString() === today);
    if (index >= 0 && index < todaysLogs.length) {
        const target = todaysLogs[index];
        let removeIdx = -1;
        for (let ei = 0; ei < allLogs.length; ei++) {
            if (allLogs[ei].date === target.date && allLogs[ei].type === target.type && allLogs[ei].duration === target.duration) {
                removeIdx = ei;
                break;
            }
        }
        if (removeIdx > -1) {
            allLogs.splice(removeIdx, 1);
            localStorage.setItem('caloriecoach-exercise', JSON.stringify(allLogs));
            renderExerciseLog();
        }
    }
}

function getTodaysExercise() {
    const allLogs = JSON.parse(localStorage.getItem('caloriecoach-exercise') || '[]');
    const today = new Date().toISOString().slice(0, 10);
    return allLogs.filter(log => log.date === today);
}

function renderExerciseLog() {
    const todaysLogs = getTodaysExercise();
    const totalCal = todaysLogs.reduce((sum, e) => sum + e.calories, 0);
    const list = document.getElementById('exercise-list');
    const totalEl = document.getElementById('exercise-total-cal');
    const adjustedEl = document.getElementById('adjusted-tdee');
    const summaryEl = document.getElementById('exercise-summary');

    if (todaysLogs.length === 0) {
        list.innerHTML = '<div style="color:var(--text-secondary);font-size:13px;padding:16px 0;">No exercises logged today.</div>';
    } else {
        list.innerHTML = todaysLogs.map((e, idx) => {
            return `<div class="exercise-entry">
                <span class="exercise-type">🏋️ ${e.type}</span>
                <span class="exercise-duration">⏱ ${e.duration} min</span>
                <span class="exercise-cal">🔥 ${e.calories} cal</span>
                <button onclick="deleteExercise(${idx})" style="background:none;border:none;color:var(--coral);cursor:pointer;font-size:16px;">×</button>
                </div>`;
        }).join('');
    }

    if (totalEl) totalEl.textContent = totalCal;
    if (summaryEl) summaryEl.textContent = `${totalCal} cal burned today`;

    if (adjustedEl && currentTDEE > 0) {
        adjustedEl.textContent = currentTDEE + totalCal;
    } else if (adjustedEl) {
        adjustedEl.textContent = '—';
    }
}

// ====== Counter Animation ======
function animateCounter(el, target, duration, suffix = '') {
    if (!el) return;
    const start = performance.now();
    const startVal = 0;

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startVal + (target - startVal) * eased);
        el.textContent = current + suffix;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// ====== Progress Dashboard Init ======
function initProgressDashboard(targetCal, targetPro, targetCarbs, targetFat) {
    const dashboard = document.getElementById('progress-dashboard');
    if (!dashboard) return;
    dashboard.style.display = 'block';
    localStorage.setItem('caloriecoach-last-target', targetCal);
    renderProgressChart();
}

function updateExerciseCard(tdee) {
    currentTDEE = tdee;
    const card = document.getElementById('exercise-card');
    if (card) {
        card.style.display = 'block';
        renderExerciseLog();
    }
}

// ====== Weight Tracking ======
function logWeight() {
    const input = document.getElementById('weight-log-input');
    const val = parseFloat(input.value);
    if (isNaN(val) || val < 30 || val > 300) {
        input.classList.add('error');
        setTimeout(() => { input.classList.remove('error'); }, 1500);
        return;
    }
    const logs = JSON.parse(localStorage.getItem('caloriecoach-weight-logs') || '[]');
    const today = new Date().toDateString();
    let existingIdx = -1;
    for (let wi = 0; wi < logs.length; wi++) {
        if (new Date(logs[wi].date).toDateString() === today) {
            existingIdx = wi;
            break;
        }
    }
    const entry = { date: new Date().toISOString(), weight: val };
    if (existingIdx > -1) {
        logs[existingIdx] = entry;
    } else {
        logs.push(entry);
    }
    logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (logs.length > 100) logs.splice(0, logs.length - 100);
    localStorage.setItem('caloriecoach-weight-logs', JSON.stringify(logs));
    input.value = '';
    renderWeightChart();
}

// ====== Recipe Viewer ======
function showRecipe(foodName) {
    let recipe = foodRecipes[foodName];
    if (!recipe) {
        const keys = Object.keys(foodRecipes);
        for (let ri = 0; ri < keys.length; ri++) {
            if (foodName.toLowerCase().includes(keys[ri].toLowerCase()) || keys[ri].toLowerCase().includes(foodName.toLowerCase())) {
                recipe = foodRecipes[keys[ri]];
                break;
            }
        }
    }
    if (!recipe) {
        alert(`No recipe available for ${foodName}`);
        return;
    }

    document.getElementById('recipe-modal-title').textContent = `📖 ${foodName}`;
    document.getElementById('recipe-content').innerHTML =
        `<div style="margin-bottom:16px;display:flex;gap:16px;font-size:13px;color:var(--text-secondary);">
        <span>⏱ Prep: ${recipe.prepTime}</span>
        <span>🔥 Cook: ${recipe.cookTime}</span>
        <span>📊 Difficulty: ${recipe.difficulty}</span>
        <span>🍽 Servings: ${recipe.servings}</span>
        </div>
        <h5 style="font-size:15px;margin-bottom:10px;color:var(--accent);">🛒 Ingredients</h5>
        <ul style="list-style:none;padding:0;margin-bottom:20px;">
        ${recipe.ingredients.map(ing => {
            return `<li style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:14px;color:var(--text-primary);">• ${ing}</li>`;
        }).join('')}
        </ul>
        <h5 style="font-size:15px;margin-bottom:10px;color:var(--accent);">👨‍🍳 Instructions</h5>
        <p style="font-size:14px;line-height:1.7;color:var(--text-secondary);">${recipe.instructions}</p>`;

    openModal('recipe-modal', { label: `${foodName} recipe` });
}

function closeRecipeModal() {
    closeModal('recipe-modal');
}

function recipeLink(name) {
    return `<a href="#" onclick="showRecipe('${name.replace(/'/g, "\\'")}');return false;" style="color:var(--accent);text-decoration:none;border-bottom:1px dashed var(--accent);">${name}</a>`;
}

// ====== Shopping List ======
let shoppingListData = [];
let shoppingScale = 1;

function showShoppingList() {
    const rows = document.querySelectorAll('#diet-chart-body tr');
    const items = [];
    if (rows.length === 0) {
        alert('Please calculate your diet plan first.');
        return;
    }
    rows.forEach(row => {
        const foodLis = row.querySelectorAll('.food-list li');
        foodLis.forEach(li => {
            const link = li.querySelector('a');
            const name = link ? link.textContent.trim() : 'Unknown';
            const text = li.textContent || '';
            const gramMatch = text.match(/(\d+)\s*g\b/);
            const calMatch = text.match(/(\d+)\s*cal/);
            const proteinMatch = text.match(/P:\s*([\d.]+)g/);
            const carbsMatch = text.match(/C:\s*([\d.]+)g/);
            const fatMatch = text.match(/F:\s*([\d.]+)g/);
            if (name && name !== '') {
                items.push({
                    name,
                    grams: gramMatch ? parseInt(gramMatch[1]) : 100,
                    calories: calMatch ? parseInt(calMatch[1]) : 0,
                    protein: proteinMatch ? parseFloat(proteinMatch[1]) : 0,
                    carbs: carbsMatch ? parseFloat(carbsMatch[1]) : 0,
                    fat: fatMatch ? parseFloat(fatMatch[1]) : 0
                });
            }
        });
    });

    const consolidated = {};
    items.forEach(item => {
        const key = item.name;
        if (consolidated[key]) {
            consolidated[key].count++;
            consolidated[key].grams = Math.round((consolidated[key].grams + item.grams) / consolidated[key].count);
            consolidated[key].calories = Math.round((consolidated[key].calories + item.calories) / consolidated[key].count);
            consolidated[key].protein = (consolidated[key].protein + item.protein) / consolidated[key].count;
            consolidated[key].carbs = (consolidated[key].carbs + item.carbs) / consolidated[key].count;
            consolidated[key].fat = (consolidated[key].fat + item.fat) / consolidated[key].count;
        } else {
            consolidated[key] = { name: key, count: 1, grams: item.grams, calories: item.calories, protein: item.protein, carbs: item.carbs, fat: item.fat };
        }
    });
    shoppingListData = Object.values(consolidated);

    shoppingScale = 1;
    const slider = document.getElementById('shopping-scale-slider');
    if (slider) slider.value = 100;

    renderShoppingList();
    openModal('shopping-modal', { label: 'Shopping list' });
}

function renderShoppingList() {
    const proteinKeywords = ['chicken', 'paneer', 'tofu', 'egg', 'fish', 'salmon', 'tuna', 'turkey', 'beef', 'lamb', 'shrimp', 'tempeh', 'whey', 'protein'];
    const carbKeywords = ['rice', 'bread', 'pasta', 'oat', 'quinoa', 'potato', 'roti', 'noodle', 'wrap', 'tortilla', 'granola', 'cereal'];
    const vegKeywords = ['broccoli', 'spinach', 'carrot', 'tomato', 'cucumber', 'pepper', 'onion', 'cauliflower', 'mushroom', 'zucchini', 'cabbage', 'lettuce', 'salad', 'kale'];
    const fruitKeywords = ['apple', 'banana', 'orange', 'mango', 'grape', 'berry', 'strawberry', 'blueberry', 'papaya', 'pineapple', 'pomegranate', 'guava', 'melon'];
    const dairyKeywords = ['milk', 'yogurt', 'cheese', 'butter', 'cream', 'cottage'];

    const categorize = (itemName) => {
        const n = itemName.toLowerCase();
        if (proteinKeywords.some(k => n.includes(k))) return '🥩 Protein';
        if (dairyKeywords.some(k => n.includes(k))) return '🧀 Dairy';
        if (carbKeywords.some(k => n.includes(k))) return '🍚 Carbs';
        if (vegKeywords.some(k => n.includes(k))) return '🥦 Vegetables';
        if (fruitKeywords.some(k => n.includes(k))) return '🍎 Fruits';
        return '🍽️ Other';
    };

    const categorized = {};
    shoppingListData.forEach(item => {
        const cat = categorize(item.name);
        if (!categorized[cat]) categorized[cat] = [];
        categorized[cat].push(item);
    });

    const catOrder = ['🥩 Protein', '🍚 Carbs', '🥦 Vegetables', '🍎 Fruits', '🧀 Dairy', '🍽️ Other'];
    let html = '';
    const savedChecks = JSON.parse(localStorage.getItem('caloriecoach-shopping-checks') || '{}');
    catOrder.forEach(cat => {
        if (!categorized[cat] || categorized[cat].length === 0) return;
        html += `<div class="shopping-list-category">${cat} <span class="shopping-cat-count">${categorized[cat].length}</span></div>`;
        categorized[cat].forEach(item => {
            const key = encodeURIComponent(item.name);
            const checked = savedChecks[key] ? 'checked' : '';
            const s = shoppingScale;
            const scaledGrams = Math.round(item.grams * s);
            const scaledCal = Math.round(item.calories * s);
            const scaledP = (item.protein * s).toFixed(1);
            const scaledC = (item.carbs * s).toFixed(1);
            const scaledF = (item.fat * s).toFixed(1);
            html += `<div class="shopping-list-item ${checked ? 'checked' : ''}">
                <input type="checkbox" ${checked} onchange="toggleShoppingCheck('${key}',this)">
                <div class="shopping-item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">${scaledGrams}g · ${scaledCal} cal · P:${scaledP}g C:${scaledC}g F:${scaledF}g</span>
                </div>
                <div class="shopping-item-controls">
                    <button class="shopping-qty-btn" onclick="adjustItemQty('${key}',-1)" title="Decrease">−</button>
                    <span class="shopping-qty-value">${item.count}</span>
                    <button class="shopping-qty-btn" onclick="adjustItemQty('${key}',1)" title="Increase">+</button>
                </div>
                </div>`;
        });
    });
    document.getElementById('shopping-list-items').innerHTML = html;
    updateShoppingSummary();
}

function updateShoppingSummary() {
    const summary = document.getElementById('shopping-summary');
    if (!summary) return;
    const totalItems = shoppingListData.reduce((s, i) => s + i.count, 0);
    const totalCal = Math.round(shoppingListData.reduce((s, i) => s + i.calories * i.count * shoppingScale, 0));
    const totalP = shoppingListData.reduce((s, i) => s + i.protein * i.count * shoppingScale, 0).toFixed(1);
    const totalC = shoppingListData.reduce((s, i) => s + i.carbs * i.count * shoppingScale, 0).toFixed(1);
    const totalF = shoppingListData.reduce((s, i) => s + i.fat * i.count * shoppingScale, 0).toFixed(1);
    summary.innerHTML = `
        <div class="shopping-summary-row">
            <span>📦 <strong>${totalItems}</strong> items</span>
            <span>🔥 <strong>${totalCal}</strong> cal</span>
            <span>🥩 P: <strong>${totalP}g</strong></span>
            <span>🍚 C: <strong>${totalC}g</strong></span>
            <span>🥑 F: <strong>${totalF}g</strong></span>
        </div>`;
}

function adjustItemQty(key, delta) {
    const name = decodeURIComponent(key);
    const item = shoppingListData.find(i => i.name === name);
    if (!item) return;
    item.count = Math.max(1, item.count + delta);
    renderShoppingList();
}

function updateShoppingScale() {
    const slider = document.getElementById('shopping-scale-slider');
    if (!slider) return;
    shoppingScale = slider.value / 100;
    const display = document.getElementById('shopping-scale-value');
    if (display) display.textContent = shoppingScale.toFixed(1) + 'x';
    renderShoppingList();
}

function closeShoppingList() {
    closeModal('shopping-modal');
}

function toggleShoppingCheck(key, el) {
    const checks = JSON.parse(localStorage.getItem('caloriecoach-shopping-checks') || '{}');
    checks[key] = el.checked;
    localStorage.setItem('caloriecoach-shopping-checks', JSON.stringify(checks));
    el.closest('.shopping-list-item').classList.toggle('checked', el.checked);
}

function clearShoppingChecks() {
    localStorage.setItem('caloriecoach-shopping-checks', '{}');
    document.querySelectorAll('#shopping-list-items input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        cb.closest('.shopping-list-item').classList.remove('checked');
    });
}

// ====== Export PDF ======
function exportPDF() {
    const printContents = document.getElementById('results').innerHTML;
    const style = document.querySelector('style').innerHTML;
    const fonts = document.querySelector('link[href*="fonts.googleapis.com"]') ? document.querySelector('link[href*="fonts.googleapis.com"]').outerHTML : '';
    const win = window.open('', '_blank');
    win.document.write('<html><head><title>CalorieCoach - Diet Plan</title>');
    win.document.write(fonts);
    win.document.write(`<style>${style}</style>`);
    win.document.write(`<style>
        body { background: #fff; color: #111; padding: 40px; font-family: "DM Sans", sans-serif; }
        .hero, header, footer, .about-section, .food-selection-panel, .diet-plan-choice, .export-bar, .water-tracker, .loading, .skip-link, .mobile-nav, .mobile-nav-overlay, .hamburger, .theme-toggle, .history-section, .btn-calculate, .calorie-warning { display: none !important; }
        .results { display: block !important; padding: 0 !important; }
        .result-card, .macro-card, .diet-chart { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #111 !important; }
        .result-card-value, .result-card-value.calories { color: #00b894 !important; -webkit-text-fill-color: #00b894 !important; }
        .result-card-sublabel, .result-card-label, .macro-info h4 { color: #666 !important; }
        .macro-info .value { color: #111 !important; }
        h1, h2, h3, h4 { color: #111 !important; }
        .diet-chart-table th { background: #00b894 !important; color: #fff !important; }
        .diet-chart-table td { border-bottom: 1px solid #ddd !important; color: #333 !important; }
        .meal-time { color: #00b894 !important; }
        .goal-badge { background: #00b894 !important; color: #fff !important; }
        .water-card { background: #f5f5f5 !important; border: 1px solid #ddd !important; }
        .water-info .value { color: #00b4d8 !important; -webkit-text-fill-color: #00b4d8 !important; }
        </style></head><body>`);
    win.document.write(`<div style="text-align:center;margin-bottom:30px;border-bottom:2px solid #00b894;padding-bottom:20px;">
        <h1 style="font-family: Outfit, sans-serif;font-size:28px;color:#00b894;">CalorieCoach Diet Plan</h1>
        <p style="color:#666;">Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>`);
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
}

// ====== Micronutrient Tracking ======
function calculateMicronutrients() {
    const totals = { fiber: 0, iron: 0, calcium: 0, vitC: 0, vitA: 0 };
    const allMeals = Object.values(selectedFoodsByMeal);
    allMeals.forEach(meal => {
        meal.forEach(food => {
            const micro = foodMicronutrients[food.name];
            if (micro) {
                totals.fiber += micro.fiber || 0;
                totals.iron += micro.iron || 0;
                totals.calcium += micro.calcium || 0;
                totals.vitC += micro.vitC || 0;
                totals.vitA += micro.vitA || 0;
            }
        });
    });
    return totals;
}

function renderMicros(totals) {
    const targets = { fiber: 30, iron: 18, calcium: 1000, vitC: 90, vitA: 900 };
    const labels = { fiber: 'Fiber', iron: 'Iron', calcium: 'Calcium', vitC: 'Vitamin C', vitA: 'Vitamin A' };
    const units = { fiber: 'g', iron: 'mg', calcium: 'mg', vitC: 'mg', vitA: 'mcg' };
    const card = document.getElementById('micro-card');
    if (!card) return;
    card.innerHTML = '<h5 style="font-size:15px;margin-bottom:12px;color:var(--accent);">🧪 Micronutrient Analysis</h5>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;">' +
        Object.keys(targets).map(key => {
            const val = totals[key] || 0;
            const target = targets[key];
            const pct = Math.min(Math.round((val / target) * 100), 100);
            const color = pct >= 80 ? 'var(--accent)' : pct >= 50 ? 'var(--warning)' : 'var(--coral)';
            return `<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px;text-align:center;">
                <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;">${labels[key]}</div>
                <div style="font-size:22px;font-weight:700;color:${color};">${val.toFixed(1)}<span style="font-size:12px;">/${target}${units[key]}</span></div>
                <div style="font-size:12px;color:var(--text-secondary);">${pct}% of target</div>
            </div>`;
        }).join('') + '</div>';
}

function toggleMicros() {
    microsVisible = !microsVisible;
    const card = document.getElementById('micro-card');
    if (microsVisible) {
        card.style.display = 'block';
        const totals = calculateMicronutrients();
        renderMicros(totals);
    } else {
        card.style.display = 'none';
    }
}

// ====== Data Backup & Restore ======
function exportBackup() {
    const data = {};
    backupKeys.forEach(key => {
        const val = localStorage.getItem(key);
        if (val) data[key] = JSON.parse(val);
    });
    data._exportedAt = new Date().toISOString();
    data._version = 1;

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `caloriecoach-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data || typeof data !== 'object') throw new Error('Invalid format');
            let count = 0;
            backupKeys.forEach(key => {
                if (data[key] !== undefined) {
                    localStorage.setItem(key, JSON.stringify(data[key]));
                    count++;
                }
            });
            alert(`Restored ${count} data entries successfully! The page will now reload.`);
            event.target.value = '';
            location.reload();
        } catch (err) {
            alert(`Failed to restore backup: ${err.message}`);
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}

// ====== Shopping & Recipe Helpers ======
function copyShoppingList() {
    const items = document.querySelectorAll('#shopping-list-items .shopping-list-item');
    if (items.length === 0) return;
    let text = '🛒 Shopping List\n';
    text += '━━━━━━━━━━━━━━━━━━\n';
    let currentCat = '';
    document.querySelectorAll('#shopping-list-items .shopping-list-category, #shopping-list-items .shopping-list-item').forEach(el => {
        if (el.classList.contains('shopping-list-category')) {
            currentCat = el.textContent.replace(/\d+$/, '').trim();
            text += `\n${currentCat}\n`;
        } else {
            const cb = el.querySelector('input[type="checkbox"]');
            const mark = cb && cb.checked ? '☑' : '☐';
            const name = el.querySelector('.item-name');
            const qty = el.querySelector('.item-qty');
            const controls = el.querySelector('.shopping-qty-value');
            const count = controls ? controls.textContent : '1';
            if (name) {
                text += `${mark} ${name.textContent.trim()} ×${count} — ${qty ? qty.textContent.trim() : ''}\n`;
            }
        }
    });
    text += '\n━━━━━━━━━━━━━━━━━━\nGenerated by CalorieCoach';
    copyToClipboard(text);
}

function printRecipe() {
    const content = document.getElementById('recipe-content');
    if (!content || !content.innerHTML.trim()) return;
    const title = document.getElementById('recipe-modal-title').textContent;
    const w = window.open('', '', 'width=800,height=600');
    w.document.write(`<html><head><title>${title}</title>`);
    w.document.write('<style>body{font-family:system-ui,sans-serif;padding:40px;line-height:1.6;max-width:700px;margin:auto}');
    w.document.write('h1{font-size:24px;margin-bottom:8px}h2{font-size:18px;margin-top:24px;margin-bottom:8px}');
    w.document.write('ul{padding-left:20px}li{margin-bottom:4px}p{margin:4px 0}.recipe-meta{display:flex;gap:16px;color:#666;font-size:14px;margin-bottom:16px}');
    w.document.write('.difficulty{display:inline-block;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600;background:#e8f5e9;color:#2e7d32}');
    w.document.write('.ingredient{background:#f5f5f5;padding:4px 8px;border-radius:4px;margin:2px 4px;display:inline-block;font-size:13px}');
    w.document.write('@media print{body{padding:20px}}</style></head><body>');
    w.document.write(`<h1>${title.replace('📖 ', '')}</h1>`);
    w.document.write(`<div id="print-recipe-content">${content.innerHTML}</div>`);
    w.document.write('<p style="margin-top:40px;font-size:12px;color:#999;">Generated by CalorieCoach</p>');
    w.document.write('</body></html>');
    w.document.close();
    setTimeout(() => { w.print(); }, 500);
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            flashCopyConfirmation();
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); flashCopyConfirmation(); } catch (e) { }
    document.body.removeChild(ta);
}

function flashCopyConfirmation() {
    const el = document.createElement('div');
    el.textContent = '✓ Copied!';
    el.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--accent);color:#000;padding:12px 28px;border-radius:12px;font-weight:700;z-index:99999;animation:fadeInUp 0.3s ease;font-size:15px;';
    document.body.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s';
        setTimeout(() => { document.body.removeChild(el); }, 300);
    }, 1500);
}

// ====== Progress Dashboard ======
let progressDashboardOpen = false;

function toggleProgressDashboard() {
    const panel = document.getElementById('progress-panel');
    const arrow = document.getElementById('progress-arrow');
    if (!panel || !arrow) return;
    progressDashboardOpen = !progressDashboardOpen;
    panel.style.display = progressDashboardOpen ? 'block' : 'none';
    arrow.style.transform = progressDashboardOpen ? 'rotate(180deg)' : '';
    if (progressDashboardOpen) renderIntakeLogList();
}

function logIntake() {
    const cal = parseFloat(document.getElementById('intake-calories').value);
    const pro = parseFloat(document.getElementById('intake-protein').value);
    const carbs = parseFloat(document.getElementById('intake-carbs').value);
    const fat = parseFloat(document.getElementById('intake-fat').value);
    if (isNaN(cal) || isNaN(pro) || isNaN(carbs) || isNaN(fat)) {
        alert('Please fill in all intake fields.');
        return;
    }
    const logs = JSON.parse(localStorage.getItem('caloriecoach-intake-logs') || '[]');
    const today = new Date().toISOString().slice(0, 10);
    const existingIdx = logs.findIndex(l => l.date === today);
    const entry = { date: today, calories: cal, protein: pro, carbs: carbs, fat: fat, timestamp: Date.now() };
    if (existingIdx > -1) {
        logs[existingIdx] = entry;
    } else {
        logs.push(entry);
    }
    localStorage.setItem('caloriecoach-intake-logs', JSON.stringify(logs));
    renderIntakeLogList();
    renderProgressChart();
    document.getElementById('intake-calories').value = '';
    document.getElementById('intake-protein').value = '';
    document.getElementById('intake-carbs').value = '';
    document.getElementById('intake-fat').value = '';
}

function renderIntakeLogList() {
    const logs = JSON.parse(localStorage.getItem('caloriecoach-intake-logs') || '[]');
    const container = document.getElementById('intake-log-list');
    if (!container) return;
    const recent = logs.slice(-7).reverse();
    container.innerHTML = recent.length === 0
        ? '<p style="color:var(--text-secondary);font-size:13px;">No intake logged yet.</p>'
        : recent.map(log =>
            `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;">
                <span style="color:var(--text-secondary);">${log.date}</span>
                <span><strong>${log.calories}</strong> cal · P:${log.protein}g C:${log.carbs}g F:${log.fat}g</span>
            </div>`
        ).join('');
}

function getCssVar(name, fallback) {
    try { return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback; } catch (e) { return fallback; }
}

function renderProgressChart() {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    const logs = JSON.parse(localStorage.getItem('caloriecoach-intake-logs') || '[]');
    if (logs.length === 0) {
        document.getElementById('progress-chart-empty').style.display = 'block';
        canvas.style.display = 'none';
        return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const dispW = rect.width || 700, dispH = rect.height || 220;
    canvas.width = dispW * dpr;
    canvas.height = dispH * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, dispW, dispH);

    const targetCal = parseInt(localStorage.getItem('caloriecoach-last-target')) || 2000;
    const targetPro = Math.round(targetCal * 0.3 / 4);
    const targetCarbs = Math.round(targetCal * 0.4 / 4);
    const targetFat = Math.round(targetCal * 0.3 / 9);

    const byDate = {};
    logs.forEach(function(l) { byDate[l.date] = l; });
    var dates = Object.keys(byDate).sort().slice(-7);

    if (dates.length === 0) return;
    document.getElementById('progress-chart-empty').style.display = 'none';
    canvas.style.display = 'block';

    var textSecColor = getCssVar('--text-secondary', '#778DA9');
    var pad = { top: 20, bottom: 30, left: 40, right: 20 };
    var chartW = dispW - pad.left - pad.right;
    var chartH = dispH - pad.top - pad.bottom;
    var barW = chartW / (dates.length * 4);

    ctx.font = '10px DM Sans';
    ctx.textAlign = 'center';

    dates.forEach(function(date, i) {
        var log = byDate[date];
        var cal = log ? log.calories : 0;
        var x = pad.left + i * chartW / dates.length + chartW / (dates.length * 2);

        var calH = Math.min((cal / targetCal) * chartH, chartH);
        ctx.fillStyle = 'rgba(0, 245, 212, 0.7)';
        ctx.fillRect(x - barW * 1.5, pad.top + chartH - calH, barW, calH);

        var pro = log ? log.protein : 0;
        var proH = Math.min((pro / targetPro) * chartH, chartH);
        ctx.fillStyle = 'rgba(255, 107, 107, 0.7)';
        ctx.fillRect(x - barW * 0.5, pad.top + chartH - proH, barW, proH);

        var carbs = log ? log.carbs : 0;
        var carbsH = Math.min((carbs / targetCarbs) * chartH, chartH);
        ctx.fillStyle = 'rgba(255, 230, 109, 0.7)';
        ctx.fillRect(x + barW * 0.5, pad.top + chartH - carbsH, barW, carbsH);

        var fat = log ? log.fat : 0;
        var fatH = Math.min((fat / targetFat) * chartH, chartH);
        ctx.fillStyle = 'rgba(0, 245, 212, 0.3)';
        ctx.fillRect(x + barW * 1.5, pad.top + chartH - fatH, barW, fatH);

        ctx.fillStyle = textSecColor;
        ctx.fillText(date.slice(5), x, pad.top + chartH + 16);
    });

    ctx.textAlign = 'left';
    ctx.font = '11px DM Sans';
    var legendY = 12;
    ctx.fillStyle = 'rgba(0, 245, 212, 0.7)';
    ctx.fillRect(dispW - 150, legendY - 8, 10, 10);
    ctx.fillStyle = textSecColor;
    ctx.fillText('Calories', dispW - 135, legendY + 2);
    ctx.fillStyle = 'rgba(255, 107, 107, 0.7)';
    ctx.fillRect(dispW - 75, legendY - 8, 10, 10);
    ctx.fillStyle = textSecColor;
    ctx.fillText('Protein', dispW - 60, legendY + 2);
    ctx.fillStyle = 'rgba(255, 230, 109, 0.7)';
    ctx.fillRect(dispW - 150, legendY + 18, 10, 10);
    ctx.fillStyle = textSecColor;
    ctx.fillText('Carbs', dispW - 135, legendY + 28);
    ctx.fillStyle = 'rgba(0, 245, 212, 0.3)';
    ctx.fillRect(dispW - 75, legendY + 18, 10, 10);
    ctx.fillStyle = textSecColor;
    ctx.fillText('Fat', dispW - 60, legendY + 28);
}

// ====== Copy Summary (inline → dynamic) ======
function copySummary(e) {
    if (e) e.preventDefault();
    const bmr = document.getElementById('bmr-value').textContent;
    const tdee = document.getElementById('tdee-value').textContent;
    const target = document.getElementById('target-calories').textContent;
    const bmi = document.getElementById('bmi-value').textContent;
    const bmiCat = document.getElementById('bmi-category').textContent;
    const protein = document.getElementById('protein-value').textContent;
    const carbs = document.getElementById('carbs-value').textContent;
    const fat = document.getElementById('fat-value').textContent;
    const water = document.getElementById('water-value').textContent;
    const goalText = document.getElementById('goal-text').textContent;
    const dietText = document.getElementById('diet-text').textContent;
    const text = `📋 CalorieCoach Summary\n${'─'.repeat(30)}\n\n` +
        `Goal: ${goalText} · ${dietText}\n` +
        `🔥 BMR: ${bmr} kcal\n` +
        `⚡ TDEE: ${tdee} kcal\n` +
        `🎯 Target: ${target} kcal\n` +
        `⚖️ BMI: ${bmi} (${bmiCat})\n` +
        `\nMacros:\n` +
        `🥩 Protein: ${protein}\n` +
        `🍚 Carbs: ${carbs}\n` +
        `🥑 Fat: ${fat}\n` +
        `\n💧 Water: ${water}\n` +
        `\n${'─'.repeat(30)}\nGenerated by CalorieCoach`;
    copyToClipboard(text);
}

// ====== Module Export ======
window.UI = {
    toggleWeightUnit, toggleHeightUnit, getWeightInKg, getHeightInCm,
    saveToHistory, loadHistory, renderHistory,
    getMealConfig, loadMealSchedule, saveMealSchedule,
    toggleScheduleEditor, renderScheduleEditor, saveScheduleName, saveScheduleTime,
    validateForm, calculate,
    showAddFoodForm, hideAddFoodForm, saveCustomFood, deleteCustomFood,
    openFoodQuantityModal, closeFoodQuantityModal, updateQuantityPreview, confirmFoodQuantity,
    initSelectedFoods, updateMealTabs, renderFoodGrid, selectMealTab, toggleFood, removeFood, renderSelectedFoods,
    filterByCategory, filterFoods, selectDietPlan,
    showFoodPreferences, toggleFoodPreference, closeFoodPreferences,
    confirmFoodPreferences, skipFoodPreferences,
    generateDefaultDiet, generateDietWithPreferences, applyCustomDiet,
    generateDietChart, generateWeek, showWeekDay, regenerateWeekDay,
    toggleMacroSplit, normalizeMacroSplit,
    initWaterTracker, renderWaterTracker, addWater, resetWaterTracker,
    toggleExerciseLog, logExercise, deleteExercise, renderExerciseLog, updateExerciseCard,
    logWeight,
    showRecipe, closeRecipeModal, recipeLink,
    showShoppingList, closeShoppingList, toggleShoppingCheck, clearShoppingChecks,
    renderShoppingList, updateShoppingSummary, adjustItemQty, updateShoppingScale,
    exportPDF, toggleMicros, exportBackup, importBackup,
    copyShoppingList, printRecipe, copyToClipboard, fallbackCopy, flashCopyConfirmation,
    toggleProgressDashboard, logIntake, renderIntakeLogList, renderProgressChart,
    copySummary, animateCounter, initProgressDashboard,
    getTodaysExercise, calculateMicronutrients, renderMicros
};
