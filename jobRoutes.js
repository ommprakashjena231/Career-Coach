const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getRecommendations, listJobs, createJob } = require("../controllers/jobController");

router.get("/", protect, listJobs);
router.get("/recommendations", protect, getRecommendations);
router.post("/", protect, createJob); // could restrict to admin role later

module.exports = router;
