import { body } from "express-validator";
import { validate } from "./validate.js";
import { ValidationError } from "../errors/validations.js";

export const createTripValidator =[
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),
    body("startDate")
        .trim()
        .notEmpty()
        .withMessage("Start date is required")
        .isDate()
        .withMessage("Start date must be a date"),
    body("endDate")
        .trim()
        .notEmpty()
        .withMessage("End date is required")
        .isDate()
        .withMessage("End date must be a date")
        .custom((value, {req})=>{
            if (value < req.body.startDate){
                throw new ValidationError("End date must be after start date");
            }
            return true;
        }),
    body("destinations")
        .notEmpty()
        .withMessage("Destination is required")
        .isArray()
        .withMessage("Destionation must be an array")
        .custom((value)=>{
            return value.every((destination) => typeof destination === "string");
        })
        .withMessage("Destination must be an array of string"),
    body("budget.total")
        .trim()
        .notEmpty()
        .withMessage("Total budget is required")
        .isFloat("Total budget must be a positive number"),
    body("budget.expenses")
        .optional()
        .isArray()
        .withMessage("Expenses must be an array"),
    body("budget.expenses.*.name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Expense name is required"),
    body("budget.expenses.*.amount")
        .optional()
        .trim()
        .isNumeric()
        .withMessage("Expense amount must be a number"),
    validate,
];

export const updateTripValidator =[
        body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),
    body("startDate")
        .trim()
        .notEmpty()
        .withMessage("Start date is required")
        .isDate()
        .withMessage("Start date must be a date"),
    body("endDate")
        .trim()
        .notEmpty()
        .withMessage("End date is required")
        .isDate()
        .withMessage("End date must be a date")
        .custom((value, {req})=>{
            if (value < req.body.startDate){
                throw new ValidationError("End date must be after start date");
            }
            return true;
        }),
    body("destinations")
        .notEmpty()
        .withMessage("Destination is required")
        .isArray()
        .withMessage("Destionation must be an array")
        .custom((value)=>{
            return value.every((destination) => typeof destination === "string");
        })
        .withMessage("Destination must be an array of string"),
    body("budget.total")
        .trim()
        .notEmpty()
        .withMessage("Total budget is required")
        .isFloat("Total budget must be a positive number"),
    body("budget.expenses")
        .optional()
        .isArray()
        .withMessage("Expenses must be an array"),
    body("budget.expenses.*.name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Expense name is required"),
    body("budget.expenses.*.amount")
        .optional()
        .trim()
        .isNumeric()
        .withMessage("Expense amount must be a number"),
    validate,
];

