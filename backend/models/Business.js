const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  contactInfo: { type: String, required: true },
  image: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Business", businessSchema);
