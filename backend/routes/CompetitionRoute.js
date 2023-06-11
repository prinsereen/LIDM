import express from "express";
import {
    createCompetition
} from "../controllers/Competition.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationPath;
    if (file.mimetype.startsWith("image/")) {
      destinationPath = "./assets/compLogo/";
    } else {
      return cb(new Error("Unsupported file type"));
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.filename}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.post('/Competition', upload.single("competition_logo"), createCompetition);

export default router;