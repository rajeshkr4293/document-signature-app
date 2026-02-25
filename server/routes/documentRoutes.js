const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

const {
    uploadDocument,
    getUserDocuments,
    downloadSignedDocument,
    rejectDocument
} = require("../controllers/documentController");

// Upload document
router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);

// Get logged-in user's documents
router.get("/", authMiddleware, getUserDocuments);

// Download signed document
router.get("/:id/download", authMiddleware, downloadSignedDocument);

// Reject document
router.post("/:id/reject", authMiddleware, rejectDocument);

module.exports = router;