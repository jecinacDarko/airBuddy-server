import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchFlights, getCityNames } from "./service/flightService";
import { bookFlight, getBooking } from "./service/bookingService";

dotenv.config();

const app: Express = express();
const port = 4321;

app.use(express.json());
app.use(cors());

app.get("/cities", (_, res: Response) => res.send(getCityNames()));

app.post("/flights/search", (req: Request, res: Response) =>
  res.send(searchFlights(req.body))
);

app.post("/booking", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(bookFlight(req.body));
  } catch (error) {
    next(error);
  }
});

app.get("/booking/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(getBooking(req.params.id));
  } catch (error) {
    next(error);
  }
});

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send(error.message);
};

app.use(errorHandler);

app.listen(port, () => console.log("server running on port: ", port));
