import express from "express";
import {
  getFile,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
  getPdfFile,
  getMp3File,
  getPdfById,
  getMp3ById,
} from "../controllers/File.js";
import { verifyUser } from "../middleware/AuthUser.js";
import multer from "multer";
import path from "path";


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationPath;
    if (file.mimetype.startsWith("audio/mpeg")) {
      destinationPath = "./assets/mp3s/";
    } else if (file.mimetype === "application/pdf") {
      destinationPath = "./assets/PDFs/";
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

router.get("/Files", verifyUser, getFile);
router.get("/PdfFiles", verifyUser, getPdfFile);
router.get("/Mp3Files", verifyUser, getMp3File);
router.get("/Files/:id", verifyUser, getFileById);
router.get("/Pdf/:id", verifyUser, getPdfById);
router.get("/Mp3/:id", verifyUser, getMp3ById);
router.post(
  "/Files",
  upload.fields([
    { name: "file_pdf", maxCount: 1 },
    { name: "file_mp3", maxCount: 1 },
  ]),
  verifyUser,
  createFile
);
router.patch("/Files/:id", verifyUser, updateFile);
router.delete("/Files/:id", verifyUser, deleteFile);

export default router;
