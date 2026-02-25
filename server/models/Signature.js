const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
    document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true
    },
    signer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Signed", "Rejected"],
        default: "Pending"
    },
    signedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Signature", signatureSchema);