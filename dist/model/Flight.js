"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
class Flight {
    constructor(flight_id, departureDestination, arrivalDestination, itineraries) {
        this.flight_id = flight_id;
        this.depatureDestination = departureDestination;
        this.arrivalDestination = arrivalDestination;
        this.itineraries = itineraries;
    }
}
exports.Flight = Flight;
