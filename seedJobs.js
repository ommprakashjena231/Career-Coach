require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const Job = require("../models/Job");

const jobs = [
  {
    title: "Frontend Developer",
    company: "Nimbus Tech",
    location: "Remote",
    description: "Build responsive UIs with React and collaborate with designers.",
    skillsRequired: ["react", "javascript", "css", "html", "git"],
    experienceLevel: "Entry",
  },
  {
    title: "Backend Developer (Node.js)",
    company: "DataForge",
    location: "Bengaluru, India",
    description: "Design REST APIs and manage MongoDB-backed services.",
    skillsRequired: ["node.js", "express", "mongodb", "rest api", "javascript"],
    experienceLevel: "Mid",
  },
  {
    title: "AI/ML Engineer",
    company: "Cognova Labs",
    location: "Hybrid - Pune",
    description: "Work on LLM-powered features and prompt engineering pipelines.",
    skillsRequired: ["python", "machine learning", "openai api", "prompt engineering", "nlp"],
    experienceLevel: "Mid",
  },
  {
    title: "Full Stack Developer",
    company: "Bright Startup",
    location: "Remote",
    description: "End-to-end feature ownership across React and Node.js stack.",
    skillsRequired: ["react", "node.js", "mongodb", "express", "javascript"],
    experienceLevel: "Entry",
  },
  {
    title: "Data Analyst",
    company: "InsightWorks",
    location: "Mumbai, India",
    description: "Analyze business data and build dashboards for stakeholders.",
    skillsRequired: ["sql", "excel", "python", "power bi", "statistics"],
    experienceLevel: "Entry",
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Job.deleteMany({});
  await Job.insertMany(jobs);
  console.log("Seeded jobs:", jobs.length);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
