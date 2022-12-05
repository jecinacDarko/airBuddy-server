export class FlightDetails {
    flight_id: string;
    depatureAt: Date;
    arriveAt: Date;

    constructor(
        flight_id: string,
        depatureAt: Date,
        arriveAt: Date
    ) {
        this.flight_id = flight_id;
        this.depatureAt = depatureAt;
        this.arriveAt = arriveAt;
    }
}