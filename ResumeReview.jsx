import { useState } from "react";
import api from "../services/api";

export default function ResumeReview() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyzeText = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/resume/analyze", { resumeText, jobDescription });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeFile = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please choose a PDF file first");
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      const { data } = await api.post("/resume/analyze-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>AI Resume Review & ATS Score</h1>

      <textarea
        placeholder="Paste job description (optional, improves ATS accuracy)"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={4}
      />

      <form onSubmit={handleAnalyzeText} className="stacked-form">
        <textarea
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={10}
        />
        <button type="submit" disabled={loading}>{loading ? "Analyzing..." : "Analyze Pasted Text"}</button>
      </form>

      <p className="or-divider">— or upload a PDF —</p>

      <form onSubmit={handleAnalyzeFile} className="stacked-form">
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>{loading ? "Analyzing..." : "Analyze PDF"}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          <h2>ATS Score: {result.atsScore} / 100</h2>
          <p><strong>Matched Keywords:</strong> {result.matchedKeywords.join(", ") || "None"}</p>
          <p><strong>Missing Keywords:</strong> {result.missingKeywords.join(", ") || "None"}</p>
          <h3>AI Feedback</h3>
          <pre className="ai-feedback">{result.aiFeedback}</pre>
        </div>
      )}
    </div>
  );
}
