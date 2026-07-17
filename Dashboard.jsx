import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/auth/profile").then((res) => setProfile(res.data)).catch(() => {});
  }, []);

  const cards = [
    { title: "Resume Review", desc: "Get AI feedback + ATS score", to: "/resume-review" },
    { title: "Interview Prep", desc: "Generate mock interview questions", to: "/interview-prep" },
    { title: "Career Roadmap", desc: "Get a personalized growth plan", to: "/career-roadmap" },
    { title: "Skill Gap Analysis", desc: "Find what to learn next", to: "/skill-gap" },
    { title: "Job Recommendations", desc: "See matching job listings", to: "/job-recommendations" },
  ];

  return (
    <div className="page">
      <h1>Welcome, {user?.name} 👋</h1>
      {profile && (
        <div className="profile-summary">
          <p><strong>Current Role:</strong> {profile.currentRole || "Not set"}</p>
          <p><strong>Target Role:</strong> {profile.targetRole || "Not set"}</p>
          <p><strong>Skills:</strong> {profile.skills?.join(", ") || "None yet"}</p>
        </div>
      )}
      <div className="card-grid">
        {cards.map((c) => (
          <Link to={c.to} key={c.title} className="card">
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
