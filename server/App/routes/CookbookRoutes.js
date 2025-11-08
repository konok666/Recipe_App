const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/CookbookController");

// ✅ Correct routes
router.post("/", createRecipe);       // POST /api/cookbook
router.get("/", getAllRecipes);       // GET /api/cookbook?email=user@gmail.com
router.get("/:id", getRecipeById);    // GET /api/cookbook/:id
router.put("/:id", updateRecipe);     // PUT /api/cookbook/:id
router.delete("/:id", deleteRecipe);  // DELETE /api/cookbook/:id

module.exports = router;
