import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AI Career Coach</Link>
      </div>
      {user ? (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/resume-review">Resume Review</Link>
          <Link to="/interview-prep">Interview Prep</Link>
          <Link to="/career-roadmap">Roadmap</Link>
          <Link to="/skill-gap">Skill Gap</Link>
          <Link to="/job-recommendations">Jobs</Link>
          <span className="navbar-user">Hi, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}
