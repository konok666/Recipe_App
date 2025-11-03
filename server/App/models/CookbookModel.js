const mongoose = require("mongoose");

const cookbookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: String, // base64 or URL
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cookbook", cookbookSchema);
