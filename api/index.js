import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use("auth/auth", authRoute);
app.use("auth/users", usersRoute);
app.use("auth/hotels", hotelsRoute);
app.use("auth/rooms", roomsRoute);

app.listen(8900, () => {
  connect();
  console.log("Connected to backend!");
});
