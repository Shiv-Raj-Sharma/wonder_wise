import { body } from "express-validator";
import { validate } from "./validate.js";

export const createOrUdateBaggageValidator = [
 body("name")
  .notEmpty()
  .withMessage("Name should not be empty")
  .trim()
  .escape(),
validate,
  
];