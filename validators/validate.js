import { validationResult } from "express-validator";
import { ValidationError } from "../errors/validations.js";

/** 
 * Validate the request body using express-validator
 * this middlware checks validation after validators have run
 
 */
export const validate = (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next( new ValidationError("validation error" , errors.array()));
    }
    next();
};