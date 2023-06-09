import express from 'express';
import { findRoommate } from '../controllers/roommatefinder.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get("/",verifyToken,findRoommate);

export default router;