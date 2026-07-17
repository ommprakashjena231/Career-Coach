# 🤖 AI Career Coach Platform

> An AI-powered career development platform that helps users optimize resumes, prepare for interviews, identify skill gaps, receive personalized job recommendations, and generate career roadmaps using artificial intelligence.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![Express.js](https://img.shields.io/badge/Framework-Express.js-000000)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF)
![Status](https://img.shields.io/badge/Status-Active-success)

---

# 📖 Overview

AI Career Coach Platform is a full-stack web application designed to help students and professionals accelerate their career growth through AI-powered guidance.

The platform enables users to review resumes, analyze ATS compatibility, practice interview questions, identify skill gaps, generate personalized career roadmaps, and discover relevant job opportunities from a single dashboard.

---

# ✨ Features

## 🔐 User Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- User Profile Management

---

## 📄 AI Resume Review

- Upload Resume
- AI Resume Analysis
- Resume Improvement Suggestions
- ATS Optimization
- Professional Formatting Tips

---

## 📊 ATS Score Analysis

- Resume ATS Score
- Missing Keywords
- Resume Strength Analysis
- AI Recommendations

---

## 🎤 AI Interview Preparation

- Technical Interview Questions
- HR Interview Questions
- Behavioral Questions
- Coding Interview Practice
- AI-generated Questions

---

## 🛣 Career Roadmap Generator

- Personalized Career Path
- Technology Learning Roadmap
- Weekly Learning Plan
- Milestone Tracking

---

## 📚 Skill Gap Analysis

- Compare Current Skills
- Required Skills Detection
- Recommended Learning Resources
- AI Skill Suggestions

---

## 💼 Job Recommendations

- Personalized Job Listings
- Search Jobs
- Save Jobs
- Apply Tracking

---

## 📈 Dashboard

- Resume Score
- Interview Progress
- Skill Progress
- Career Analytics
- Job Statistics

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Context API
- CSS3

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt.js

## AI Integration

- OpenAI API
- Google Gemini API

---

# 📂 Project Structure

```
Career-Coach/
│
├── App.jsx
├── main.jsx
├── index.css
├── index.html
├── vite.config.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ProtectedRoute.jsx
│   ├── ResumeReview.jsx
│   ├── InterviewPrep.jsx
│   ├── SkillGap.jsx
│   ├── CareerRoadmap.jsx
│   └── JobRecommendations.jsx
│
├── controllers/
│   ├── authController.js
│   ├── resumeController.js
│   ├── interviewController.js
│   ├── roadmapController.js
│   ├── skillGapController.js
│   └── jobController.js
│
├── routes/
│   ├── authRoutes.js
│   ├── resumeRoutes.js
│   ├── interviewRoutes.js
│   ├── roadmapRoutes.js
│   ├── skillGapRoutes.js
│   └── jobRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Resume.js
│   ├── Roadmap.js
│   └── Job.js
│
├── services/
│   └── aiService.js
│
├── db.js
├── server.js
├── package.json
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/ommprakashjena231/Career-Coach.git
```

## Navigate to Project

```bash
cd Career-Coach
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Start Backend

```bash
node server.js
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

OPENAI_API_KEY=your_openai_api_key

GEMINI_API_KEY=your_gemini_api_key
```

---

# 📌 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
```

## Resume

```
POST /api/resume/review
GET /api/resume
```

## Interview

```
POST /api/interview/questions
GET /api/interview/history
```

## Career Roadmap

```
POST /api/roadmap
GET /api/roadmap
```

## Skill Gap

```
POST /api/skill-gap
GET /api/skill-gap
```

## Jobs

```
GET /api/jobs
POST /api/jobs
```

---

# 🤖 AI Features

- Resume Review
- ATS Score Analysis
- AI Resume Suggestions
- Career Roadmap Generator
- Skill Gap Detection
- Interview Question Generator
- Personalized Job Recommendations

---

# 📸 Screenshots

```
🏠 Dashboard

📄 Resume Review

🎤 Interview Preparation

📊 Skill Gap Analysis

🛣 Career Roadmap

💼 Job Recommendation
```

> Add screenshots of the application here.

---

# 🌟 Future Enhancements

- Resume PDF Export
- Mock Interview with AI Chatbot
- Voice Interview Practice
- GitHub Profile Analysis
- LinkedIn Integration
- AI Cover Letter Generator
- Company-wise Interview Preparation
- Real-time Job Alerts
- Email Notifications
- Admin Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Omm Prakash Jena**

- GitHub: https://github.com/ommprakashjena231

---

# ⭐ Support

If you found this project useful:

- ⭐ Star this repository
- 🍴 Fork the project
- 🐛 Report bugs
- 💡 Suggest new features

---

## 🚀 Empowering Careers with Artificial Intelligence
```
