"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itinerary = void 0;
class Itinerary {
    constructor(departureAt, arriveAt, availableSeats, prices) {
        this.depatureAt = departureAt;
        this.arriveAt = arriveAt;
        this.avaliableSeats = availableSeats;
        this.prices = prices;
    }
}
exports.Itinerary = Itinerary;
