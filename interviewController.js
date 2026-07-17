const { generateText } = require("../utils/aiService");

// @route POST /api/interview/generate
const generateInterviewQuestions = async (req, res, next) => {
  try {
    const { role, experienceLevel, jobDescription } = req.body;
    if (!role) return res.status(400).json({ message: "role is required" });

    const prompt = `Generate a realistic mock interview set for the role "${role}"
${experienceLevel ? `at ${experienceLevel} level` : ""}.
${jobDescription ? `Job description context:\n"""${jobDescription}"""\n` : ""}

Return ONLY valid JSON with this exact shape:
{
  "technical": [{"question": "...", "modelAnswer": "..."}],
  "behavioral": [{"question": "...", "modelAnswer": "..."}],
  "situational": [{"question": "...", "modelAnswer": "..."}]
}
Include 4 questions per category. Keep model answers concise (2-4 sentences each).`;

    const raw = await generateText(prompt, { json: true });

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // fallback: try to strip markdown fences if the model added them
      const cleaned = raw.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    res.json(parsed);
  } catch (err) {
    next(err);
  }
};

module.exports = { generateInterviewQuestions };
