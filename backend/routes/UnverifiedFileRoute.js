import express from "express";
import {
    getUnverifiedFile,
    getUnverifiedFileById,
    createUnverifiedFile,
    updateUnverifiedFile,
    deleteUnverifiedFile
} from "../controllers/UnverifiedFile.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationPath;
        // Check the file MIME type
        if (file.mimetype.startsWith('image/')) {
            destinationPath = './assets/photos/';
        } else if (file.mimetype === 'application/pdf') {
            destinationPath = './assets/PDFs/';
        } else {
            return cb(new Error('Unsupported file type'));
        }
        cb(null, destinationPath);
    },
    filname: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({storage : storage});

const router = express.Router();

router.get('/UnverifiedFiles', getUnverifiedFile);
router.get('/UnverifiedFiles/:id', getUnverifiedFileById);
router.post('/UnverifiedFiles', createUnverifiedFile);
router.patch('/UnverifiedFiles/:id', updateUnverifiedFile);
router.delete('/UnverifiedFiles/:id', deleteUnverifiedFile);

export default router;