const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { generateRoadmap, getRoadmapHistory } = require("../controllers/roadmapController");

router.post("/generate", protect, generateRoadmap);
router.get("/history", protect, getRoadmapHistory);

module.exports = router;
