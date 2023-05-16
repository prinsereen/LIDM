import express from "express";
import {
    Login,
    Me,
    logOut,
    register
} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.post('/register', register)
router.delete('/logout', logOut);


export default router;