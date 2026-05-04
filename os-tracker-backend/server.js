const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');

const rateLimit = require('express-rate-limit');

const app = express();

app.use(express.json());
app.use(cors());

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api', limiter);

// Connect to MongoDB using an environment variable for the cloud, falling back to local
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/os-tracker';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB error:', err));

const path = require('path');

// Apply the routes
app.use('/api/github', githubRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../os-tracker-frontend/dist')));

// Catch-all to serve React app for unknown routes
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../os-tracker-frontend/dist', 'index.html'));
});

// Use the dynamic port provided by the cloud host, or fallback to 5001 locally
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));