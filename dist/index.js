"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const flightService_1 = require("./service/flightService");
const bookingService_1 = require("./service/bookingService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 4321;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/cities', (_, res) => res.send((0, flightService_1.getCityNames)()));
app.post('/flights/search', (req, res) => res.send((0, flightService_1.searchFlights)(req.body)));
app.post('/booking', (req, res, next) => {
    try {
        res.send((0, bookingService_1.bookFlight)(req.body));
    }
    catch (error) {
        next(error);
    }
});
app.get('/booking/:id', (req, res, next) => {
    try {
        res.send((0, bookingService_1.getBooking)(req.params.id));
    }
    catch (error) {
        next(error);
    }
});
const errorHandler = (error, req, res, next) => {
    res.status(404).send(error.message);
};
app.use(errorHandler);
app.listen(port, () => console.log('server running on port: ', port));
