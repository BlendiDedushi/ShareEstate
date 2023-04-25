import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

app.get("/", (req, res)=>{
  res.send("hello first request!");
})

app.listen(8900, () => {
  connect();
  console.log("Connected to backend!");
});
