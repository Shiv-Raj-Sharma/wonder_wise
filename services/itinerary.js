import Itinerary from "../models/itinerary.js";
import { ValidationError } from "../errors/validations.js";
import { getOne as getTrip} from "./trip.js"

export const createItinerary = async (data, tripId, userId) => {
    const trip = await getTrip(tripId, userId);
    
    if (
        new Date(data.date) < new Date(trip.starDate) ||
        new Date(data.date) > new Date(trip.endDate)
    ) {
        throw new ValidationError("Itinerary date  must be within the trip dates ");
    }

    const itinerary = await Itinerary.create({...data, trip:tripId});
    return itinerary;
};

export const getAll = async (tripId, userId) => {
    await getTrip(tripId, userId);
    const itineraries = await Itinerary.find({ trip: tripId});
    return itineraries;
};

export const getOne = async (id, userId, tripId) => {
    console.log("iId",id);
    console.log("uId",userId);
    console.log("tripId",tripId);
    await getTrip(tripId, userId);
    const itinerary = await Itinerary.findById(id);
    if(!itinerary){
        throw new NotFoundError("Itinerary not found")
    }
    return itinerary;
};

export const update = async (id, userId, tripId, data) => {
    const trip = await getTrip(userId, tripId);

    if(
        new Date(intineraryData.date) > new Date(trip.starDate) ||
        new Date(intineraryData.date) < new Date(trip.endDate)
    ) {
        throw new ValidationError("Itinerary date must be within the trip date");
    }
    
    const itinerary = await Itinerary.findOneAndUpdate(
        {
            _id: id, trip: tripId
        }, 
        data,
        {
            returnDocument: 'after',
        }
    );

    if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }

  return itinerary;

};

export const destroy = async (id, userId, tripId) => {
    await getTrip(tripId, userId);
    const itinerary = await Itinerary.findOneAndDelete({_id: id, trip: tripId});
    if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }
  return itinerary;
};