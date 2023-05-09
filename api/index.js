import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import estatesRoute from "./routes/estates.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import sequelize from "./connection.js";
import User from "./models/User.js";

const app = express();

dotenv.config();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MSSQL database!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  User.sync()
  .then(() => {
    console.log('User model synchronized with the database!');
  })
  .catch((error) => {
    console.error('Unable to synchronize User model:', error);
  });


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconteccted");
});

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/estates", estatesRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8900, () => {
  connect();
  console.log("Connected to backend!");
});
