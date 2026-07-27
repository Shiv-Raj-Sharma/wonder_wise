import { Router } from "express";
import { createItineraryValidator, updateItineraryValidator } from "../validators/itinerary.js";
import { createItinerary, destroy, getAll, getOne, update } from "../services/itinerary.js";


const ITINERARY_ROUTER = Router({mergeParams: true });

ITINERARY_ROUTER.post("/", createItineraryValidator, async (req, res, next) => {
    try {
        const itinerary = await createItinerary(
            req.body,
            req.params.tripId,
            req.user,
        );
        res.status(201).json(itinerary);
    } catch (error) {
        next(error);
    }
});

ITINERARY_ROUTER.get("/", async (req,res,next) => {
    try {
        const itineraries = await getAll(
            req.params.tripId,
            req.user,
        );
        res.status(200).json({data: itineraries});
    } catch (error) {
        next(error);
    }
});

ITINERARY_ROUTER.get("/:tripId/:id", async (req, res, next) => {
    try {
        const itinerary = await getOne(
            req.params.id,
            req.user,
            req.params.tripId,
        );
        res.status(200).json({data:itinerary})
    } catch (error) {
        next(error)
    }
});

ITINERARY_ROUTER.patch("/:tripId/:id", updateItineraryValidator, async (req, res, next) => {
    try {
        const itinerary = await update(
            req.params.id,
            req.params.tripId,
            req.user,
            req.body,
        );
        res.status(200).json(itinerary);
    } catch (error) {
        next(error);
    }
});

ITINERARY_ROUTER.delete("/:tripId/:id", async (req, res, next) => {
    try {
        const itinerary = await destroy(
            req.params.id,
            req.params.tripId,
            req.user,           
        );
        res.status(200).json(itinerary)
    } catch (error) {
        next(error)
    }
});

export default ITINERARY_ROUTER;