const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
    username: String,
    timestamp: { type: Date, default: Date.now },
    success: Boolean
});

module.exports = mongoose.model('SearchLog', searchLogSchema);