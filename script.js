document.getElementById("study-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Send data to the backend to save the event
    fetch('/api/add-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, date, time })
    })
    .then(response => response.json())
    .then(data => {
        // Reset form and reload calendar
        document.getElementById("study-form").reset();
        loadCalendar();
    })
    .catch(error => console.error('Error:', error));
});

// Function to load and display the calendar with events
function loadCalendar() {
    fetch('/api/get-events')
        .then(response => response.json())
        .then(events => {
            const calendarGrid = document.getElementById("calendar-grid");
            calendarGrid.innerHTML = '';  // Clear previous events

            const today = new Date();
            const currentMonth = today.getMonth();
            const currentYear = today.getFullYear();

            // Get the first day of the month and the total number of days in the month
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const totalDays = lastDay.getDate();

            // Create the calendar grid for the current month
            for (let i = 1; i <= totalDays; i++) {
                const dayDiv = document.createElement("div");
                dayDiv.innerText = i;

                // Check if there are events for this day
                const event = events.find(e => new Date(e.date).getDate() === i && new Date(e.date).getMonth() === currentMonth);
                if (event) {
                    dayDiv.style.backgroundColor = '#ffeb3b';  // Highlight day with events
                }

                // Click event to view details of the event
                dayDiv.addEventListener('click', () => showEventDetails(event));

                calendarGrid.appendChild(dayDiv);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to show event details when a day is clicked
function showEventDetails(event) {
    if (event) {
        alert(`Event: ${event.title}\nDescription: ${event.description}\nDate: ${event.date}\nTime: ${event.time}`);
    }
}

// Initial calendar load
loadCalendar();
