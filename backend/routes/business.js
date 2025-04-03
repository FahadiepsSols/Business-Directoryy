const express = require("express");
const router = express.Router();

const businesses = [
  { id: "1", name: "Coffee House", description: "Best coffee in town!", address: "123 Main St", contact: "9876543210", image: "/images/business1.jpg", reviews: [] },
  { id: "2", name: "Tech Store", description: "Latest gadgets available", address: "456 Tech St", contact: "9876543211", image: "/images/business2.jpg", reviews: [] },
];

// Get all businesses
router.get("/", (req, res) => {
  res.json(businesses);
});

// Get business by ID
router.get("/:id", (req, res) => {
  const business = businesses.find((b) => b.id === req.params.id);
  if (!business) return res.status(404).json({ error: "Business not found" });
  res.json(business);
});

// Add a review
router.post("/:id/reviews", (req, res) => {
  const business = businesses.find((b) => b.id === req.params.id);
  if (!business) return res.status(404).json({ error: "Business not found" });

  const { text } = req.body;
  business.reviews.push({ user: "Anonymous", text });
  res.status(201).json({ message: "Review added", business });
});

module.exports = router;
