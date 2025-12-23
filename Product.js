const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, default: "" },
  image: { type: String, default: "" },
  category: { type: String, default: "General" },
});

module.exports = mongoose.model("Product", productSchema);
