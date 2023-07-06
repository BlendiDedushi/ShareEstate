import express from 'express';
import { createReservation } from '../controllers/reservation.js';
import { processPayment } from '../controllers/payment.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post("/",verifyToken, createReservation);
router.post("/payments",verifyToken,processPayment);



export default router;