document.addEventListener("DOMContentLoaded", function() {
    const calendarGrid = document.getElementById("calendarGrid");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
    const monthYearElement = document.getElementById("monthYear");

    function createCalendar(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        calendarGrid.innerHTML = "";
        monthYearElement.textContent = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Create header
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });

        // Create days
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement("div");
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = day;

            // Highlight today's date
            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add("today");
            }

            dayElement.addEventListener("click", function() {
                // Clear previous selection
                const selectedDay = document.querySelector(".selected");
                if (selectedDay) {
                    selectedDay.classList.remove("selected");
                }

                // Highlight selected date
                dayElement.classList.add("selected");
            });

            calendarGrid.appendChild(dayElement);
        }
    }

    function changeMonth(delta) {
        const currentDate = new Date();
        currentYear = currentDate.getFullYear();
        currentMonth += delta;

        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        } else if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }

        createCalendar(currentYear, currentMonth);
    }

    // Get current date
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Create calendar for the current month
    createCalendar(currentYear, currentMonth);

    // Add event listeners for buttons
    prevMonthBtn.addEventListener("click", function() {
        changeMonth(-1);
    });

    nextMonthBtn.addEventListener("click", function() {
        changeMonth(1);
    });
});
