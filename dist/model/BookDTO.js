"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingDTO = void 0;
class BookingDTO {
    constructor(flightTo, flightFrom, childPassengers, adultPassengers) {
        this.flightTo = flightTo;
        this.flightFrom = flightFrom;
        this.childPassengers = childPassengers;
        this.adultPassengers = adultPassengers;
    }
}
exports.BookingDTO = BookingDTO;
