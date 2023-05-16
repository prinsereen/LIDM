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
        if (file.mimetype.startsWith('audio/mpeg')) {
            destinationPath = './assets/mp3s/';
        } else if (file.mimetype === 'application/pdf') {
            destinationPath = './assets/PDFs/';
        } else {
            return cb(new Error('Unsupported file type'));
        }
        cb(null, destinationPath);
    },
    filname: (req, file, cb) => {
        let extension;
        if (file.mimetype === 'application/pdf') {
          extension = '.pdf'; // Example: Use .pdf extension for PDF files
        } else if (file.mimetype === 'audio/mpeg') {
          extension = '.mp3'; // Example: Use .mp3 extension for audio files
        } else {
          return cb(new Error('Unsupported file type'));
        }
        const filename = file.originalname + extension;
        cb(null, filename);
    }
});
const upload = multer({storage : storage});

const router = express.Router();

router.get('/UnverifiedFiles', getUnverifiedFile);
router.get('/UnverifiedFiles/:id', getUnverifiedFileById);
router.post('/UnverifiedFiles', upload.single('file'), createUnverifiedFile);
router.patch('/UnverifiedFiles/:id',upload.single('file'), updateUnverifiedFile);
router.delete('/UnverifiedFiles/:id', deleteUnverifiedFile);

export default router;