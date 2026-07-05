import { Schema, model} from "mongoose";
import { hash } from "bcrypt";
import { ValidationError } from "../errors/validations.js";


const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: ( email )=>{
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },
                message: "Invalid email address",
            },
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword:{
            type: String,
            required: true,
            select: false
        }
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("validate", function () {
  if (this.password !== this.confirmPassword) {
    throw new ValidationError("Password and confirm password did not match");
  }
});

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 8);
    }
    this.confirmPassword = undefined;
});
// Ensure password is hashed on update operations as well
UserSchema.pre("findOneAndUpdate", async function () {
if (this.getUpdate().password) {
    this.getUpdate().password = await hash(this.getUpdate.password(), 8);
}    
});

const User = model("User",UserSchema);

export default User;

