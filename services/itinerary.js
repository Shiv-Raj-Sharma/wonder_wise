import Itinerary from "../models/itinerary.js";
import { ValidationError } from "../errors/validations.js";

export const createItinerary = async (data, tripId, userId) => {
    const trip = await getTrip(tripId, userId);
    
    if (
        new Date(date.date) > new Date(trip.starDate) ||
        new Date(date.date) > new Date(endDate)
    ) {
        throw new ValidationError("Itinerary date must ")
    }
}

