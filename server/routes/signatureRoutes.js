const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { addSignature } = require("../controllers/signatureController");

router.post("/", authMiddleware, addSignature);

module.exports = router;