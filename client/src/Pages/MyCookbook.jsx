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
  const [editingId, setEditingId] = useState(null);
  const [count, setCount] = useState(0); // ✅ Animated counter

  // 🔹 Fetch recipes from backend
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cookbook");
      const data = res.data.data || [];
      setRecipes(data);
      animateCounter(data.length);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // 🧮 Smooth Counter Animation
  const animateCounter = (target) => {
    let start = count;
    const duration = 800; // 0.8 seconds
    const stepTime = 16; // ~60fps
    const totalSteps = duration / stepTime;
    const increment = (target - start) / totalSteps;

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, stepTime);
  };

  // 🔹 Handle form inputs
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

  // 🔹 Add or Update recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, ingredients, instructions } = recipe;
    if (!title || !ingredients || !instructions) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        // 🟠 Update recipe
        const res = await axios.put(
          `http://localhost:5000/api/cookbook/${editingId}`,
          recipe
        );
        if (res.data.success) {
          setRecipes((prev) =>
            prev.map((r) => (r._id === editingId ? res.data.recipe : r))
          );
          setEditingId(null);
        }
      } else {
        // 🟢 Add new recipe
        const res = await axios.post("http://localhost:5000/api/cookbook", recipe);
        if (res.data.success) {
          const newList = [res.data.recipe, ...recipes];
          setRecipes(newList);
          animateCounter(newList.length);
        }
      }

      // Reset form
      setRecipe({ title: "", ingredients: "", instructions: "", image: "" });
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  // 🔹 Edit recipe
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
      const newList = recipes.filter((r) => r._id !== id);
      setRecipes(newList);
      animateCounter(newList.length);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // 🔹 Delete all
  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete ALL recipes?")) {
      try {
        await Promise.all(
          recipes.map((r) => axios.delete(`http://localhost:5000/api/cookbook/${r._id}`))
        );
        setRecipes([]);
        animateCounter(0);
      } catch (error) {
        console.error("Error clearing recipes:", error);
      }
    }
  };

  return (
    <div className="cookbook-container">
      <h1>🍳 My Cookbook</h1>

      {/* 🔹 Animated Summary Card */}
      <div className="summary-section">
        <div className="summary-card">
          <h2>Total Recipes</h2>
          <p className="counter">{count}</p>
        </div>
      </div>

      {/* 🔹 Add / Update Form */}
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

      {/* 🔹 Recipe List */}
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
