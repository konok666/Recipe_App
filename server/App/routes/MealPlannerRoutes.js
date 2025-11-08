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

// ✅ Corrected routes — no duplicate "/mealplanner"
router.post("/", addMeal);                            // POST /api/mealplanner
router.get("/:userId", getMeals);                     // GET /api/mealplanner/:userId
router.put("/:userId/:day/:mealId", updateMeal);      // PUT /api/mealplanner/:userId/:day/:mealId
router.delete("/:userId/:day/:mealId", deleteMeal);   // DELETE /api/mealplanner/:userId/:day/:mealId
router.get("/:userId/shoppinglist", generateShoppingList); // GET /api/mealplanner/:userId/shoppinglist
router.delete("/:userId/clear", clearAllMeals);       // DELETE /api/mealplanner/:userId/clear

module.exports = router;
