const MealPlanner = require("../models/MealPlannerModel");

// ✅ Add Meal
exports.addMeal = async (req, res) => {
  try {
    const { userId, day, mealName, ingredients } = req.body;
    if (!userId || !day || !mealName) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let plan = await MealPlanner.findOne({ userId, day });

    if (!plan) {
      plan = new MealPlanner({ userId, day, meals: [] });
    }

    plan.meals.push({ name: mealName, ingredients });
    await plan.save();

    const mealPlans = await MealPlanner.find({ userId });
    res.status(200).json({ success: true, mealPlans });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding meal", error: err.message });
  }
};

// ✅ Get all meals
exports.getMeals = async (req, res) => {
  try {
    const { userId } = req.params;
    const mealPlans = await MealPlanner.find({ userId });
    res.status(200).json({ success: true, mealPlans });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching meals", error: err.message });
  }
};

// ✅ Update Meal
exports.updateMeal = async (req, res) => {
  try {
    const { userId, day, mealId } = req.params;
    const { mealName, ingredients } = req.body;

    const plan = await MealPlanner.findOne({ userId, day });
    if (!plan) return res.status(404).json({ success: false, message: "Day not found" });

    const meal = plan.meals.id(mealId);
    if (!meal) return res.status(404).json({ success: false, message: "Meal not found" });

    meal.name = mealName;
    meal.ingredients = ingredients;
    await plan.save();

    const mealPlans = await MealPlanner.find({ userId });
    res.status(200).json({ success: true, mealPlans });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating meal", error: err.message });
  }
};

// ✅ Delete Meal
exports.deleteMeal = async (req, res) => {
  try {
    const { userId, day, mealId } = req.params;
    const plan = await MealPlanner.findOne({ userId, day });
    if (!plan) return res.status(404).json({ success: false, message: "Day not found" });

    plan.meals = plan.meals.filter((meal) => meal._id.toString() !== mealId);
    await plan.save();

    const mealPlans = await MealPlanner.find({ userId });
    res.status(200).json({ success: true, mealPlans });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting meal", error: err.message });
  }
};

// ✅ Generate Shopping List
exports.generateShoppingList = async (req, res) => {
  try {
    const { userId } = req.params;
    const mealPlans = await MealPlanner.find({ userId });

    const allIngredients = [];
    mealPlans.forEach((plan) =>
      plan.meals.forEach((meal) => {
        allIngredients.push(...meal.ingredients);
      })
    );

    const uniqueIngredients = [...new Set(allIngredients)];
    res.status(200).json({ success: true, shoppingList: uniqueIngredients });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error generating shopping list", error: err.message });
  }
};

// ✅ Clear All Meals
exports.clearAllMeals = async (req, res) => {
  try {
    const { userId } = req.params;
    await MealPlanner.deleteMany({ userId });
    res.status(200).json({ success: true, message: "All meals cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error clearing meals", error: err.message });
  }
};
