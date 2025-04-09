const express = require('express');
const router = express.Router();
const Following = require('../models/Following');
const Business = require('../models/Business');

// Follow a business
router.post('/', async (req, res) => {
  try {
    const { userId, businessId } = req.body;
    const existing = await Following.findOne({ userId, businessId });
    if (existing) return res.status(400).json({ message: "Already followed" });

    const follow = new Following({ userId, businessId });
    await follow.save();
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get followed businesses for a user
router.get('/:userId', async (req, res) => {
  try {
    const follows = await Following.find({ userId: req.params.userId }).populate('businessId');
    const businesses = follows.map(f => f.businessId);
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
