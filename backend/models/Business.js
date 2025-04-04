const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  image: { type: String }, // Optional image field
  createdAt: { type: Date, default: Date.now }
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business; 
