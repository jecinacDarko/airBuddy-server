import { Flight } from "../model/Flight";
import { SearchDTO } from "../model/SearchDTO";
import { SearchResponse } from "../model/SearchResponse";
import { Itinerary } from "../model/Itinerary";
import { FlightDetails } from "../model/FlightDetails";
import { getFlights } from "./fileService";
import assert from "assert";

const areDatesOnSameDay = (first: Date, second: Date): boolean => {
  const firstActual = new Date(first);
  const secondActual = new Date(second);

  return (
    firstActual.getFullYear() == secondActual.getFullYear() &&
    firstActual.getMonth() == secondActual.getMonth() &&
    firstActual.getDate() == secondActual.getDate()
  );
};

const filterItineraries = (
  flights: Flight[],
  date: Date,
  numberOfPassengers: number
): Flight[] => {
  return flights.map((flight) => {
    return {
      ...flight,
      itineraries: flight.itineraries
        .filter((itinerary) => areDatesOnSameDay(itinerary.depatureAt, date))
        .filter((itinerary) => itinerary.avaliableSeats >= numberOfPassengers),
    };
  });
};

const filterFlights = (
  flights: Flight[],
  from: string,
  to: string
): Flight[] => {
  return flights.filter(
    (flight) =>
      flight.depatureDestination.toLowerCase() == from.toLowerCase() &&
      flight.arrivalDestination.toLowerCase() == to.toLowerCase()
  );
};

const searchFlights = (searchDTO: SearchDTO): SearchResponse => {
  const {
    departure,
    arrival,
    oneWay,
    departureDate,
    returnDate,
    numberOfAdultPassengers,
    numberOfChildPassengers,
  } = searchDTO;

  const flights: Flight[] = getFlights();
  const directFlights: Flight[] = filterFlights(flights, departure, arrival);
  const numberOfPassengers = numberOfAdultPassengers + numberOfChildPassengers;

  const returnFlights: Flight[] = oneWay
    ? []
    : filterFlights(flights, arrival, departure);

  console.log(returnFlights);

  return new SearchResponse(
    filterItineraries(directFlights, departureDate, numberOfPassengers),
    filterItineraries(returnFlights, returnDate, numberOfPassengers)
  );
};

const getCityNames = (): String[] => {
  return [...new Set(getFlights().map((flight) => flight.arrivalDestination))];
};

const updateFlight = (
  details: FlightDetails,
  flights: Flight[],
  numberOfPassengers: number
): Flight => {
  const flight = flights.find(
    (flight) => flight.flight_id == details.flight_id
  );
  console.log(!flight);

  if (!flight) {
    throw new Error("Flight not found!");
  }

  assert(flight);

  const itinerary = flight.itineraries.find((itinerary) =>
    doesItineraryMatchDetails(itinerary, details)
  );

  if (!itinerary) {
    throw new Error("Itinerary not found!");
  }

  assert(itinerary);

  if (itinerary && itinerary.avaliableSeats < numberOfPassengers) {
    throw new Error("Invalid number of seats!");
  }

  const newItinerary: Itinerary = {
    ...itinerary,
    avaliableSeats: itinerary.avaliableSeats - numberOfPassengers,
  };

  return {
    ...flight,
    itineraries: [
      ...flight.itineraries.filter(
        (itinerary) => !doesItineraryMatchDetails(itinerary, details)
      ),
      newItinerary,
    ],
  };
};

const doesItineraryMatchDetails = (
  itinerary: Itinerary,
  details: FlightDetails
): boolean => {
  return (
    new Date(itinerary.arriveAt).valueOf() ==
      new Date(details.arriveAt).valueOf() &&
    new Date(itinerary.depatureAt).valueOf() ==
      new Date(details.depatureAt).valueOf()
  );
};

export { searchFlights, getCityNames, updateFlight };