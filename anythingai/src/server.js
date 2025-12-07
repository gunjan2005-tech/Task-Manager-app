import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/Tasks.js";
dotenv.config();

import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/Tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// DB + Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB:", mongoose.connection.name);

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
