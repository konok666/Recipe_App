import React, { useState, useEffect } from "react";
import "../Style/MyCookbook.css";

const MyCookbook = () => {
  // Get logged-in user info from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser ? currentUser._id || currentUser.email : "guest";

  // Generate a unique storage key per user
  const STORAGE_KEY = `myCookbook_${userId}`;

  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading saved recipes:", error);
      return [];
    }
  });

  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  // Save recipes whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes, STORAGE_KEY]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const { title, ingredients, instructions } = recipe;
    if (!title || !ingredients || !instructions) {
      alert("Please fill all fields");
      return;
    }

    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
    setRecipe({ title: "", ingredients: "", instructions: "", image: "" });
  };

  const handleDelete = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all recipes?")) {
      setRecipes([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="cookbook-container">
      <h1>🍳 My Cookbook</h1>

      <form className="recipe-form" onSubmit={handleAddRecipe}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe.title}
          onChange={handleChange}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Add Recipe</button>
      </form>

      {recipes.length > 0 && (
        <button className="clear-all-btn" onClick={handleClearAll}>
          🗑️ Clear All Recipes
        </button>
      )}

      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p className="no-recipes">No recipes added yet.</p>
        ) : (
          recipes.map((r, index) => (
            <div key={index} className="recipe-card">
              {r.image && <img src={r.image} alt={r.title} />}
              <h2>{r.title}</h2>
              <p><strong>Ingredients:</strong> {r.ingredients}</p>
              <p><strong>Instructions:</strong> {r.instructions}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCookbook;
