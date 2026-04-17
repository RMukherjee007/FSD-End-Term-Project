const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/os-tracker')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB error:', err));

// Apply the routes
app.use('/api/github', githubRoutes);

app.listen(5001, () => console.log('Server running on port 5001'));