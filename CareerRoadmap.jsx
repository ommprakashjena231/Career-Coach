import { useState } from "react";
import api from "../services/api";

export default function CareerRoadmap() {
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [timeframeMonths, setTimeframeMonths] = useState(6);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/roadmap/generate", {
        currentRole, targetRole, experienceYears: Number(experienceYears), timeframeMonths: Number(timeframeMonths),
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
      <h1>Career Roadmap Generator</h1>
      <form onSubmit={handleSubmit} className="stacked-form">
        <input placeholder="Current Role" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} />
        <input placeholder="Target Role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} required />
        <input type="number" placeholder="Years of Experience" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
        <input type="number" placeholder="Timeframe (months)" value={timeframeMonths} onChange={(e) => setTimeframeMonths(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Generating..." : "Generate Roadmap"}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          <pre className="ai-feedback">{result.content}</pre>
        </div>
      )}
    </div>
  );
}
