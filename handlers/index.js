import { Router } from "express";
import BAGGAGE_ROUTER from "./baggage.js";
import USER_ROUTER from "./user.js";
import TRIP_ROUTER from "./trip.js";
import AUTH_ROUTER from "./auth.js";

const HANDLERS = Router();

HANDLERS.use("/baggages", BAGGAGE_ROUTER); //which baggages to all 
HANDLERS.use("/users", USER_ROUTER);
HANDLERS.use("/trips", TRIP_ROUTER);
HANDLERS.use("/auth", AUTH_ROUTER);
export default HANDLERS;