const Roadmap = require("../models/Roadmap");
const { generateText } = require("../utils/aiService");

// @route POST /api/roadmap/generate
const generateRoadmap = async (req, res, next) => {
  try {
    const { currentRole, targetRole, experienceYears, timeframeMonths } = req.body;
    if (!targetRole) return res.status(400).json({ message: "targetRole is required" });

    const prompt = `Create a personalized, month-by-month career roadmap for someone moving from
"${currentRole || "an entry-level / unspecified background"}" to "${targetRole}".
Experience: ${experienceYears || 0} years. Desired timeframe: ${timeframeMonths || 6} months.

Structure the roadmap in markdown as:
## Overview
(2-3 sentences)

## Month-by-month plan
### Month 1: <focus area>
- concrete tasks
- resources/certifications to pursue
### Month 2: <focus area>
...continue through the full timeframe...

## Key milestones
- bullet list of checkpoints

Keep it practical and specific to the target role.`;

    const content = await generateText(prompt);

    const roadmap = await Roadmap.create({
      user: req.user._id,
      currentRole: currentRole || "",
      targetRole,
      content,
    });

    res.status(201).json(roadmap);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/roadmap/history
const getRoadmapHistory = async (req, res, next) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (err) {
    next(err);
  }
};

module.exports = { generateRoadmap, getRoadmapHistory };
