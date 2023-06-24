import express from "express";
import {
    getUserLeadeboard,
    updateLeadeboard
} from "../controllers/LeaderBoard.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/LeaderBoard', verifyUser, getUserLeadeboard);
router.post('/LeaderBoard',  updateLeadeboard); 

export default router;