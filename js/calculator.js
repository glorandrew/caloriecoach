function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
    } else if (gender === 'female') {
        return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
    } else {
        const male = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        const female = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        return Math.round((male + female) / 2);
    }
}

function calculateBMI(weight, height) {
    const heightM = height / 100;
    return (weight / (heightM * heightM)).toFixed(1);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return { text: 'Underweight', color: '#FFE66D' };
    if (bmi < 25) return { text: 'Normal', color: '#00F5D4' };
    if (bmi < 30) return { text: 'Overweight', color: '#FF6B6B' };
    return { text: 'Obese', color: '#FF6B6B' };
}

function shuffleArray(arr) {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getMacroRatios() {
    const p = parseFloat(document.getElementById('protein-pct').value) || 30;
    const c = parseFloat(document.getElementById('carbs-pct').value) || 40;
    const f = parseFloat(document.getElementById('fat-pct').value) || 30;
    const total = p + c + f;
    if (total === 0) return { protein: 0.30, carbs: 0.40, fat: 0.30 };
    return { protein: p / total, carbs: c / total, fat: f / total };
}

function calculateMealTargets(meal) {
    const cfg = getMealConfig(mealCount);
    const mealCal = Math.round((globalTargetCalories || 2000) * (cfg.dist[meal] || 0));
    const ratios = getMacroRatios();
    return {
        calories: mealCal,
        protein: Math.round((mealCal * ratios.protein) / 4),
        carbs: Math.round((mealCal * ratios.carbs) / 4),
        fat: Math.round((mealCal * ratios.fat) / 9)
    };
}

function findFoodData(name, category) {
    const foods = foodDatabaseDetailed[category] || [];
    for (let fi = 0; fi < foods.length; fi++) {
        if (foods[fi].name === name) return foods[fi];
    }
    return null;
}

window.Calculator = {
    calculateBMR, calculateBMI, getBMICategory, shuffleArray,
    getMacroRatios, calculateMealTargets, findFoodData
};
