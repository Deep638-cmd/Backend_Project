import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app=express();
import mongodb from "./mongodb.js"
import cors from "cors";
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
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running and healthy!" });
});

app.use("/user",route);
app.use("/other",route1);
app.use("/service",route2)
app.use((req, res) => {
 res.status(404).json({ error: "Route not found" });
});

// Call the connectDB function here to connect to the database
mongodb();



    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });

export default app;