const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const githubRoutes = require('./routes/githubRoutes');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

const app = express();

// Custom XSS Middleware
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
};

// --- Security Middlewares ---
// 1. Set security HTTP headers. We disable CSP & COEP to ensure external GitHub avatars load correctly.
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// 2. Prevent HTTP Parameter Pollution
app.use(hpp());

// 3. Global Rate Limiter to mitigate DDoS attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true, 
  legacyHeaders: false,
});

app.use(express.json({ limit: '10kb' })); // Limit body size to 10kb to prevent payload too large attacks

// 6. Restrict CORS to authorized domains only
const allowedOrigins = [
  'http://localhost:5173', // Vite default local port
  'http://localhost:5001', // Local backend port
  'https://os-tracker.onrender.com' // Replace with your actual production frontend URL
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

// 4. Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// 5. Data Sanitization against XSS
app.use(sanitizeInput);

// Apply the rate limiter specifically to all API routes
app.use('/api/', apiLimiter);

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