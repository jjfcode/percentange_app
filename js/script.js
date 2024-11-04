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
    
    document.getElementById('result').innerHTML = `
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