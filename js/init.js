const offDays = [];

// Function
function getDateRange(dateStart, dateEnd) {
    const dates = [];
    const currentDay = new Date(dateStart + "T00:00");
    const endDay = new Date(dateEnd + "T00:00");

    while (currentDay <= endDay) {
        dates.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
    }

    return dates;
}

function isOffDay(date) {
    return offDays.some(function(offDay) {
        return offDay.getTime() == date.getTime();
    });
}

// Dates
function initStartDate() {
    const todayBtn = document.getElementById("startToday");
    const dateInput = document.getElementById("dateStart");

    todayBtn.addEventListener("change", function() {
        if (todayBtn.checked) { 
            dateInput.required = false; 
            dateInput.disabled = true;
        } else {
            dateInput.required = true;
            dateInput.disabled = false;
        }
    })
}

function countDays() {
    // Elements
    const startDateInput = document.getElementById("dateStart").value;
    const endDateInput = document.getElementById("dateEnd").value;

    const startToday = document.getElementById("startToday").checked;
    const countWeekends = document.getElementById("countWeekends").checked;
    const countOffDays = document.getElementById("countOffDays").checked;

    // Calculations
    const startTime = startToday 
        ? new Date() 
        : new Date(startDateInput + "T00:00");
    const endTime = new Date(endDateInput + "T00:00");
    startTime.setHours(0, 0, 0, 0);

    let days = 0;
    const currentDay = new Date(startTime);

    while (currentDay <= endTime) {
        const weekday = currentDay.getDay();
        const isWeekend = weekday == 0 || weekday == 6;

        if ((countWeekends || !isWeekend) 
            && (countOffDays || !isOffDay(currentDay))) 
        { days++ }

        currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
}

// Calculations
function calculateMoneyLeft(days) {
    const balance = document.getElementById("balance").value;
    const moneyLeft = balance / days;

    return moneyLeft;
}

function initCalculate() {
    const form = document.querySelector("form");
    const amount = document.getElementById("amount");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const days = countDays();
        if (days <= 0) { amount.textContent = "___"; return }

        amount.textContent = calculateMoneyLeft(days).toFixed(2);
    })
}

// Initialize
(function init() {
    offDays.push(...getDateRange("2026-11-23", "2026-11-27"));
    offDays.push("2026-12-11");
    offDays.push(...getDateRange("2026-12-21", "2027-01-18"));
    offDays.push(...getDateRange("2027-03-29", "2027-04-02"));
    offDays.push("2027-05-07");
    offDays.push("2027-01-18");

    // Initialize
    initStartDate();
    initCalculate();
})();