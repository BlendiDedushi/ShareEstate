import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";

const router = express.Router();

//create
router.post("/:estateid", createRoom);

//update
router.put("/:id", updateRoom);

//delete
router.delete("/:id/:estateid", deleteRoom);

//get by id
router.get("/:id", getRoom);

//Get
router.get("/", getRooms);

export default router;
