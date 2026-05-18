import { Schema, model } from "mongoose";


    const BaggageSchema = new Schema(
        {
            name:{
                type: String,
                required: true,
                trim: true, // remove spaces that are brfore and after word
            },
            completed:{
                type: Boolean,
                default:false,
            },
        },   
            {
                timestamps: true, ///records date and time and time zone
            }

    );

    const Baggage = model("Baggage", BaggageSchema); // “Create a MongoDB collection named baggage using Baggageschema.”

    export default Baggage;
