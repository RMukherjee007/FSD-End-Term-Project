const User = require('../models/User');

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const toggleFavorite = async (req, res) => {
  const { login, name, avatar } = req.body;
  
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const isFavIndex = user.favorites.findIndex(fav => fav.login === login);
    
    if (isFavIndex > -1) {
      // Remove it
      user.favorites.splice(isFavIndex, 1);
    } else {
      // Add it
      user.favorites.unshift({ login, name, avatar });
    }
    
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getFavorites, toggleFavorite };
