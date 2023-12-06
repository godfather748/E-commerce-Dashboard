const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  company: String,
  category: String,
  price: Number,
  userId: String,
});

module.exports = mongoose.model("products", productSchema);
