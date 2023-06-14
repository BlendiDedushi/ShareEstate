import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getAddress,
  sendEmail,
  sendMessage,
} from "../controllers/user.js";
import { verifyToken, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyAdmin, deleteUser);

router.get("/:id", verifyToken ,getUser);

router.get("/address/:id",verifyToken, getAddress);

router.post('/send-email/:estateId',verifyToken,sendEmail);

router.post('/contact-user/:userId',verifyToken,sendMessage)

export default router;
