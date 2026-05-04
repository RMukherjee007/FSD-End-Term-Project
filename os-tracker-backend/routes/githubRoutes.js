const express = require('express');
const router = express.Router();
const { getGithubMetrics } = require('../controllers/githubController');

// This handles requests sent to /api/github/:username
router.get('/:username', getGithubMetrics);

module.exports = router;