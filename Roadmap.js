const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    currentRole: String,
    targetRole: String,
    content: { type: String, required: true }, // AI-generated roadmap (markdown/text)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);
