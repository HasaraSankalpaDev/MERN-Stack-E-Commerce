const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: [String], required: true }, // store Google Drive image URLs
  category: { type: String },
  subCategory: { type: String },
  sizes: { type: [String] },
  price: { type: Map, of: Number }, // dynamic price per size
  date: { type: Date, default: Date.now },
  bestseller: { type: Boolean, default: false },
});

module.exports = mongoose.model("Product", productSchema);
