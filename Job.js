const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: "Remote" },
  description: { type: String, default: "" },
  skillsRequired: [{ type: String }],
  experienceLevel: { type: String, default: "Entry" },
});

module.exports = mongoose.model("Job", jobSchema);
