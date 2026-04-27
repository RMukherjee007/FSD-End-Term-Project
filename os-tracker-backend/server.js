require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB using an environment variable for the cloud, falling back to local
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/os-tracker';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB error:', err));

// Apply the routes
app.use('/api/github', githubRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../os-tracker-frontend/dist')));

// Catch-all to serve React app for unknown routes
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../os-tracker-frontend/dist', 'index.html'));
});

// Use the dynamic port provided by the cloud host, or fallback to 5001 locally
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));