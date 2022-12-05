"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookFlight = exports.getCityNames = exports.searchFlights = void 0;
const fs_1 = __importDefault(require("fs"));
const SearchResponse_1 = require("../model/SearchResponse");
const assert_1 = __importDefault(require("assert"));
const fileLocation = './src/db/data.json';
const getData = () => {
    const data = fs_1.default.readFileSync(fileLocation);
    return JSON.parse(data.toString());
};
const writeData = (data) => {
    fs_1.default.writeFileSync(fileLocation, JSON.stringify(data));
};
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
                .filter(itinerary => itinerary.availableSeats >= numberOfPassengers) });
    });
};
const searchFlights = (searchDTO) => {
    const { departure, arrival, oneWay, departureDate, returnDate, numberOfAdultPassengers, numberOfChildPassengers } = searchDTO;
    const flights = getData();
    const directFlights = flights.filter(flight => (flight.depatureDestination == departure
        && flight.arrivalDestination == arrival));
    const numberOfPassengers = numberOfAdultPassengers + numberOfChildPassengers;
    const returnFlights = oneWay
        ? []
        : flights.filter(flight => (flight.depatureDestination == arrival
            && flight.arrivalDestination == departure));
    return new SearchResponse_1.SearchResponse(filterItineraries(directFlights, departureDate, numberOfPassengers), filterItineraries(returnFlights, returnDate, numberOfPassengers));
};
exports.searchFlights = searchFlights;
const getCityNames = () => {
    return [...new Set(getData().map(flight => flight.arrivalDestination))];
};
exports.getCityNames = getCityNames;
const bookFlight = (bookDTO) => {
    const flightEquality = (flight, details) => flight.flight_id == details.flight_id;
    const flights = getData();
    const flight = flights.find(flight => flightEquality(flight, bookDTO.flightTo));
    if (!flight) {
        // fail
    }
    (0, assert_1.default)(flight);
    const itineraryEquality = (itinerary, details) => itinerary.arriveAt == details.arriveAt
        && itinerary.depatureAt == details.depatureAt;
    const itinerary = flight.itineraries.find(itinerary => itineraryEquality(itinerary, bookDTO.flightTo));
    if (!itinerary) {
        // fail
    }
    (0, assert_1.default)(itinerary);
    if (itinerary && itinerary.availableSeats < bookDTO.numberOfPassengers) {
        // fail
    }
    const newItinerary = Object.assign(Object.assign({}, itinerary), { availableSeats: itinerary.availableSeats - bookDTO.numberOfPassengers });
    const newFlight = Object.assign(Object.assign({}, flight), { itineraries: [...flight.itineraries.filter(itinerary => !itineraryEquality(itinerary, bookDTO.flightTo)), newItinerary] });
    writeData([...flights.filter(flight => !flightEquality(flight, bookDTO.flightTo)), newFlight]);
    return 1;
};
exports.bookFlight = bookFlight;
