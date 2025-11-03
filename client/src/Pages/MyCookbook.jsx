import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/MyCookbook.css";

const MyCookbook = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null); // ✅ Track if editing a recipe

  // 🔹 Fetch all recipes from backend
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cookbook");
      setRecipes(res.data.data || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // 🔹 Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle image upload
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

  // 🔹 Add or Update Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, ingredients, instructions } = recipe;
    if (!title || !ingredients || !instructions) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        // ✅ Update existing recipe
        const res = await axios.put(
          `http://localhost:5000/api/cookbook/${editingId}`,
          recipe
        );
        if (res.data.success) {
          setRecipes((prev) =>
            prev.map((r) => (r._id === editingId ? res.data.data : r))
          );
          setEditingId(null);
        }
      } else {
        // ✅ Add new recipe
        const res = await axios.post("http://localhost:5000/api/cookbook", recipe);
        if (res.data.success) {
          setRecipes((prev) => [...prev, res.data.data]);
        }
      }

      // Clear form after submit
      setRecipe({ title: "", ingredients: "", instructions: "", image: "" });
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  // 🔹 Edit recipe (prefill form)
  const handleEdit = (r) => {
    setRecipe({
      title: r.title,
      ingredients: r.ingredients,
      instructions: r.instructions,
      image: r.image,
    });
    setEditingId(r._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔹 Delete recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/cookbook/${id}`);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // 🔹 Delete all recipes
  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete ALL recipes?")) {
      try {
        await Promise.all(
          recipes.map((r) => axios.delete(`http://localhost:5000/api/cookbook/${r._id}`))
        );
        setRecipes([]);
      } catch (error) {
        console.error("Error clearing recipes:", error);
      }
    }
  };

  return (
    <div className="cookbook-container">
      <h1>🍳 My Cookbook</h1>

      {/* ✅ Add / Update Form */}
      <form className="recipe-form" onSubmit={handleSubmit}>
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

        <button type="submit">
          {editingId ? "Update Recipe ✅" : "Add Recipe ➕"}
        </button>
      </form>

      {recipes.length > 0 && (
        <button className="clear-all-btn" onClick={handleClearAll}>
          🗑️ Clear All Recipes
        </button>
      )}

      {/* ✅ Recipe List */}
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p className="no-recipes">No recipes added yet.</p>
        ) : (
          recipes.map((r) => (
            <div key={r._id} className="recipe-card">
              {r.image && <img src={r.image} alt={r.title} />}
              <h2>{r.title}</h2>
              <p>
                <strong>Ingredients:</strong> {r.ingredients}
              </p>
              <p>
                <strong>Instructions:</strong> {r.instructions}
              </p>
              <div className="card-actions">
                <button onClick={() => handleEdit(r)}>✏️ Edit</button>
                <button onClick={() => handleDelete(r._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCookbook;
