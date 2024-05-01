import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const uri=process.env.MONGO_URI
const connectDB= async ()=>{
    try {
        const connectioninstance = await mongoose.connect(`${uri}/${DB_NAME}`)
        console.log(`\nMongoDB Conneced !! DB Host : ${connectioninstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connect Error",error)
process.exit(1);
    }
}

export default connectDB;