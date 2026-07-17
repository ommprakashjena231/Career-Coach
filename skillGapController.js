const { generateText } = require("../utils/aiService");

// @route POST /api/skill-gap/analyze
const analyzeSkillGap = async (req, res, next) => {
  try {
    const { currentSkills, targetRole } = req.body;
    if (!targetRole || !Array.isArray(currentSkills)) {
      return res.status(400).json({ message: "targetRole and currentSkills[] are required" });
    }

    const prompt = `A learner currently has these skills: ${currentSkills.join(", ") || "none listed"}.
They want to become a "${targetRole}".

Return ONLY valid JSON with this shape:
{
  "requiredSkills": ["skill1", "skill2", ...],
  "matchedSkills": ["skill user already has that's relevant"],
  "missingSkills": ["skill user needs to learn"],
  "priorityOrder": ["missing skills ordered by importance, most important first"],
  "learningResources": [
    {"skill": "skill name", "resource": "specific course/resource/book name and where to find it"}
  ]
}`;

    const raw = await generateText(prompt, { json: true });
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    res.json(parsed);
  } catch (err) {
    next(err);
  }
};

module.exports = { analyzeSkillGap };
