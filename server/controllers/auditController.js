const AuditLog = require("../models/AuditLog");
const Document = require("../models/Document");

exports.getDocumentAudit = async (req, res) => {
    try {
        const { docId } = req.params;

        const document = await Document.findById(docId);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (document.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const logs = await AuditLog.find({ document: docId })
            .sort({ createdAt: -1 });

        res.json(logs);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};