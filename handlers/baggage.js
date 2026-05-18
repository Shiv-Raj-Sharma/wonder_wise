import { Router } from "express";
import { create, getAll, getOne } from "../services/baggage.js";
import { createBaggageValidator } from "../validators/baggage.js";

const BAGGAGE_ROUTER = Router();

// request methods are get = data read ,post = data write , delete, patch = specific data is modified ,   put = entire is data modified
BAGGAGE_ROUTER.post("/", createBaggageValidator, async (req, res, next) => {  // BAGGAGE_ROUTER.post("/",) 
 try{
    const baggage = await create(req.body); // create ({ name: "jacket"}) 
    res.status(201).json({ data: baggage }); 
 } catch (error) {
    next(error);
 }

});

BAGGAGE_ROUTER.get("/", async (req, res, next) => {
    try{
    const baggages = await getAll(); // create ({ name: "jacket"}) 
    res.status(200).json({ data: baggages }); 
 } catch (error) {
    next(error);
 }
});

BAGGAGE_ROUTER.get("/:id", async (req, res, next) => {
    try{
    const baggage = await getOne(req.params.id); // create ({ name: "jacket"}) 
    res.status(200).json({ data: baggage }); 
 } catch (error) {
    next(error);
 }
});

export default BAGGAGE_ROUTER;

// router file