const Resume = require("../models/Resume");
const { generateText } = require("../utils/aiService");

// Basic stopword list so keyword matching isn't polluted with common words
const STOPWORDS = new Set([
  "the","and","a","an","to","of","in","on","for","with","is","are","as","by",
  "at","or","be","this","that","will","from","we","you","your","our","it",
  "using","use","have","has","experience","strong","ability","skills","work",
]);

function extractKeywords(text) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9+#. ]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    )
  );
}

// Rule-based ATS scoring: keyword overlap + formatting heuristics
function computeAtsScore(resumeText, jobDescription) {
  const resumeKeywords = extractKeywords(resumeText);
  const jdKeywords = extractKeywords(jobDescription);

  const matched = jdKeywords.filter((k) => resumeKeywords.includes(k));
  const missing = jdKeywords.filter((k) => !resumeKeywords.includes(k));

  const keywordScore = jdKeywords.length
    ? (matched.length / jdKeywords.length) * 70 // keyword match worth 70%
    : 35;

  // Formatting heuristics worth 30%
  let formatScore = 0;
  if (/summary|objective/i.test(resumeText)) formatScore += 6;
  if (/experience/i.test(resumeText)) formatScore += 6;
  if (/education/i.test(resumeText)) formatScore += 6;
  if (/skills/i.test(resumeText)) formatScore += 6;
  if (resumeText.split(/\s+/).length > 150) formatScore += 6; // reasonable length

  const total = Math.round(Math.min(100, keywordScore + formatScore));

  return { score: total, matched, missing };
}

// @route POST /api/resume/analyze
const analyzeResume = async (req, res, next) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText) return res.status(400).json({ message: "resumeText is required" });

    const { score, matched, missing } = computeAtsScore(
      resumeText,
      jobDescription || ""
    );

    const prompt = `You are an expert resume reviewer and ATS specialist.
Resume:
"""${resumeText}"""

${jobDescription ? `Target Job Description:\n"""${jobDescription}"""\n` : ""}

Give concise, actionable feedback in this format:
1. Overall impression (2-3 sentences)
2. Top 5 specific improvements (bullet points)
3. Rewritten example of one weak bullet point from the resume, improved.
Keep it under 300 words.`;

    const aiFeedback = await generateText(prompt);

    const resume = await Resume.create({
      user: req.user._id,
      rawText: resumeText,
      targetJobDescription: jobDescription || "",
      atsScore: score,
      matchedKeywords: matched,
      missingKeywords: missing,
      aiFeedback,
    });

    res.status(201).json(resume);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/resume/history
const getResumeHistory = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    next(err);
  }
};

module.exports = { analyzeResume, getResumeHistory };
