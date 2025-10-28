import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, onRemoveFavorite, sourcePage = 'allrecipe' }) => {
  const navigate = useNavigate();

  const handleViewRecipe = () => {
    navigate(`/recipe/${recipe.id}`, { state: { from: sourcePage } });
  };

  const handleRemove = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return;

    const allFav = JSON.parse(localStorage.getItem("favoritesByUser")) || {};
    const userFav = allFav[user.email] || [];

    const updated = userFav.filter((r) => r.id !== recipe.id);
    allFav[user.email] = updated;
    localStorage.setItem("favoritesByUser", JSON.stringify(allFav));

    if (onRemoveFavorite) onRemoveFavorite(recipe.id);
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p className="category">{recipe.category}</p>
        <p className="description">{recipe.description}</p>

        <div className="recipe-actions">
          <button className="view-btn" onClick={handleViewRecipe}>
            👁️ View Recipe
          </button>

          {onRemoveFavorite && (
            <button className="remove-btn" onClick={handleRemove}>
              ❌ Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
