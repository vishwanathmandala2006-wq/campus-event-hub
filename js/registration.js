const eventOptions = [
    'CodeSprint 2026',
    'Campus Fest',
    'Inter-College Sports Meet'
];

const REGISTRATION_STORAGE_KEY = 'campusEventHubRegistrations';

function getStorage() {
    try {
        if (typeof localStorage === 'undefined') {
            return null;
        }
        return localStorage;
    } catch (error) {
        return null;
    }
}

function getRegistrations() {
    const storage = getStorage();
    if (!storage) {
        return [];
    }

    try {
        const savedData = storage.getItem(REGISTRATION_STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
        return [];
    }
}

function saveRegistration(registration) {
    const storage = getStorage();
    const registrations = getRegistrations();
    registrations.push(registration);

    if (storage) {
        storage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(registrations));
    }

    return registrations;
}

function validateRegistration(registration) {
    const errors = {};
    const data = {
        name: (registration.name || '').trim(),
        email: (registration.email || '').trim(),
        phone: (registration.phone || '').trim(),
        department: (registration.department || '').trim(),
        year: (registration.year || '').trim(),
        event: (registration.event || '').trim()
    };

    if (!data.name || data.name.length < 2) {
        errors.name = 'Please enter a valid student name.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailPattern.test(data.email)) {
        errors.email = 'Please enter a valid email address.';
    }

    const phoneDigits = data.phone.replace(/\D/g, '');
    if (!data.phone || phoneDigits.length < 10) {
        errors.phone = 'Please enter a valid phone number.';
    }

    if (!data.department) {
        errors.department = 'Please select your department.';
    }

    if (!data.year) {
        errors.year = 'Please select your year of study.';
    }

    if (!data.event || !eventOptions.includes(data.event)) {
        errors.event = 'Please select a valid event.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        data
    };
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName === 'name' ? 'studentName' : fieldName === 'phone' ? 'phoneNumber' : fieldName === 'event' ? 'selectedEvent' : fieldName === 'year' ? 'yearOfStudy' : fieldName);
    const errorElement = document.querySelector(`[data-error-for="${fieldName}"]`);

    if (field) {
        field.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    if (errorElement) {
        errorElement.textContent = message || '';
    }
}

function clearFieldErrors() {
    ['name', 'email', 'phone', 'department', 'year', 'event'].forEach((fieldName) => {
        showFieldError(fieldName, '');
    });
}

function showFormMessage(message, type) {
    const messageBox = document.getElementById('formMessage');
    if (!messageBox) {
        return;
    }

    messageBox.textContent = message;
    messageBox.className = `form-message ${type}`;
}

function populateEventOptions() {
    const eventSelect = document.getElementById('selectedEvent');
    if (!eventSelect) {
        return;
    }

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = 'Choose an event';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    eventSelect.appendChild(placeholderOption);

    eventOptions.forEach((eventName) => {
        const option = document.createElement('option');
        option.value = eventName;
        option.textContent = eventName;
        eventSelect.appendChild(option);
    });
}

function initializeRegistrationPage() {
    const form = document.getElementById('registrationForm');
    if (!form) {
        return;
    }

    populateEventOptions();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearFieldErrors();

        const formData = {
            name: document.getElementById('studentName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phoneNumber')?.value || '',
            department: document.getElementById('department')?.value || '',
            year: document.getElementById('yearOfStudy')?.value || '',
            event: document.getElementById('selectedEvent')?.value || ''
        };

        const result = validateRegistration(formData);

        if (!result.isValid) {
            Object.entries(result.errors).forEach(([field, message]) => {
                showFieldError(field, message);
            });

            showFormMessage('Please correct the highlighted fields and try again.', 'error');
            return;
        }

        saveRegistration(result.data);
        showFormMessage(`Registration successful! You have been registered for ${result.data.event}.`, 'success');
        form.reset();
        const selectedEvent = document.getElementById('selectedEvent');
        if (selectedEvent) {
            selectedEvent.selectedIndex = 0;
        }
    });
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeRegistrationPage);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        eventOptions,
        validateRegistration,
        getRegistrations,
        saveRegistration,
        getStorage,
        REGISTRATION_STORAGE_KEY
    };
}
