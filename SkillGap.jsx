import { useState } from "react";
import api from "../services/api";

export default function SkillGap() {
  const [skillsInput, setSkillsInput] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const currentSkills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
      const { data } = await api.post("/skill-gap/analyze", { currentSkills, targetRole });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Skill Gap Analysis</h1>
      <form onSubmit={handleSubmit} className="stacked-form">
        <input placeholder="Your current skills (comma separated)" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} required />
        <input placeholder="Target Role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Analyzing..." : "Analyze Gap"}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          <p><strong>Required Skills:</strong> {result.requiredSkills?.join(", ")}</p>
          <p><strong>You Already Have:</strong> {result.matchedSkills?.join(", ") || "None"}</p>
          <p><strong>Missing Skills:</strong> {result.missingSkills?.join(", ") || "None"}</p>
          <h3>Priority Learning Order</h3>
          <ol>
            {result.priorityOrder?.map((s, idx) => <li key={idx}>{s}</li>)}
          </ol>
          <h3>Suggested Resources</h3>
          <ul>
            {result.learningResources?.map((r, idx) => (
              <li key={idx}><strong>{r.skill}:</strong> {r.resource}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
