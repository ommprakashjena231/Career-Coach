const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { analyzeResume, getResumeHistory } = require("../controllers/resumeController");

const upload = multer({ storage: multer.memoryStorage() });

// Analyze resume from raw pasted text + optional job description
router.post("/analyze", protect, analyzeResume);

// Analyze resume from an uploaded PDF file (field name: "resume")
router.post("/analyze-file", protect, upload.single("resume"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const data = await pdfParse(req.file.buffer);
    req.body.resumeText = data.text;
    return analyzeResume(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.get("/history", protect, getResumeHistory);

module.exports = router;
