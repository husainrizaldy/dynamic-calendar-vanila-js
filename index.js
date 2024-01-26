document.addEventListener("DOMContentLoaded", function () {
    const calendarGrid = document.getElementById("calendarGrid");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
    const monthYearElement = document.getElementById("monthYear");

    let selectedDay = null;

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
            dayElement.classList.add("days-head");
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);

            dayElement.addEventListener("click", function () {
                selectedDay = (selectedDay === day) ? null : day;
                renderCalendar();
            });
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

            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add("today");
            }

            const date = new Date(year, month, day);
            if (selectedDay && date.getDay() === daysOfWeek.indexOf(selectedDay)) {
                dayElement.classList.add("selected");
            }

            dayElement.addEventListener("click", function () {
                const selectedDayElement = document.querySelector(".selected");
                if (selectedDayElement) {
                    selectedDayElement.classList.remove("selected");
                }

                if (!dayElement.classList.contains("selected")) {
                    dayElement.classList.add("selected");
                }

                selectedDay = null;
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

        renderCalendar();
    }

    function renderCalendar() {
        createCalendar(currentYear, currentMonth);
    }

    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    renderCalendar();

    prevMonthBtn.addEventListener("click", function () {
        changeMonth(-1);
    });

    nextMonthBtn.addEventListener("click", function () {
        changeMonth(1);
    });
});
