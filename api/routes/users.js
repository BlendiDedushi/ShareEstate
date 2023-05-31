import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getAddress,
  sendEmail,
} from "../controllers/user.js";
import { verifyToken, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyAdmin, getUsers);

router.put("/:id", verifyAdmin, updateUser);

router.delete("/:id", verifyAdmin, deleteUser);

router.get("/:id", verifyAdmin,getUser);

router.get("/address/:id",verifyToken, getAddress);

router.post('/send-email/:estateId',verifyToken,sendEmail);


export default router;
