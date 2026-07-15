import { Router } from "express";
import BAGGAGE_ROUTER from "./baggage.js";
import USER_ROUTER from "./user.js";
import TRIP_ROUTER from "./trip.js";
import AUTH_ROUTER from "./auth.js";
import ITINERARY_ROUTER from "./itinerary.js";
import { authMiddleware } from "../middlewares/auth.js";

const HANDLERS = Router();


HANDLERS.use("/users", USER_ROUTER);
HANDLERS.use("/trips", authMiddleware,  TRIP_ROUTER);
HANDLERS.use("/auth", AUTH_ROUTER);
HANDLERS.use("/:tripId/baggages", BAGGAGE_ROUTER);
HANDLERS.use("/:tripId/itineraries", ITINERARY_ROUTER);

export default HANDLERS;