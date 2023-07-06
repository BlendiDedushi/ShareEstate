import express from "express";
import {
  createEstate,
  deleteEstate,
  getEstate,
  getEstates,
  updateEstate,
  uploadedPhotos,
} from "../controllers/estate.js";
import { verifyAdmin, verifyAgent, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAgent, createEstate);

router.put("/:id", updateEstate);

router.delete("/:id", deleteEstate);

router.get("/:id", getEstate);

router.get("/", getEstates);

router.post("/:id/photos",  uploadedPhotos);


export default router;
