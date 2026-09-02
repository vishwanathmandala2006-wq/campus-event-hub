const STORAGE_KEYS = ["registrations", "registeredEvents"];
const eventList = document.getElementById("event-list");
const registrationCount = document.getElementById("registration-count");

function readRegistrations() {
    for (const key of STORAGE_KEYS) {
        const stored = localStorage.getItem(key);
        if (!stored) continue;

        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return { key, records: parsed };
        } catch (error) {
            console.warn(`Unable to read ${key} from localStorage.`, error);
        }
    }

    return { key: STORAGE_KEYS[0], records: [] };
}

function getEvent(record) {
    return record.event || record.eventDetails || record;
}

function getValue(record, event, names, fallback) {
    for (const name of names) {
        if (event[name] != null) return event[name];
        if (record[name] != null) return record[name];
    }
    return fallback;
}

function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
}

function createEventCard(record, index, storageKey) {
    const event = getEvent(record);
    const eventId = getValue(record, event, ["id", "eventId"], index);
    const title = getValue(record, event, ["title", "name", "eventName"], "Campus event");
    const date = getValue(record, event, ["date", "eventDate"], "Date to be announced");
    const time = getValue(record, event, ["time", "eventTime"], "Time to be announced");
    const venue = getValue(record, event, ["venue", "location"], "Venue to be announced");
    const status = getValue(record, record, ["status", "registrationStatus"], "Registered");

    const card = document.createElement("article");
    card.className = "event-card";
    card.appendChild(createTextElement("div", "event-date", date));

    const details = document.createElement("div");
    details.className = "event-details";
    details.appendChild(createTextElement("h3", "", title));
    const facts = document.createElement("div");
    facts.className = "event-facts";
    facts.appendChild(createTextElement("span", "", time));
    facts.appendChild(createTextElement("span", "", venue));
    details.appendChild(facts);
    card.appendChild(details);

    const actions = document.createElement("div");
    actions.className = "event-actions";
    actions.appendChild(createTextElement("span", "status", status));
    const cancelButton = createTextElement("button", "cancel-button", "Cancel registration");
    cancelButton.type = "button";
    cancelButton.addEventListener("click", () => cancelRegistration(record, eventId, storageKey));
    actions.appendChild(cancelButton);
    card.appendChild(actions);

    return card;
}

function cancelRegistration(record, eventId, storageKey) {
    const confirmed = window.confirm("Cancel this event registration?");
    if (!confirmed) return;

    const registrationData = readRegistrations();
    const remaining = registrationData.records.filter((item) => {
        const itemEvent = getEvent(item);
        const itemId = getValue(item, itemEvent, ["id", "eventId"], null);
        return item !== record && itemId !== eventId;
    });

    localStorage.setItem(storageKey, JSON.stringify(remaining));
    renderRegistrations();
}

function renderRegistrations() {
    const { key, records } = readRegistrations();
    eventList.replaceChildren();
    registrationCount.textContent = `${records.length} ${records.length === 1 ? "event" : "events"}`;

    if (records.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.appendChild(createTextElement("h3", "", "You haven't registered for any events yet."));
        emptyState.appendChild(createTextElement("p", "", "Explore what is happening around campus and make your next plan."));
        const browseLink = createTextElement("a", "browse-link", "Browse events");
        browseLink.href = "index.html#events";
        emptyState.appendChild(browseLink);
        eventList.appendChild(emptyState);
        return;
    }

    records.forEach((record, index) => eventList.appendChild(createEventCard(record, index, key)));
}

renderRegistrations();
