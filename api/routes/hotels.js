import express from "express";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";

const router = express.Router();

//create
router.post("/", createHotel);

//update
router.put("/:id", updateHotel)

//delete
router.delete("/:id", deleteHotel)


//get by id
router.get("/:id", getHotel)

//Get 
router.get("/", getHotels)

export default router;