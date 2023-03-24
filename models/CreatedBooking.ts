import { BookingDTO } from "./BookDTO";

export class CreatedBooking {
  bookingId: string;
  booking: BookingDTO;

  constructor(bookingId: string, booking: BookingDTO) {
    this.booking = booking;
    this.bookingId = bookingId;
  }
}
