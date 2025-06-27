
export interface User {
  userId: string;
  username: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface Flight {
  flightId: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  availableSeats: number;
  fareAmount: number;
  airline: string;
}

export interface Passenger {
  passengerName: string;
  age: number;
  gender: string;
  passportNumber: string;
}

export interface Booking {
  pnr: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  bookingStatus: string;
  totalFare: number;
  numberOfPassengers: number;
  passengers: Passenger[];
  bookingDate: string;
  bookingTime: string;
  userId: string;
  fareClass: string;
}

export interface SearchParams {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  numberOfPassengers: number;
  fareClass: string;
  maxPrice?: number;
}
