import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

const router = express.Router();

//update
router.put("/:id", updateUser);

//delete
router.delete("/:id", deleteUser);

//get by id
router.get("/:id", getUser);

//Get
router.get("/", getUsers);

export default router;
