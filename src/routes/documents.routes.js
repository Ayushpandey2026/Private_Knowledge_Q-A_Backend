import express from "express";
import multer from "multer";
import { saveDocument, listDocuments } from "../services/document.service.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// File upload route
router.post("/upload", upload.single("file"), saveDocument);

// List all documents route
router.get("/", listDocuments);

export default router;