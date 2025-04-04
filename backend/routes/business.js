const express = require("express")
const multer = require("multer")
const Business = require("../models/Business")

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Adjust storage as needed

// Create a new business
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, location, description, contactInfo } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newBusiness = new Business({
      name,
      category,
      location,
      description,
      contactInfo,
      imageUrl,
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    res.status(500).json({ error: "Failed to create business" });
  }
});

router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    console.log("Fetched Businesses:", businesses); // Debug log
    res.json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error); // Debug log
    res.status(500).json({ error: "Server error", details: error.message });
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
