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
// Serve files
// =====================
app.use("/files", express.static(__dirname));

// =====================
// Deployment Mode Check
// =====================
const NO_DB = process.env.NO_DB === "true";

if (!NO_DB && process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error:", err));
} else {
  console.log("Running in deployment demo mode (NO_DB enabled)");
}

// =====================
// Routes
// =====================
if (!NO_DB) {
  const authRoutes = require("./routes/authRoutes");
  const documentRoutes = require("./routes/documentRoutes");
  const signatureRoutes = require("./routes/signatureRoutes");
  const auditRoutes = require("./routes/auditRoutes");
  const authMiddleware = require("./middleware/authMiddleware");

  app.use("/api/auth", authRoutes);
  app.use("/api/docs", documentRoutes);
  app.use("/api/signatures", signatureRoutes);
  app.use("/api/audit", auditRoutes);

  app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
      message: "You accessed a protected route",
      user: req.user
    });
  });
} else {
  // Dummy routes for deployment
  app.get("/api/*", (req, res) => {
    res.json({
      message: "Deployment demo mode active. Database disabled."
    });
  });
}

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});