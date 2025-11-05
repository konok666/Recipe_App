const express = require("express");
const router = express.Router();

const {
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal,
  generateShoppingList,
  clearAllMeals,
} = require("../controllers/MealPlannerController");

router.post("/mealplanner", addMeal);                                   // Add meal
router.get("/mealplanner/:userId", getMeals);                           // Get all meals
router.put("/mealplanner/:userId/:day/:mealId", updateMeal);            // Update meal
router.delete("/mealplanner/:userId/:day/:mealId", deleteMeal);         // Delete meal
router.get("/mealplanner/:userId/shoppinglist", generateShoppingList);  // Generate shopping list
router.delete("/mealplanner/:userId/clear", clearAllMeals);             // Clear all

module.exports = router;
