export class SearchDTO {
    departure: string;
    arrival: string;
    oneWay: boolean;
    departureDate: Date; 
    returnDate: Date;
    numberOfAdultPassengers: number;
    numberOfChildPassengers: number;

    constructor (
        departure: string,
        arrival: string,
        oneWay: boolean,
        departureDate: Date, 
        returnDate: Date,
        numberOfAdultPassengers: number,
        numberOfChildPassengers: number
    ) {
        this.departure = departure;
        this.arrival = arrival;
        this.oneWay = oneWay;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.numberOfAdultPassengers = numberOfAdultPassengers;
        this.numberOfChildPassengers = numberOfChildPassengers;
    }
}