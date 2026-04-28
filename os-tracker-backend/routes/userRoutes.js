const express = require('express');
const router = express.Router();
const { getFavorites, toggleFavorite } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/favorites', auth, getFavorites);
router.post('/favorites', auth, toggleFavorite);

module.exports = router;
