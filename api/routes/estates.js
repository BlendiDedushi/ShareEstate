import express from "express";
import {
  createEstate,
  deleteEstate,
  getEstate,
  getEstates,
  updateEstate,
} from "../controllers/estate.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/", createEstate);

//update
router.put("/:id",verifyAdmin, updateEstate);

//delete
router.delete("/:id",verifyAdmin, deleteEstate);

//get by id
router.get("/:id", getEstate);

//Get
router.get("/", getEstates);

export default router;
