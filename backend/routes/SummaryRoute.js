import express from "express";
import {
    getSummary,
    getSummaryById,
    createSummary,
} from "../controllers/Summary.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/Summary', verifyUser, getSummary);
router.get('/Summary/:id', verifyUser, getSummaryById);
router.post('/Summary',  verifyUser,  createSummary); 

export default router;