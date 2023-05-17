import express from "express";
import {
    getUserProfileById,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile
} from "../controllers/UserProfile.js";
import { verifyUser } from "../middleware/AuthUser.js";
/* import multer from "multer"; */
import path from "path"

const router = express.Router();

/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationPath;
        if (file.mimetype.startsWith('audio/mpeg')) {
            destinationPath = './assets/mp3s/';
        } else if (file.mimetype === 'application/pdf') {
            destinationPath = './assets/PDFs/';
        } else {
            return cb(new Error('Unsupported file type'));
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`);
    }
}); */

/* const upload = multer({ storage: storage }); */

router.get('/Profile/:id', verifyUser, getUserProfileById);
router.post('/Profile', /*  upload.single('file'),  */verifyUser,  createUserProfile); 
router.patch('/Profile/:id', verifyUser,  updateUserProfile);
router.delete('/Profile/:id', verifyUser, deleteUserProfile);

export default router;



/* upload.single('file'), */
