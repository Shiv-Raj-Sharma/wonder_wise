export class Unauthorized extends Error {
    constructor (message = "Invalid Credential") {
        super(message);
        this.name = "UnauthorizedError";
        this.status = 401;
    }
}