const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// =====================
// Middlewares
// =====================
app.use(cors());
app.use(express.json());

// =====================
// ✅ Serve files directly from server folder
// =====================
app.use("/files", express.static(__dirname));

// =====================
// Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const signatureRoutes = require("./routes/signatureRoutes");
const auditRoutes = require("./routes/auditRoutes");
const authMiddleware = require("./middleware/authMiddleware");

app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/audit", auditRoutes);

// Test protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});