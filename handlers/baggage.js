import { Router } from "express";
import { create, destroy, getAll, getOne, update } from "../services/baggage.js";
import { createOrUdateBaggageValidator } from "../validators/baggage.js";

const BAGGAGE_ROUTER = Router({ mergeParams: true });

// request methods are get = data read ,post = data write , delete, patch = specific data is modified ,   put = entire is data modified
BAGGAGE_ROUTER.post("/", createOrUdateBaggageValidator, async (req, res, next) => {  // BAGGAGE_ROUTER.post("/",) 
 try{
    const baggage = await create(req.body, req.user, req.params.tripId); // create ({ name: "jacket"}) 
    res.status(201).json({ data: baggage }); 
 } catch (error) {
    next(error);
 }

});

BAGGAGE_ROUTER.get("/", async (req, res, next) => {
    try{
    const baggages = await getAll(req.user, req.params.tripId); // create ({ name: "jacket"}) 
    res.status(200).json({ data: baggages }); 
 } catch (error) {
    next(error);
 }
});

BAGGAGE_ROUTER.get("/:id", async (req, res, next) => {
    try{
    const baggage = await getOne(req.params.id, req.user. req.params.tripId); // create ({ name: "jacket"}) 
    res.status(200).json({ data: baggage }); 
 } catch (error) {
    next(error);
 }
});

BAGGAGE_ROUTER.patch("/:id", createOrUdateBaggageValidator, async (req, res, next) => {
   try {
      const baggage = await update(req.params.id, req.body, req.user, req.params.tripId);
      res.status(200).json({data: baggage});
   } catch (error) {
      next(error);
   }
});

BAGGAGE_ROUTER.delete("/:id", async (req, res, next) => {
   try {
      const baggage = await destroy(req.params.id, req.user, req.params.tripId);
      res.status(200).json({data: baggage});
   } catch (error) {
      next(error);
   }
});

export default BAGGAGE_ROUTER;

// router file