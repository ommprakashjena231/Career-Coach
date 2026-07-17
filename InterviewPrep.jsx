import { useState } from "react";
import api from "../services/api";

export default function InterviewPrep() {
  const [role, setRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/interview/generate", { role, experienceLevel, jobDescription });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title, items) => (
    <div className="qa-section">
      <h3>{title}</h3>
      {items?.map((item, idx) => (
        <div key={idx} className="qa-item">
          <p><strong>Q{idx + 1}:</strong> {item.question}</p>
          <p className="model-answer"><strong>Model Answer:</strong> {item.modelAnswer}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="page">
      <h1>AI Interview Question Generator</h1>
      <form onSubmit={handleSubmit} className="stacked-form">
        <input placeholder="Target Role (e.g. Frontend Developer)" value={role} onChange={(e) => setRole(e.target.value)} required />
        <input placeholder="Experience Level (e.g. Entry, Mid, Senior)" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} />
        <textarea placeholder="Job description (optional)" rows={4} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Generating..." : "Generate Questions"}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          {renderSection("Technical Questions", result.technical)}
          {renderSection("Behavioral Questions", result.behavioral)}
          {renderSection("Situational Questions", result.situational)}
        </div>
      )}
    </div>
  );
}
