const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { generateInterviewQuestions } = require("../controllers/interviewController");

router.post("/generate", protect, generateInterviewQuestions);

module.exports = router;
