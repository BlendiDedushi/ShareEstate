import express from 'express';
import { createReservation } from '../controllers/reservation.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//create
router.post("/",verifyToken, createReservation);


export default router;