const logAction = require("../utils/auditLogger");
const Signature = require("../models/Signature");
const Document = require("../models/Document");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");


exports.addSignature = async (req, res) => {
    try {
        const { documentId, x, y, page } = req.body;

        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        if (document.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // 🔹 Load original PDF
        const existingPdfBytes = fs.readFileSync(document.filePath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pages = pdfDoc.getPages();
        const targetPage = pages[page - 1];

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const signatureText = `Signed by User\nDate: ${new Date().toLocaleDateString()}`;

        targetPage.drawText(signatureText, {
            x: x,
            y: y,
            size: 12,
            font: font,
            color: rgb(0, 0, 0),
        });

        // 🔹 Save new signed file
        const signedPdfBytes = await pdfDoc.save();

        const signedFileName = `signed-${Date.now()}.pdf`;
        const signedFilePath = path.join("uploads", signedFileName);

        fs.writeFileSync(signedFilePath, signedPdfBytes);

        await logAction({
            userId: req.user.userId,
            documentId: documentId,
            action: "SIGN_DOCUMENT",
            ip: req.ip
        });

        // 🔹 Save signature record
        const signature = await Signature.create({
            document: documentId,
            signer: req.user.userId,
            x,
            y,
            page,
            status: "Signed",
            signedAt: new Date()
        });

        // 🔹 Update document
        document.status = "Signed";
        document.signedFilePath = signedFilePath;
        await document.save();

        res.status(201).json({
            message: "Document signed and PDF generated successfully",
            signature,
            signedFilePath
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};