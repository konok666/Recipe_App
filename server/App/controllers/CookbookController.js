const Cookbook = require("../models/CookbookModel");

// 🟢 Create Recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image, userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email is required to save a recipe.",
      });
    }

    const newRecipe = await Cookbook.create({
      title,
      ingredients,
      instructions,
      image,
      userEmail,
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating recipe", error });
  }
};

// 🟣 Get All Recipes (filtered by user email)
exports.getAllRecipes = async (req, res) => {
  try {
    const { email } = req.query; // frontend sends ?email=user@example.com
    const filter = email ? { userEmail: email } : {};
    const recipes = await Cookbook.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching recipes", error });
  }
};

// 🟢 Get Single Recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Cookbook.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error("❌ Error fetching recipe:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recipe",
      error,
    });
  }
};

// 🟠 Update Recipe
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRecipe = await Cookbook.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          image: req.body.image,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating recipe", error });
  }
};

// 🔴 Delete Recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cookbook.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting recipe", error });
  }
};
