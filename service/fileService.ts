import fs from "fs";
import { CreatedBooking } from "../models/CreatedBooking";
import { Flight } from "../models/Flight";

const flightFileLocation = "./src/data/flightData.json";
const bookingFileLocation = "./src/data/bookingData.json";

const getFlights = (): Flight[] => {
  return read(flightFileLocation);
};

const getBookings = (): CreatedBooking[] => {
  return read(bookingFileLocation);
};

const addBooking = (data: CreatedBooking) => {
  const bookings = read(bookingFileLocation);
  write([...bookings, data], bookingFileLocation);
};

const writeFlights = (data: Flight[]) => {
  write(data, flightFileLocation);
};

const read = (location: string): any[] => {
  try {
    const data = fs.readFileSync(location);
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
};

const write = (data: any[], location: string) => {
  fs.writeFileSync(location, JSON.stringify(data, null, 2));
};

export { getFlights, writeFlights, addBooking, getBookings };
