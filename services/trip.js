import Trip from "../models/trip.js";
import { NotFoundError } from "../errors/not-found.js";
import { generateAccessToken, verifyAccessToken } from "../config/jwt.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";
import sendMail from "../utils/send-mail.js";

export const create = async (data, userId) => {
   const trip = await Trip.create({...data, user: userId});
   return trip;
};

export const getAll = async (userId) => {
   const trips = await Trip.find({ $or: [{user: userId}, {collaborators: userId}],
   });
   return trips;
};

export const getOne = async (id, userId) => {
   console.log("iId",id);
    console.log("uId",userId);
   // console.log("tripId",tripId);
   const trip = await Trip.findOne({
      _id: id,
      $and: [
         {
            $or: [{user: userId}, {collaborators: userId}],
         },
      ],
   })
   .populate("collaborators", ["name", "email"])
   .populate("user", "name");
   if(!trip) throw new NotFoundError("Trip not found");
   return trip;
};

export const update = async (id, tripData, userId) => {
   const trip = await Trip.findOneAndUpdate(
      {_id: id, user: userId},
      tripData,
      {returnDocument: "after"}
   );
   if(!trip) throw new NotFoundError("Trip not found");
   return trip;
};

export const destroy = async (id, userId) => {
   const trip = await Trip.findOneAndDelete({_id: id, user: userId});
   if(!trip) throw new NotFoundError("Trip not found");
   return trip;
};

export const inviteCollaborator = async (id, userId, collaboratorEmails) => {
   const trip = await getOne (id, userId);

   if(     trip.collaborators?.some((collaborator) => collaboratorEmails.include(collaborator.email))
   ){
throw new conflictError("Collaborator already invitedd");
}

const token = await generateAccessToken({ tripId: id }, "1h");

const inviteLink = `${process.env.FRONTEND_URL}/trips/${id}/invite/accept?token=${token}`;

await sendMail(collaboratorEmails.join(","), "Invitation to join a trip", {
   link: inviteLink,
   title: trip.title,
   startDate: trip.startDate.toDateString(),
   endDate: trip.endDate.toDateString(),
   name: trip.user.name,
});

return { message: "Collaborators invited sucessfully" };

}


export const acceptInvite = async (token, userId) => {
    const decoded = verifyAccessToken(token);
    const trip = await Trip.findOne({_id: decoded.tripId}).populate("collaborators");

    if (!trip) throw new NotFoundError("Trip not found");
    if (
        trip.collaborators.come((collaborator) => collaborator._id.tostring()===userId.toSting())
     ) {
        throw new conflictError("User already a collaborato");
     }

     trip.collaborators.push(userId);
     await trip.save();

     return { message: "Invitation accepted sucessfully"};
}

// to add expense , end point is add
export const addExpense = async (tripId, expenseData, userId) => {
   const trip = await Trip.findOne({
      _id: tripId,
      $or: [{user:userId}, {collaborators: userId}],
   }); 

   if(!trip) throw new NotFoundError("Trip not found");

   trip.budget.expenses.push(expenseData);
   trip.budget.spent += expenseData.amount;
   awaittrip.save();

   return {message: "expense added sucessfully", trip}
}

export const uploadFiles = async (tripId, userId, files) => {
   const trip = await getOne(tripId, userId);

   await Promise.all(
      files.map(async (files) => {
         const result = await uploadFiles(files.path, `trips/${trip.title}_${tripId}`);
         trip.files.push({
            url: result.secure_url,
            publicId: result.public_Id,
         });
      })
   );

   await trip.save();
   return trip;
};