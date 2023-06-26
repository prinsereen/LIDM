import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateRecomendation,
  getUserPhoto,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import multer from "multer";
import path from "path";
import cors from "cors";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationPath;
    if (file.mimetype.startsWith("image/")) {
      destinationPath = "./assets/userPhotos/";
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

router.get("/users", verifyUser, adminOnly, getUser);
router.get("/users/:id", verifyUser, getUserById);
router.post("/users", createUser);
router.patch(
  "/users/:id",
  verifyUser,
  upload.single("user_photo"),
  cors(),
  updateUser
);
router.patch("/userrec/:id", cors(), verifyUser, updateRecomendation);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);
router.get("/userphoto/:id", verifyUser, getUserPhoto);

export default router;
