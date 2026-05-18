export class NotFoundError extends Error{
    constructor(message = "Resource not found"){
        super(message);
        this.name = "Not Found Error";
        this.status = 404;
    }
}