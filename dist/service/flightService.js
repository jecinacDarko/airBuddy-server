"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFlight = exports.getCityNames = exports.searchFlights = void 0;
const SearchResponse_1 = require("../model/SearchResponse");
const assert_1 = __importDefault(require("assert"));
const fileService_1 = require("./fileService");
const areDatesOnSameDay = (first, second) => {
    const firstActual = new Date(first);
    const secondActual = new Date(second);
    return firstActual.getFullYear() == secondActual.getFullYear()
        && firstActual.getMonth() == secondActual.getMonth()
        && firstActual.getDate() == secondActual.getDate();
};
const filterItineraries = (flights, date, numberOfPassengers) => {
    return flights.map(flight => {
        return Object.assign(Object.assign({}, flight), { itineraries: flight.itineraries.filter(itinerary => areDatesOnSameDay(itinerary.depatureAt, date))
                .filter(itinerary => itinerary.avaliableSeats >= numberOfPassengers) });
    });
};
const filterFlights = (flights, from, to) => {
    return flights.filter(flight => (flight.depatureDestination.toLowerCase() == from.toLowerCase()
        && flight.arrivalDestination.toLowerCase() == to.toLowerCase()));
};
const searchFlights = (searchDTO) => {
    const { departure, arrival, oneWay, departureDate, returnDate, numberOfAdultPassengers, numberOfChildPassengers } = searchDTO;
    const flights = (0, fileService_1.getFlights)();
    const directFlights = filterFlights(flights, departure, arrival);
    const numberOfPassengers = numberOfAdultPassengers + numberOfChildPassengers;
    const returnFlights = oneWay
        ? []
        : filterFlights(flights, arrival, departure);
    console.log(returnFlights);
    return new SearchResponse_1.SearchResponse(filterItineraries(directFlights, departureDate, numberOfPassengers), filterItineraries(returnFlights, returnDate, numberOfPassengers));
};
exports.searchFlights = searchFlights;
const getCityNames = () => {
    return [...new Set((0, fileService_1.getFlights)().map(flight => flight.arrivalDestination))];
};
exports.getCityNames = getCityNames;
const updateFlight = (details, flights, numberOfPassengers) => {
    const flight = flights.find(flight => flight.flight_id == details.flight_id);
    console.log(!flight);
    if (!flight) {
        throw new Error('Flight not found!');
    }
    (0, assert_1.default)(flight);
    const itinerary = flight.itineraries.find(itinerary => doesItineraryMatchDetails(itinerary, details));
    if (!itinerary) {
        throw new Error('Itinerary not found!');
    }
    (0, assert_1.default)(itinerary);
    if (itinerary && itinerary.avaliableSeats < numberOfPassengers) {
        throw new Error('Invalid number of seats!');
    }
    const newItinerary = Object.assign(Object.assign({}, itinerary), { avaliableSeats: itinerary.avaliableSeats - numberOfPassengers });
    return Object.assign(Object.assign({}, flight), { itineraries: [...flight.itineraries.filter(itinerary => !doesItineraryMatchDetails(itinerary, details)), newItinerary] });
};
exports.updateFlight = updateFlight;
const doesItineraryMatchDetails = (itinerary, details) => {
    return new Date(itinerary.arriveAt).valueOf() == new Date(details.arriveAt).valueOf()
        && new Date(itinerary.depatureAt).valueOf() == new Date(details.depatureAt).valueOf();
};
