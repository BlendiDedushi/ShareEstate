import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";

const router = express.Router();

router.post("/:estateid", createRoom);

router.put("/:id", updateRoom);

router.delete("/:id/:estateid", deleteRoom);

router.get("/:id", getRoom);

router.get("/", getRooms);

export default router;
