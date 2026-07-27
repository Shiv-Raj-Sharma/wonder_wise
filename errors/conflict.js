export class ConflictError extends Error {
    constructor ( message = "Already exists" ){    
    this.name = "ConflictError";
    this.status = 409;
    }
}