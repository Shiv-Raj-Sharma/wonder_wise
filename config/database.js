import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connect sucessfully")
    }catch (error){
        console.error("MONGODB connection error", error);
        process.exit(1);
    }
    
}
// commonjs = module.exports = connectDB
export default connectDB; // express 
