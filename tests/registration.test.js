const test = require('node:test');
const assert = require('node:assert/strict');

const { validateRegistration, eventOptions } = require('../js/registration.js');

test('event options include the existing Campus Event Hub events', () => {
  assert.deepEqual(eventOptions, [
    'CodeSprint 2026',
    'Campus Fest',
    'Inter-College Sports Meet'
  ]);
});

test('valid registration data passes validation', () => {
  const result = validateRegistration({
    name: 'Rahul',
    email: 'rahul@example.com',
    phone: '9876543210',
    department: 'Computer Science',
    year: '2nd Year',
    event: 'CodeSprint 2026'
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('invalid email is rejected', () => {
  const result = validateRegistration({
    name: 'Rahul',
    email: 'rahul-at-example.com',
    phone: '9876543210',
    department: 'Computer Science',
    year: '2nd Year',
    event: 'CodeSprint 2026'
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.email, 'Please enter a valid email address.');
});
