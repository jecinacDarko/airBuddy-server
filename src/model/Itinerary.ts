import { Price } from "./Price";

export class Itinerary {
    depatureAt: Date;
    arriveAt: Date;
    avaliableSeats: number;
    prices: Price[];

    constructor(
        departureAt: Date,
        arriveAt: Date,
        availableSeats: number,
        prices: Price[],
    ) {
       this.depatureAt = departureAt;
       this.arriveAt = arriveAt;
       this.avaliableSeats = availableSeats;
       this.prices = prices;
    }
}
