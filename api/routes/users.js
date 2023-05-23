import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyToken, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Get all users
router.get("/", verifyAdmin, getUsers);

// Update user
router.put("/:id", verifyAdmin, updateUser);

// Delete user
router.delete("/:id", verifyAdmin, deleteUser);

// Get user by id
router.get("/:id", verifyAdmin,getUser);


export default router;
