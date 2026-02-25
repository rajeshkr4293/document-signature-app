const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getDocumentAudit } = require("../controllers/auditController");

router.get("/:docId", authMiddleware, getDocumentAudit);

module.exports = router;