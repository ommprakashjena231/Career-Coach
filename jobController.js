const Job = require("../models/Job");

// Simple scoring: percentage overlap between user skills and job.skillsRequired
function scoreJob(userSkills, job) {
  const userSet = new Set(userSkills.map((s) => s.toLowerCase()));
  const required = job.skillsRequired.map((s) => s.toLowerCase());
  if (!required.length) return 0;
  const matched = required.filter((s) => userSet.has(s));
  return Math.round((matched.length / required.length) * 100);
}

// @route GET /api/jobs/recommendations
const getRecommendations = async (req, res, next) => {
  try {
    const userSkills = req.user.skills || [];
    const jobs = await Job.find({});

    const scored = jobs
      .map((job) => ({
        job,
        matchScore: scoreJob(userSkills, job),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(scored);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/jobs
const listJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/jobs  (admin/seed helper)
const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecommendations, listJobs, createJob };
