const AuditLog = require("../models/AuditLog");

const logAction = async ({ userId, documentId, action, ip }) => {
    try {
        await AuditLog.create({
            user: userId,
            document: documentId,
            action,
            ipAddress: ip
        });
    } catch (error) {
        console.error("Audit logging failed:", error.message);
    }
};

module.exports = logAction;