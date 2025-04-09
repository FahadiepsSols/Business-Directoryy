const mongoose = require('mongoose');

const followingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  followedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Following', followingSchema);
