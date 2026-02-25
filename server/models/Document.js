const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    signedFilePath: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Signed", "Rejected"],
        default: "Pending"
    },
    rejectionReason: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);