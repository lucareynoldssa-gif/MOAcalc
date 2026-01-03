// MOA Calculator - Metric System
// 1 MOA = 2.908 cm at 100 meters
// 1 click = 1/4 MOA

const MOA_CM_PER_100M = 2.908;
const CLICK_VALUE = 0.25; // 1/4 MOA per click

// Get DOM elements
const distanceInput = document.getElementById('distance');
const verticalOffsetInput = document.getElementById('verticalOffset');
const horizontalOffsetInput = document.getElementById('horizontalOffset');
const windSpeedInput = document.getElementById('windSpeed');

const verticalToggle = document.getElementById('verticalToggle');
const horizontalToggle = document.getElementById('horizontalToggle');

const verticalClicksEl = document.getElementById('verticalClicks');
const verticalDirectionEl = document.getElementById('verticalDirection');
const verticalResultCard = document.getElementById('verticalResult');

const horizontalClicksEl = document.getElementById('horizontalClicks');
const horizontalDirectionEl = document.getElementById('horizontalDirection');
const horizontalResultCard = document.getElementById('horizontalResult');

const moaValuesEl = document.getElementById('moaValues');
const windNoteEl = document.getElementById('windNote');

// Toggle button handlers
verticalToggle.addEventListener('click', () => {
    const currentSign = parseInt(verticalToggle.dataset.sign);
    const newSign = currentSign * -1;
    verticalToggle.dataset.sign = newSign;

    if (newSign === 1) {
        verticalToggle.textContent = 'HIGH +';
        verticalToggle.classList.remove('negative');
    } else {
        verticalToggle.textContent = 'LOW -';
        verticalToggle.classList.add('negative');
    }
    updateCalculations();
});

horizontalToggle.addEventListener('click', () => {
    const currentSign = parseInt(horizontalToggle.dataset.sign);
    const newSign = currentSign * -1;
    horizontalToggle.dataset.sign = newSign;

    if (newSign === 1) {
        horizontalToggle.textContent = 'RIGHT +';
        horizontalToggle.classList.remove('negative');
    } else {
        horizontalToggle.textContent = 'LEFT -';
        horizontalToggle.classList.add('negative');
    }
    updateCalculations();
});

// Calculate MOA from offset and distance
function calculateMOA(offsetCm, distanceMeters) {
    if (!distanceMeters || distanceMeters <= 0) {
        return 0;
    }
    // MOA = (offset_cm / distance_m) * 100 / 2.908
    return (offsetCm / distanceMeters) * 100 / MOA_CM_PER_100M;
}

// Calculate clicks from MOA
function calculateClicks(moa) {
    return Math.round(moa / CLICK_VALUE);
}

// Format direction text
function getDirection(value, axis) {
    if (value === 0) return 'No adjustment needed';

    const absValue = Math.abs(value);
    const clickText = absValue === 1 ? 'click' : 'clicks';

    if (axis === 'vertical') {
        return value > 0 ? `↓ ${absValue} ${clickText} DOWN` : `↑ ${absValue} ${clickText} UP`;
    } else {
        return value > 0 ? `← ${absValue} ${clickText} LEFT` : `→ ${absValue} ${clickText} RIGHT`;
    }
}

// Update calculations
function updateCalculations() {
    const distance = parseFloat(distanceInput.value) || 0;
    const verticalValue = parseFloat(verticalOffsetInput.value) || 0;
    const horizontalValue = parseFloat(horizontalOffsetInput.value) || 0;
    const windSpeed = parseFloat(windSpeedInput.value) || 0;

    // Apply sign from toggle buttons
    const verticalSign = parseInt(verticalToggle.dataset.sign);
    const horizontalSign = parseInt(horizontalToggle.dataset.sign);

    const verticalOffset = verticalValue * verticalSign;
    const horizontalOffset = horizontalValue * horizontalSign;

    // Show/hide wind note
    if (windSpeed > 0) {
        windNoteEl.style.display = 'block';
    } else {
        windNoteEl.style.display = 'none';
    }

    if (distance <= 0) {
        verticalClicksEl.textContent = '-- clicks';
        verticalDirectionEl.textContent = '';
        horizontalClicksEl.textContent = '-- clicks';
        horizontalDirectionEl.textContent = '';
        moaValuesEl.textContent = 'Enter distance to calculate';
        verticalResultCard.classList.remove('active');
        horizontalResultCard.classList.remove('active');
        return;
    }

    // Calculate vertical adjustment
    const verticalMOA = calculateMOA(verticalOffset, distance);
    const verticalClicks = calculateClicks(verticalMOA);

    // Calculate horizontal adjustment
    const horizontalMOA = calculateMOA(horizontalOffset, distance);
    const horizontalClicks = calculateClicks(horizontalMOA);

    // Update vertical results
    if (verticalClicks === 0) {
        verticalClicksEl.textContent = '0 clicks';
        verticalDirectionEl.textContent = 'On target';
        verticalResultCard.classList.remove('active');
    } else {
        verticalClicksEl.textContent = `${Math.abs(verticalClicks)} clicks`;
        verticalDirectionEl.textContent = getDirection(verticalClicks, 'vertical');
        verticalResultCard.classList.add('active');
    }

    // Update horizontal results
    if (horizontalClicks === 0) {
        horizontalClicksEl.textContent = '0 clicks';
        horizontalDirectionEl.textContent = 'On target';
        horizontalResultCard.classList.remove('active');
    } else {
        horizontalClicksEl.textContent = `${Math.abs(horizontalClicks)} clicks`;
        horizontalDirectionEl.textContent = getDirection(horizontalClicks, 'horizontal');
        horizontalResultCard.classList.add('active');
    }

    // Update MOA info
    const verticalMOAText = verticalMOA.toFixed(2);
    const horizontalMOAText = horizontalMOA.toFixed(2);

    let moaText = `Vertical: ${verticalMOAText} MOA<br>Horizontal: ${horizontalMOAText} MOA`;

    if (windSpeed > 0) {
        // Basic wind drift estimation (very simplified)
        // This is a rough estimate: ~1 cm drift per 10 km/h per 100m
        const windDriftCm = (windSpeed / 10) * (distance / 100);
        const windDriftMOA = calculateMOA(windDriftCm, distance);
        moaText += `<br><br>Estimated wind drift: ${windDriftCm.toFixed(1)} cm (${windDriftMOA.toFixed(2)} MOA)`;
    }

    moaValuesEl.innerHTML = moaText;
}

// Add event listeners
distanceInput.addEventListener('input', updateCalculations);
verticalOffsetInput.addEventListener('input', updateCalculations);
horizontalOffsetInput.addEventListener('input', updateCalculations);
windSpeedInput.addEventListener('input', updateCalculations);

// Initial calculation
updateCalculations();
