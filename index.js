document.addEventListener("DOMContentLoaded", function () {
    const calendarGrid = document.getElementById("calendarGrid");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
    const monthYearElement = document.getElementById("monthYear");

    let selectedDay = null;
    let currentYear = null;
    let currentMonth = null;

    function initialize() {
        const currentDate = new Date();
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        renderCalendar();
    }

    function createCalendarHeader() {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayElement = createDayHeaderElement(day);
            calendarGrid.appendChild(dayElement);
        });
    }

    function createDayHeaderElement(content) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day-header");
        dayElement.textContent = content;
        dayElement.addEventListener("click", () => {
            selectedDay = (selectedDay === content) ? null : content;
            renderCalendar();
        });
        return dayElement;
    }

    function createCalendarBody() {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.appendChild(createEmptyDayElement());
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = createDayBodyElement(day);
            calendarGrid.appendChild(dayElement);
        }
    }

    function createEmptyDayElement() {
        const emptyDayElement = document.createElement("div");
        emptyDayElement.classList.add("empty-day");
        return emptyDayElement;
    }

    function createDayBodyElement(day) {
        const dayElement = createDayElement(day);
        addDayElementEventListeners(dayElement);
        
        // Penandaan tanggal saat ini
        const today = new Date();
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add("today");
        }

        return dayElement;
    }

    function createDayElement(content) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = content;
        return dayElement;
    }

    function addDayElementEventListeners(dayElement) {
        dayElement.addEventListener("click", () => {
            const selectedDayElement = document.querySelector(".selected");
            if (selectedDayElement) {
                selectedDayElement.classList.remove("selected");
            }

            if (!dayElement.classList.contains("selected")) {
                dayElement.classList.add("selected");
            }

            selectedDay = null;
        });
    }

    function renderCalendar() {
        calendarGrid.innerHTML = "";
        monthYearElement.textContent = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        createCalendarHeader();
        createCalendarBody();
    }

    function changeMonth(delta) {
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

    initialize();

    prevMonthBtn.addEventListener("click", () => changeMonth(-1));
    nextMonthBtn.addEventListener("click", () => changeMonth(1));
});
