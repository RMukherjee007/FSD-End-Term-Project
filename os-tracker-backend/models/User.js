const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  login: { type: String, required: true },
  name: { type: String },
  avatar: { type: String }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  favorites: [favoriteSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
