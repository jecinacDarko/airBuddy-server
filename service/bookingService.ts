import { randomUUID } from "crypto";
import { BookingDTO } from "../models/BookDTO";
import { CreatedBooking } from "../models/CreatedBooking";
import { Flight } from "../models/Flight";
import {
  getFlights,
  addBooking,
  writeFlights,
  getBookings,
} from "./fileService";
import { updateFlight } from "./flightService";

const bookFlight = (bookDTO: BookingDTO): CreatedBooking => {
  const numberOfPassengers =
    bookDTO.adultPassengers.length + bookDTO.childPassengers.length;
  const flights: Flight[] = getFlights();
  const updatedFlights = [
    updateFlight(bookDTO.flightTo, flights, numberOfPassengers),
  ];

  if (bookDTO.flightFrom.flight_id) {
    updatedFlights.push(
      updateFlight(bookDTO.flightFrom, flights, numberOfPassengers)
    );
  }

  const flightIds = updatedFlights.map((flight) => flight.flight_id);
  writeFlights([
    ...flights.filter((flight) => !flightIds.includes(flight.flight_id)),
    ...updatedFlights,
  ]);

  const newBooking = new CreatedBooking(randomUUID(), bookDTO);
  addBooking(newBooking);

  return newBooking;
};

const getBooking = (id: string): CreatedBooking => {
  const bookings = getBookings();

  const booking = bookings.find((booking) => booking.bookingId === id);

  if (booking) {
    return booking;
  } else {
    throw new Error("Booking not found");
  }
};

export { bookFlight, getBooking };
