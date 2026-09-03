const eventDetailsContainer = document.getElementById('eventDetails');

function getSelectedEvent() {
    const eventId = Number(new URLSearchParams(window.location.search).get('id'));
    return events.find((event) => event.id === eventId) || events[0];
}

function renderEventDetails(event) {
    if (!eventDetailsContainer) {
        return;
    }

    eventDetailsContainer.innerHTML = `
        <div class="details-hero">
            <div>
                <p class="details-category">${event.category}</p>
                <h1 class="details-title">${event.title}</h1>
                <p class="details-description">${event.description}</p>
            </div>
            <p class="details-number" aria-hidden="true">0${event.id}</p>
        </div>
        <dl class="details-info">
            <div class="detail-item"><dt class="details-label">Date</dt><dd class="details-value">${event.date}</dd></div>
            <div class="detail-item"><dt class="details-label">Time</dt><dd class="details-value">${event.time}</dd></div>
            <div class="detail-item"><dt class="details-label">Venue</dt><dd class="details-value">${event.venue}</dd></div>
            <div class="detail-item"><dt class="details-label">Organizer</dt><dd class="details-value">${event.organizer}</dd></div>
        </dl>
        <div class="details-footer">
            <p class="seats">${event.seats} seats available</p>
            <a class="register-button" href="register.html?event=${encodeURIComponent(event.title)}">Register Now &rarr;</a>
        </div>
    `;
}

renderEventDetails(getSelectedEvent());

if (typeof module !== 'undefined') {
    module.exports = { getSelectedEvent, renderEventDetails };
}