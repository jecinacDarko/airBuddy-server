"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require();
const fileLocation = './data.json';
const getData = () => {
    fs.readFile(fileLocation, (err, data) => {
        return JSON.parse(data.toString());
    });
    return [];
};
const writeData = (data) => {
    fs.writeFile(fileLocation, JSON.stringify(data), err => {
    });
};
const searchFlights = (serchDTO) => {
};
getData();
