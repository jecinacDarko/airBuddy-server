"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = exports.addBooking = exports.writeFlights = exports.getFlights = void 0;
const fs_1 = __importDefault(require("fs"));
const flightFileLocation = './src/data/flightData.json';
const bookingFileLocation = './src/data/bookingData.json';
const getFlights = () => {
    return read(flightFileLocation);
};
exports.getFlights = getFlights;
const getBookings = () => {
    return read(bookingFileLocation);
};
exports.getBookings = getBookings;
const addBooking = (data) => {
    const bookings = read(bookingFileLocation);
    write([...bookings, data], bookingFileLocation);
};
exports.addBooking = addBooking;
const writeFlights = (data) => {
    write(data, flightFileLocation);
};
exports.writeFlights = writeFlights;
const read = (location) => {
    try {
        const data = fs_1.default.readFileSync(location);
        return JSON.parse(data.toString());
    }
    catch (error) {
        return [];
    }
};
const write = (data, location) => {
    fs_1.default.writeFileSync(location, JSON.stringify(data, null, 2));
};
