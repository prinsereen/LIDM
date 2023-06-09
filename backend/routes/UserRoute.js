import express from "express";
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateRecomendation
} from "../controllers/Users.js"
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import multer from "multer";
import path from "path";

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationPath;
        if (file.mimetype.startsWith('image/')) {
            destinationPath = './assets/userPhotos/';
        } else {
            return cb(new Error('Unsupported file type'));
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage: storage });

router.get('/users', verifyUser, adminOnly, getUser);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/users', verifyUser, createUser);
router.patch('/users/:id', verifyUser, upload.single('user_photo'), updateUser);
router.patch('/userrec/:id', verifyUser, updateRecomendation);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);


export default router;