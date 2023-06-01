import express from "express";
import {
  createEstate,
  deleteEstate,
  getEstate,
  getEstates,
  updateEstate,
  getEstatesByCityName,
} from "../controllers/estate.js";
import { verifyAdmin, verifyAgent, verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

//create
router.post("/", verifyAgent , createEstate);

//update
router.put("/:id",verifyAgent, updateEstate);

//delete
router.delete("/:id",verifyAgent, deleteEstate);

//get by id
router.get("/:id", getEstate);

//Get
router.get("/", getEstates);

// Get estates by city name
router.get("/city/:cityName", getEstatesByCityName);

export default router;
