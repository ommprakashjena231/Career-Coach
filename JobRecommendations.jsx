import { useEffect, useState } from "react";
import api from "../services/api";

export default function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/jobs/recommendations")
      .then((res) => setJobs(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Job Recommendations</h1>
      <p className="hint">Matches are based on the skills saved in your profile.</p>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="job-list">
        {jobs.map(({ job, matchScore }) => (
          <div key={job._id} className="job-card">
            <div className="job-card-header">
              <h3>{job.title}</h3>
              <span className="match-badge">{matchScore}% match</span>
            </div>
            <p><strong>{job.company}</strong> — {job.location}</p>
            <p>{job.description}</p>
            <p className="job-skills"><strong>Skills:</strong> {job.skillsRequired.join(", ")}</p>
          </div>
        ))}
        {!loading && jobs.length === 0 && <p>No jobs found. Ask the admin to seed job data.</p>}
      </div>
    </div>
  );
}
