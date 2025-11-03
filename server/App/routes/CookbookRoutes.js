const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/CookbookController");

router.post("/cookbook", createRecipe);
router.get("/cookbook", getAllRecipes);
router.get("/cookbook/:id", getRecipeById);
router.put("/cookbook/:id", updateRecipe);
router.delete("/cookbook/:id", deleteRecipe);

module.exports = router;
