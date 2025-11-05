const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String }],
});

const mealPlannerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  day: { type: String, required: true },
  meals: [mealSchema],
});

module.exports = mongoose.model("MealPlanner", mealPlannerSchema);
