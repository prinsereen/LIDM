import express from "express";
import {
    getUserLeadeboard,
    createLeadeboard,
    updateLeadeboard
} from "../controllers/LeaderBoard.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/LeaderBoard', verifyUser, getUserLeadeboard);
router.post('/LeaderBoard',  verifyUser,  createLeadeboard); 
router.patch('/LeaderBoard/:id',  verifyUser,  updateLeadeboard); 

export default router;