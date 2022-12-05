import { Flight } from "./Flight";

export class SearchResponse {
    returnFlights: Flight[];
    directFlights: Flight[];

    constructor(
        directFlights: Flight[],
        returnFlights: Flight[]
    ) {
        this.directFlights = directFlights;
        this.returnFlights = returnFlights;
    }
}