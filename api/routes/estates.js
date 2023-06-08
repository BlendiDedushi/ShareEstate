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

//create
router.post("/",  createEstate);

//update
router.put("/:id", updateEstate);

//delete
router.delete("/:id", deleteEstate);

//get by id
router.get("/:id", getEstate);

//Get
router.get("/", getEstates);

router.post("/:id/photos",  uploadedPhotos);


export default router;
