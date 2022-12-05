"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDTO = void 0;
class SearchDTO {
    constructor(departure, arrival, oneWay, departureDate, returnDate, numberOfAdultPassengers, numberOfChildPassengers) {
        this.departure = departure;
        this.arrival = arrival;
        this.oneWay = oneWay;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.numberOfAdultPassengers = numberOfAdultPassengers;
        this.numberOfChildPassengers = numberOfChildPassengers;
    }
}
exports.SearchDTO = SearchDTO;
