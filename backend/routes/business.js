const express = require("express");
const Business = require("../models/Business");

const router = express.Router();

// No need for multer anymore
router.post("/", async (req, res) => {
  try {
    const {
      name,
      category,
      location,
      description,
      contactInfo,
      image, // base64 string
    } = req.body;

    const newBusiness = new Business({
      name,
      category,
      location,
      description,
      contactInfo,
      image,
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error("Error saving business:", error);
    res.status(500).json({ error: "Failed to create business" });
  }
});

router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
});


// Get a single business by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(business);
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
