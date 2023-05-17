import express from "express";
import {
    getFile,
    getFileById,
    createFile,
    updateFile,
    deleteFile
} from "../controllers/File.js";
import { verifyUser } from "../middleware/AuthUser.js";
import multer from "multer";
import path from "path"

const router = express.Router();


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
});

const upload = multer({ storage: storage });

router.get('/Files', verifyUser, getFile);
router.get('/Files/:id', verifyUser, getFileById);
router.post('/Files',  upload.single('file'), verifyUser,  createFile); 
router.patch('/Files/:id', verifyUser,  updateFile);
router.delete('/Files/:id', verifyUser, deleteFile);

export default router;



/* upload.single('file'), */
