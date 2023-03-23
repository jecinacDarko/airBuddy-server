import { Itinerary } from "./Itinerary";

export class Flight {
  flight_id: string;
  depatureDestination: string;
  arrivalDestination: string;
  itineraries: Itinerary[];

  constructor(
    flight_id: string,
    departureDestination: string,
    arrivalDestination: string,
    itineraries: Itinerary[]
  ) {
    this.flight_id = flight_id;
    this.depatureDestination = departureDestination;
    this.arrivalDestination = arrivalDestination;
    this.itineraries = itineraries;
  }
}
