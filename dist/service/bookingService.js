"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooking = exports.bookFlight = void 0;
const crypto_1 = require("crypto");
const CreatedBooking_1 = require("../model/CreatedBooking");
const fileService_1 = require("./fileService");
const flightService_1 = require("./flightService");
const bookFlight = (bookDTO) => {
    const numberOfPassengers = bookDTO.adultPassengers.length + bookDTO.childPassengers.length;
    const flights = (0, fileService_1.getFlights)();
    const updatedFlights = [(0, flightService_1.updateFlight)(bookDTO.flightTo, flights, numberOfPassengers)];
    if (bookDTO.flightFrom.flight_id) {
        updatedFlights.push((0, flightService_1.updateFlight)(bookDTO.flightFrom, flights, numberOfPassengers));
    }
    const flightIds = updatedFlights.map(flight => flight.flight_id);
    (0, fileService_1.writeFlights)([...flights.filter(flight => !flightIds.includes(flight.flight_id)), ...updatedFlights]);
    const newBooking = new CreatedBooking_1.CreatedBooking((0, crypto_1.randomUUID)(), bookDTO);
    (0, fileService_1.addBooking)(newBooking);
    return newBooking;
};
exports.bookFlight = bookFlight;
const getBooking = (id) => {
    const bookings = (0, fileService_1.getBookings)();
    const booking = bookings.find(booking => booking.bookingId === id);
    if (booking) {
        return booking;
    }
    else {
        throw new Error('Booking not found');
    }
};
exports.getBooking = getBooking;
