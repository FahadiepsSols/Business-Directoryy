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
      image,
      userId // base64 string
    } = req.body;

    const newBusiness = new Business({
      name,
      category,
      location,
      description,
      contactInfo,
      image,
      userId
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error("Error saving business:", error);
    res.status(500).json({ error: "Failed to create business" });
  }
});

router.get("/my_businesses", async (req, res) => {
  const { userId } = req.query;
  try {
    const businesses = await Business.find({ userId });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



router.post('/:id/reviews', async (req, res) => {
  const { user, text } = req.body;

  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      { $push: { reviews: { user, text } } },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json(updatedBusiness);
  } catch (err) {
    console.error("Review POST error:", err);
    res.status(500).json({ message: 'Server Error', error: err.message });
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





router.put('/:id', async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(updatedBusiness);
  } catch (err) {
    console.error("Error updating business:", err);
    res.status(500).json({ error: "Server error" });
  }
});





router.delete("/:id", async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Business deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete business" });
  }
});








module.exports = router;
