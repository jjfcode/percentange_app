function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

function calculatePercentage(percent) {
    const number = document.getElementById('number').value;
    const weeks = document.getElementById('weeks').value;
    
    if (number === '' || isNaN(number)) {
        alert('Please enter a valid number');
        return;
    }
    
    const result = (number * percent) / 100;
    const total = Number(number) + result;
    const halfTotal = total / 2;
    
    document.getElementById('percentageResult').innerHTML = `
        ${percent}% of ${number} is ${result.toFixed(2)}<br>
        Total amount: ${total.toFixed(2)}<br>
        50% of total: ${halfTotal.toFixed(2)}
    `;
}

function calculateWeeks() {
    const number = document.getElementById('number').value;
    const weeks = document.getElementById('weeks').value;
    
    if (number === '' || isNaN(number)) {
        alert('Please enter a valid number');
        return;
    }
    
    if (weeks === '' || isNaN(weeks) || weeks < 1) {
        alert('Please enter a valid number of weeks');
        return;
    }
    
    const weeklyPayment = Number(number) / weeks;
    
    document.getElementById('result').innerHTML = `
        Weekly payment for ${number} over ${weeks} weeks:<br>
        ${weeks} weekly payments of ${weeklyPayment.toFixed(2)}
    `;
}

function calculateChargeDays() {
    // Get the date strings from inputs
    const startDateStr = document.getElementById('startDate').value;
    const endDateStr = document.getElementById('endDate').value;
    
    if (!startDateStr || !endDateStr) {
        alert('Please select both start and end dates');
        return;
    }

    // Create dates using the date strings and explicitly set the time to noon UTC
    const startDate = new Date(startDateStr + 'T12:00:00Z');
    const endDate = new Date(endDateStr + 'T12:00:00Z');
    
    if (endDate < startDate) {
        alert('Return date must be after start date');
        return;
    }

    // Get start and end day names using UTC methods
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const startDayName = days[startDate.getUTCDay()];
    const endDayName = days[endDate.getUTCDay()];
    
    // Calculate total days
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Calculate full weeks and remaining days
    const fullWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    
    let chargeDays = fullWeeks * 2; // Each full week is charged 2 days
    let rate = '';
    
    // Check for special cases first
    if (startDayName === 'friday' && endDayName === 'monday') {
        chargeDays = 1;
    } else if ((startDayName === 'friday' && endDayName === 'tuesday') || 
               (startDayName === 'thursday' && endDayName === 'monday') || 
               (totalDays === 3 && !['saturday', 'sunday'].includes(startDayName))) {
        chargeDays = 1.25;
    } else if ((startDayName === 'friday' && endDayName === 'wednesday') ||
               (startDayName === 'wednesday' && endDayName === 'monday') || 
               (totalDays === 4 && !['saturday', 'sunday'].includes(startDayName))) {
        chargeDays = 1.5;
    } else if ((startDayName === 'friday' && endDayName === 'thursday') ||
               (startDayName === 'tuesday' && endDayName === 'monday') || 
               (totalDays === 5 && !['saturday', 'sunday'].includes(startDayName))) {
        chargeDays = 1.75;
    } else if (startDayName === 'monday' && endDayName === 'monday') {
        chargeDays = 2;
    } else if (remainingDays > 0) {
        if (remainingDays >= 4) {
            chargeDays += 2;
        } else {
            chargeDays += 1;
        }
    }
    
    document.getElementById('result').innerHTML = `
        Total Days: ${totalDays} days<br>
        Total Weeks: ${fullWeeks}<br>
        Charge Days: ${chargeDays} days
    `;
}

function updateDateTime() {
    const now = new Date();
    
    // Update clock
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Update date
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

// Update every second
setInterval(updateDateTime, 1000);

// Initial update
updateDateTime();

function calculateDayRate(rate) {
    const resultText = document.getElementById('result').innerHTML;
    const chargeDaysMatch = resultText.match(/Charge Days: ([\d.]+) days/);
    
    if (!chargeDaysMatch) {
        alert('Please calculate charge days first');
        return;
    }
    
    const chargeDays = parseFloat(chargeDaysMatch[1]);
    let total;
    
    if (rate === 1) {
        total = chargeDays / 2;  // Divide by 2 for 1 day charge
    } else if (rate === 1.5) {
        total = (chargeDays / 2) * 1.5;  // Divide by 1.5 for 1.5 day charge
    }
    
    // Only show the original results plus one calculation
    document.getElementById('result').innerHTML = `
        Total Days: ${resultText.match(/Total Days: [\d.]+ days/)[0]}<br>
        Total Weeks: ${resultText.match(/Total Weeks: [\d.]+/)[0]}<br>
        Charge Days: ${chargeDays} days<br><br>
        Rate (${rate} day): ${total.toFixed(2)} days`;
}