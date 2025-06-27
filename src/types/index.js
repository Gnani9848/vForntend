
// Type definitions converted to JSDoc comments for better documentation

/**
 * @typedef {Object} User
 * @property {string} userId
 * @property {string} username
 * @property {string} name
 * @property {string} email
 * @property {'USER' | 'ADMIN'} role
 */

/**
 * @typedef {Object} Flight
 * @property {string} flightId
 * @property {string} flightNumber
 * @property {string} departureCity
 * @property {string} arrivalCity
 * @property {string} departureDate
 * @property {string} departureTime
 * @property {string} arrivalDate
 * @property {string} arrivalTime
 * @property {number} availableSeats
 * @property {number} fareAmount
 * @property {string} airline
 */

/**
 * @typedef {Object} Passenger
 * @property {string} passengerName
 * @property {number} age
 * @property {string} gender
 * @property {string} passportNumber
 */

/**
 * @typedef {Object} Booking
 * @property {string} pnr
 * @property {string} flightNumber
 * @property {string} departureCity
 * @property {string} arrivalCity
 * @property {string} departureDate
 * @property {string} departureTime
 * @property {string} arrivalDate
 * @property {string} arrivalTime
 * @property {string} bookingStatus
 * @property {number} totalFare
 * @property {number} numberOfPassengers
 * @property {Passenger[]} passengers
 * @property {string} bookingDate
 * @property {string} bookingTime
 * @property {string} userId
 * @property {string} fareClass
 */

/**
 * @typedef {Object} SearchParams
 * @property {string} departureCity
 * @property {string} arrivalCity
 * @property {string} departureDate
 * @property {number} numberOfPassengers
 * @property {string} fareClass
 * @property {number} [maxPrice]
 */

export {};
