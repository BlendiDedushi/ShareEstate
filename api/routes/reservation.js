import express from 'express';
import { createReservation } from '../controllers/reservation.js';

const router = express.Router();

//create
router.post("/", createReservation);


export default router;