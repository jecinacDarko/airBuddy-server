export class Price {
    currency: string;
    adult: number;
    child: number;

    constructor(
        currency: string,
        adult: number,
        child: number
    ) {
        this.currency = currency;
        this.adult = adult;
        this.child = child;
    }
}

