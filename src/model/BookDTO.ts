import { FlightDetails } from "./FlightDetails";
import { PersonDetails } from "./PersonDetails";

export class BookingDTO {
  flightTo: FlightDetails;
  flightFrom: FlightDetails;
  childPassengers: PersonDetails[];
  adultPassengers: PersonDetails[];

  constructor(
    flightTo: FlightDetails,
    flightFrom: FlightDetails,
    childPassengers: PersonDetails[],
    adultPassengers: PersonDetails[]
  ) {
    this.flightTo = flightTo;
    this.flightFrom = flightFrom;
    this.childPassengers = childPassengers;
    this.adultPassengers = adultPassengers;
  }
}
