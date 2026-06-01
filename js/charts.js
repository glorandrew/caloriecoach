function renderWeightChart() {
    const canvas = document.getElementById('weight-chart');
    const emptyEl = document.getElementById('weight-chart-empty');
    if (!canvas) return;
    const logs = JSON.parse(localStorage.getItem('caloriecoach-weight-logs') || '[]');
    if (logs.length < 2) {
        canvas.style.display = 'none';
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }
    canvas.style.display = 'block';
    if (emptyEl) emptyEl.style.display = 'none';

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const dispW = Math.max(rect.width, 300);
    const dispH = rect.height || 250;
    canvas.width = dispW * dpr;
    canvas.height = dispH * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, dispW, dispH);

    const weights = logs.map(function(l) { return l.weight; });
    let minW = Math.floor(Math.min.apply(null, weights) - 1);
    let maxW = Math.ceil(Math.max.apply(null, weights) + 1);
    if (minW < 30) minW = 30;
    if (maxW > 300) maxW = 300;
    if (minW >= maxW) { maxW = minW + 5; }

    var pad = { top: 20, bottom: 30, left: 50, right: 20 };
    var chartW = dispW - pad.left - pad.right;
    var chartH = dispH - pad.top - pad.bottom;

    ctx.strokeStyle = 'rgba(224,225,221,0.12)';
    ctx.lineWidth = 1;
    var gridLines = 5;
    for (var gi = 0; gi <= gridLines; gi++) {
        var y = pad.top + (chartH / gridLines) * gi;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(dispW - pad.right, y);
        ctx.stroke();

        var val = maxW - ((maxW - minW) / gridLines) * gi;
        ctx.fillStyle = 'rgba(224,225,221,0.4)';
        ctx.font = '11px DM Sans, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1) + ' kg', pad.left - 8, y + 4);
    }

    var points = logs.map(function(l, idx) {
        var x = pad.left + (idx / (logs.length - 1)) * chartW;
        var y = pad.top + ((maxW - l.weight) / (maxW - minW)) * chartH;
        return { x: x, y: y, weight: l.weight, date: new Date(l.date) };
    });

    var gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    gradient.addColorStop(0, 'rgba(0, 245, 212, 0.25)');
    gradient.addColorStop(1, 'rgba(0, 245, 212, 0.01)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var pi = 1; pi < points.length; pi++) {
        ctx.lineTo(points[pi].x, points[pi].y);
    }
    ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
    ctx.lineTo(points[0].x, pad.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (pi = 1; pi < points.length; pi++) {
        ctx.lineTo(points[pi].x, points[pi].y);
    }
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    points.forEach(function(p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00F5D4';
        ctx.fill();
        ctx.strokeStyle = '#0D1B2A';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    var labelIndices = [0];
    if (points.length > 2) labelIndices.push(Math.floor(points.length / 2));
    if (points.length > 1) labelIndices.push(points.length - 1);
    labelIndices = labelIndices.filter(function(v, i, a) { return a.indexOf(v) === i; });

    ctx.fillStyle = 'rgba(224,225,221,0.4)';
    ctx.font = '10px DM Sans, sans-serif';
    ctx.textAlign = 'center';
    labelIndices.forEach(function(idx) {
        var p = points[idx];
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var label = months[p.date.getMonth()] + ' ' + p.date.getDate();
        ctx.fillText(label, p.x, dispH - 8);
    });
}

function renderMacroBalancer() {
    const canvas = document.getElementById('macro-balancer-canvas');
    const container = document.getElementById('macro-balancer-container');
    const legend = document.getElementById('macro-balancer-legend');
    const centerPct = document.getElementById('macro-balancer-pct');
    if (!canvas || !container) return;

    const ratios = getMacroRatios();
    const targetCal = globalTargetCalories || 2000;
    const targetP = Math.round((targetCal * ratios.protein) / 4);
    const targetC = Math.round((targetCal * ratios.carbs) / 4);
    const targetF = Math.round((targetCal * ratios.fat) / 9);

    let actualP = 0, actualC = 0, actualF = 0;
    const mealKeys = Object.keys(selectedFoodsByMeal);
    mealKeys.forEach(meal => {
        (selectedFoodsByMeal[meal] || []).forEach(f => {
            actualP += f.protein || 0;
            actualC += f.carbs || 0;
            actualF += f.fat || 0;
        });
    });

    const hasFoods = actualP > 0 || actualC > 0 || actualF > 0;
    container.style.display = hasFoods ? 'flex' : 'none';
    if (!hasFoods) return;

    const actualCal = actualP * 4 + actualC * 4 + actualF * 9;
    const pctOfTarget = Math.min(Math.round((actualCal / targetCal) * 100), 200);
    centerPct.textContent = pctOfTarget + '%';

    const actualRatios = {
        protein: actualCal > 0 ? (actualP * 4) / actualCal : 0,
        carbs: actualCal > 0 ? (actualC * 4) / actualCal : 0,
        fat: actualCal > 0 ? (actualF * 9) / actualCal : 0
    };

    legend.innerHTML =
        '<div class="balancer-legend-item"><span class="balancer-dot protein-dot"></span> Protein: <strong>' + Math.round(actualP) + 'g</strong> (' + Math.round(actualRatios.protein * 100) + '%) <span style="color:var(--text-secondary);font-size:11px;">target ' + Math.round(ratios.protein * 100) + '%</span></div>' +
        '<div class="balancer-legend-item"><span class="balancer-dot carbs-dot"></span> Carbs: <strong>' + Math.round(actualC) + 'g</strong> (' + Math.round(actualRatios.carbs * 100) + '%) <span style="color:var(--text-secondary);font-size:11px;">target ' + Math.round(ratios.carbs * 100) + '%</span></div>' +
        '<div class="balancer-legend-item"><span class="balancer-dot fat-dot"></span> Fat: <strong>' + Math.round(actualF) + 'g</strong> (' + Math.round(actualRatios.fat * 100) + '%) <span style="color:var(--text-secondary);font-size:11px;">target ' + Math.round(ratios.fat * 100) + '%</span></div>' +
        '<div class="balancer-legend-item" style="border-top:1px solid rgba(255,255,255,0.08);padding-top:6px;margin-top:6px;">🔥 Total: <strong>' + Math.round(actualCal) + ' cal</strong> <span style="color:var(--text-secondary);font-size:11px;">target ' + targetCal + ' cal</span></div>';

    const dpr = window.devicePixelRatio || 1;
    const W = 200, H = 200;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H / 2;
    const outerR = 85, innerR = 55;
    ctx.clearRect(0, 0, W, H);

    const targetAngles = [ratios.protein * 360, ratios.carbs * 360, ratios.fat * 360];
    let startAngle = -Math.PI / 2;
    const targetColors = ['rgba(255,107,107,0.2)', 'rgba(255,230,109,0.2)', 'rgba(0,245,212,0.2)'];
    targetAngles.forEach((deg, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startAngle, startAngle + (deg * Math.PI / 180));
        ctx.arc(cx, cy, innerR, startAngle + (deg * Math.PI / 180), startAngle, true);
        ctx.closePath();
        ctx.fillStyle = targetColors[i];
        ctx.fill();
        startAngle += deg * Math.PI / 180;
    });

    startAngle = -Math.PI / 2;
    const actualAngles = [actualRatios.protein * 360, actualRatios.carbs * 360, actualRatios.fat * 360];
    const actualColors = ['rgba(255,107,107,0.85)', 'rgba(255,230,109,0.85)', 'rgba(0,245,212,0.85)'];
    actualAngles.forEach((deg, i) => {
        if (deg < 0.5) return;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR - 4, startAngle, startAngle + (deg * Math.PI / 180));
        ctx.arc(cx, cy, innerR + 4, startAngle + (deg * Math.PI / 180), startAngle, true);
        ctx.closePath();
        ctx.fillStyle = actualColors[i];
        ctx.fill();
        startAngle += deg * Math.PI / 180;
    });
}

function updateMacroBalancer() {
    renderMacroBalancer();
}

window.Charts = {
    renderWeightChart, renderMacroBalancer, updateMacroBalancer
};
