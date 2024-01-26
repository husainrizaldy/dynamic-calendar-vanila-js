document.addEventListener("DOMContentLoaded", function () {
    const calendarGrid = document.getElementById("calendarGrid");
    const prevMonthBtn = document.getElementById("prevMonthBtn");
    const nextMonthBtn = document.getElementById("nextMonthBtn");
    const monthYearElement = document.getElementById("monthYear");
    const selectYear = document.getElementById("selectYear");
    const selectMonth = document.getElementById("selectMonth");

    let selectedDay = null;
    let currentYear = null;
    let currentMonth = null;

    function initialize() {
        const currentDate = new Date();
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        renderCalendar();
        populateYearDropdown();
        populateMonthDropdown();
    }

    function populateYearDropdown() {
        const currentYear = new Date().getFullYear();

        for (let year = currentYear - 10; year <= currentYear + 10; year++) {
            const option = document.createElement("option");
            option.value = year;
            option.textContent = year;
            selectYear.appendChild(option);
        }

        // Set nilai default dropdown tahun
        selectYear.value = currentYear.toString();
    }

    function handleYearChange() {
        selectMonth.disabled = false;
        currentYear = parseInt(selectYear.value); // Ubah ke integer
        currentMonth = parseInt(selectMonth.value) - 1;
        renderCalendar();
        populateMonthDropdown();
    }
    
    function populateMonthDropdown() {
        selectMonth.innerHTML = "";

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        for (let i = 0; i < months.length; i++) {
            const option = document.createElement("option");
            option.value = i + 1; // Bulan dimulai dari 1
            option.textContent = months[i];
            selectMonth.appendChild(option);
        }

        // Set nilai default dropdown bulan
        selectMonth.value = (currentMonth + 1).toString();
    }

    function handleMonthChange() {
        currentMonth = parseInt(selectMonth.value) - 1;
        renderCalendar();
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

    function renderCalendar() {
        calendarGrid.innerHTML = "";
        monthYearElement.textContent = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        createCalendarHeader();
        createCalendarBody();
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

    initialize();

    selectYear.addEventListener("change", handleYearChange);
    selectMonth.addEventListener("change", handleMonthChange);

    prevMonthBtn.addEventListener("click", () => changeMonth(-1));
    nextMonthBtn.addEventListener("click", () => changeMonth(1));
});
