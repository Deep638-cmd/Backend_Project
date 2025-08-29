import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URL,{});
const db=mongoose.connection;
db.on("connected",()=>{
    console.log(`Connect with Database`);
})
db.on("disconnected",()=>{
   console.log(`DisConnect with Database`);
})
export default db;