import { Router } from "express";
import BAGGAGE_ROUTER from "./baggage.js";

const HANDLERS = Router();

HANDLERS.use("/baggages", BAGGAGE_ROUTER); //which baggages to all 

export default HANDLERS;