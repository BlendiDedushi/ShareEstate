import express from 'express';
import { sendMessage } from "../controllers/contact.js";
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/',verifyToken ,sendMessage);

export default router;