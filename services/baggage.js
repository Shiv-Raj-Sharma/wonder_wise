import { NotFoundError } from "../errors/not-found.js";
import Baggage from "../models/baggage.js";

export const create = async (data) => { 
    const baggage = await Baggage.create(data) // data =>{(name: " jacket")}
    return baggage;
}

export const getAll = async () => {
  const baggages =   await Baggage.find();
  return baggages;
}

export const getOne = async (_id) => {
    const baggage = await Baggage.findById(_id);
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

