import express from 'express' // express is imported 
import connectDB from './config/database.js';
import HANDLERS from './handlers/index.js';
import errorMiddleware from './middlewares/error.js'
import { authMiddleware } from './middlewares/auth.js';
import cors from "cors";

const app = express(); 
const PORT = process.env.PORT;

connectDB(); // function called only once and loaded and execuuted

// loads middleware
app.use(express.json()); //.use() inside everthing is middleware // express.json tells server to be ready data is comming in json and give res in json

app.use(cors({
    origin: "http://localhost:5173",
    method: ["GET","POST","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(authMiddleware);

app.use("/", HANDLERS); // load all the endpoints , first endpoint is called then errors is managed by errormiddleware

app.use(errorMiddleware); //loads but nt in memory stands by for  error
app.listen(PORT, () => { //.listen is method of express
 console.log(`Server running on ${PORT}`); // it injects dynamic value in static value
});