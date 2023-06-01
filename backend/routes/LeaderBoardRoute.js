import express from "express";
import {
    getUserLeadeboard,
    createLeadeboard,
    updateLeadeboard
} from "../controllers/LeaderBoard.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/LeaderBoard', verifyUser, getUserLeadeboard);
/* router.get('/Summary/:id', verifyUser, getSummaryById);
router.get('/UserSummary', verifyUser, getSummaryByUser) */
router.post('/LeaderBoard',  verifyUser,  createLeadeboard); 
router.patch('/LeaderBoard/:id',  verifyUser,  updateLeadeboard); 

export default router;