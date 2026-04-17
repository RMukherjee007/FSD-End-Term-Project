# 🚀 Open Source Contribution Tracker

A full-stack **MERN dashboard** designed to asynchronously track, visualize, and log developer metrics using the GitHub REST API.

This project provides a clean, responsive interface for exploring a developer’s GitHub footprint, including follower counts, public repository stats, and recently updated projects. It also features a non-blocking backend architecture that logs search activity into MongoDB without affecting performance.

---

## 🧰 Tech Stack

**Frontend**
- React.js (Vite)
- CSS3

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Local)
- Mongoose

**API Integration**
- GitHub REST API (via Axios)

---

## ✨ Key Features

- **Real-Time Data Aggregation**  
  Fetches live GitHub profile and repository data.

- **Concurrent Fetching**  
  Uses `Promise.all` to fetch multiple API endpoints simultaneously for faster responses.

- **Non-Blocking Logging**  
  Logs search queries asynchronously to MongoDB without blocking the Node.js event loop.

- **Mac-Safe Backend Port**  
  Runs on **port 5001** to avoid macOS AirPlay conflicts.

---

## 🛠️ Local Setup & Installation

Follow these steps carefully to run the project locally.

### 📌 Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)
- [MongoDB Community Server & Compass](https://www.mongodb.com/try/download/community)

Ensure MongoDB is running in the background.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/RMukherjee007/FSD-End-Term-Project.git
cd FSD-End-Term-Project

2️⃣ Start the Backend Server

Open your first terminal:

cd os-tracker-backend
npm install
npx nodemon server.js

Wait until you see:

Server running on port 5001
MongoDB Connected

Note: The database (os-tracker) is automatically created on the first API call.

3️⃣ Start the Frontend

Open a second terminal:

cd os-tracker-frontend
npm install
npm run dev
4️⃣ Run the Application
Open the Vite URL (usually: http://localhost:5173
)
Enter a GitHub username (e.g., RMukherjee007)
Press Enter to view dashboard insights
📂 Project Structure
FSD-End-Term-Project/
├── os-tracker-backend/       
│   ├── controllers/          
│   ├── models/               
│   ├── routes/               
│   └── server.js             
│
└── os-tracker-frontend/      
    ├── src/
    │   ├── App.jsx           
    │   └── App.css           
    └── package.json
🐛 Troubleshooting

MongoDB Connection Failed

Ensure MongoDB is running
Check connection string: mongodb://localhost:27017

403 Forbidden Error

Ensure backend runs on port 5001
Port 5000 may conflict with macOS AirPlay

Frontend "dev" Script Error

Make sure you're inside os-tracker-frontend
📌 Final Note

This project demonstrates:

Efficient API handling
Scalable backend design
Clean UI integration
Real-world async architecture patterns

It is well-suited for showcasing full-stack engineering skills in high-performance environments.
