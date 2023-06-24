import express from "express";
import {
    getSummary,
    getSummaryById,
    getSummaryByUser,
    createSummary,
    getPdfByFileId,
    getTotalScoreByUser
} from "../controllers/Summary.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/Summary', verifyUser, getSummary);
router.get('/Summary/:id', verifyUser, getSummaryById);
router.get('/UserSummary', verifyUser, getSummaryByUser)
router.post('/Summary',  verifyUser,  createSummary); /*  */
router.post('/getPdfbyFileId', getPdfByFileId); 
router.get('/gettotal', verifyUser, getTotalScoreByUser); 

export default router;