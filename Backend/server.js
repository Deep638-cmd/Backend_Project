import express from "express"

const app=express();
import mongodb from "./mongodb.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port =process.env.PORT || 8080
import route from "./Routers/UserRouter.js" 
import route1 from "./Routers/NormalRouter.js"
import route2 from "./Routers/ServiceRouter.js"

app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL,"http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use("/user",route);
app.use("/other",route1);
app.use("/service",route2)

app.listen(port,()=>{
    console.log(`the code is running at ${port} address`);
})