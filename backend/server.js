import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import contactRouter from "./routes/index.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: ["https://loomage.onrender.com", "http://localhost:3000", "http://localhost:5173"],
    credentials: true
}));

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use('/api', contactRouter);
app.get("/", (req, res) => res.send("API working"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
