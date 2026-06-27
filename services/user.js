import { NotFoundError } from "../errors/not-found.js";
import  User from "../models/user.js";

export const create = async (data) => {
    const user = await User.create(data);
    const {password, ...userWithoutPassword} = user.toObject();
    return userWithoutPassword;
}

export const getAllUsers = async (data) => {
    const users = await User.find(data)
    return users;
}


export const getOneUser = async (_id) => {
    const user = await User.findById(_id);
    if(!user) throw new NotFoundError("user not found");
    return user;
}

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if(!user) throw new NotFoundError("user not found");
    return user;
}

export const update = async (_id, data) => {
    const user = await User.findByIdAndUpdate(_id, data, {returnDocument: 'after'});
    if(!user) throw new NotFoundError("User not found");
    return user;
}

export const destroy = async (_id) => {
    const user = await User.findByIdAndDelete(_id);
    if(!user) throw new NotFoundError("User notfound");
    return user;
}




