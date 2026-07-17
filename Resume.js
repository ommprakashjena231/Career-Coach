const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rawText: { type: String, required: true },
    targetJobDescription: { type: String, default: "" },
    atsScore: { type: Number, default: 0 },
    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    aiFeedback: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
