import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
const app = express();

dotenv.config();

connectDB();

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
