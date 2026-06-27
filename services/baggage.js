import { NotFoundError } from "../errors/not-found.js";
import Baggage from "../models/baggage.js";
import { getOne as getTrip } from "./trip.js";

export const create = async (data, userId, tripid ) => { 
    await getTrip(tripId, userId);
    const baggage = await Baggage.create({...data, user: userId, trip: tripId}); // data =>{(name: " jacket")}
    return baggage;
}

export const getAll = async (userId, tripId) => {
  const baggages =   await Baggage.find();
  return baggages;
}

export const getOne = async (_id, userId, tripId ) => {
    const baggage = await Baggage.findOne({_id, user:userId, });
    if (!baggage) {
        throw new NotFoundError("Baggage not found");
    }
    return baggage;
}

export const update = async (_id, data) => {
    const baggage = await Baggage.findByIdAndUpdate(_id, data, {returnDocument:"after"});
    if(!baggage) throw new NotFoundError("Baggage not found");
    return baggage;
}

export const destroy = async (_id) => {
    const baggage = await Baggage.findByIdAndDelete(_id);
    if(!baggage) throw new NotFoundError("Baggage not found");
    return baggage;
};

