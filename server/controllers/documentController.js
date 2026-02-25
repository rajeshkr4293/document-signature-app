const Document = require("../models/Document");
const logAction = require("../utils/auditLogger");

// Upload document
exports.uploadDocument = async (req, res) => {
    try {
        const document = await Document.create({
            owner: req.user.userId,
            fileName: req.file.originalname,
            filePath: req.file.path
        });

        await logAction({
            userId: req.user.userId,
            documentId: document._id,
            action: "UPLOAD_DOCUMENT",
            ip: req.ip
        });

        res.status(201).json({
            message: "Document uploaded successfully",
            document
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user documents
exports.getUserDocuments = async (req, res) => {
    try {
        const documents = await Document.find({
            owner: req.user.userId
        }).sort({ createdAt: -1 });

        res.json(documents);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Download signed document
exports.downloadSignedDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (document.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        if (!document.signedFilePath) {
            return res.status(400).json({ message: "Document not signed yet" });
        }

        await logAction({
            userId: req.user.userId,
            documentId: document._id,
            action: "DOWNLOAD_SIGNED_DOCUMENT",
            ip: req.ip
        });

        res.download(document.signedFilePath);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rejectDocument = async (req, res) => {
    try {
        const { reason } = req.body;

        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (document.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        if (document.status !== "Pending") {
            return res.status(400).json({ message: "Document already finalized" });
        }

        document.status = "Rejected";
        document.rejectionReason = reason;

        await document.save();

        await logAction({
            userId: req.user.userId,
            documentId: document._id,
            action: "REJECT_DOCUMENT",
            ip: req.ip
        });

        res.json({
            message: "Document rejected successfully",
            document
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};