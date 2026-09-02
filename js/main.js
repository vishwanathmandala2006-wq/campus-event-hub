// =========================================
// CAMPUS EVENT HUB
// Member 1 - Event Data & Event Listing
// =========================================

const events = [
    {
        id: 1,
        title: "CodeSprint 2026",
        category: "Technology",
        date: "15 September 2026",
        time: "10:00 AM",
        venue: "Seminar Hall",
        organizer: "Computer Science Department",
        description:
            "Put your coding skills to the test in an exciting programming challenge.",
        seats: 100,
        visual: "technology"
    },

    {
        id: 2,
        title: "Campus Fest",
        category: "Cultural",
        date: "20 September 2026",
        time: "5:00 PM",
        venue: "College Auditorium",
        organizer: "Student Cultural Committee",
        description:
            "Celebrate creativity, music, dance and culture with students from across the campus.",
        seats: 300,
        visual: "cultural"
    },

    {
        id: 3,
        title: "Inter-College Sports Meet",
        category: "Sports",
        date: "25 September 2026",
        time: "9:00 AM",
        venue: "College Ground",
        organizer: "Sports Department",
        description:
            "Compete, connect and represent your college in the annual sports championship.",
        seats: 200,
        visual: "sports"
    }
];


// =========================================
// DISPLAY EVENTS
// =========================================

const eventContainer = document.getElementById("eventContainer");

function displayEvents() {

    if (!eventContainer) {
        return;
    }

    eventContainer.innerHTML = "";

    events.forEach((event) => {

        const eventCard = document.createElement("article");

        eventCard.className = "event-card";

        eventCard.innerHTML = `
            <div class="event-image ${event.visual}">

                <div class="event-visual-content">

                    <span class="event-number">
                        0${event.id}
                    </span>

                    <span class="event-category">
                        ${event.category}
                    </span>

                </div>

            </div>

            <div class="event-content">

                <div class="event-meta">
                    <span>${event.date}</span>
                    <span>${event.time}</span>
                </div>

                <h3>
                    ${event.title}
                </h3>

                <p>
                    ${event.description}
                </p>

                <div class="event-footer">

                    <span class="event-location">
                        ${event.venue}
                    </span>

                    <a href="#" class="event-button">
                        View Details →
                    </a>

                </div>

            </div>
        `;

        eventContainer.appendChild(eventCard);
    });
}


// Start displaying events
displayEvents();