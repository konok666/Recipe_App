import React, { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import "../Style/MyFavorite.css";

const MyFavorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) {
        setFavorites([]);
        return;
      }

      const allFav = JSON.parse(localStorage.getItem("favoritesByUser")) || {};
      const userFav = allFav[user.email] || [];
      setFavorites(userFav);
    };

    loadFavorites();

    const handleStorage = (e) => {
      if (e.key === "favoritesByUser") loadFavorites();
    };
    const handleUpdated = () => loadFavorites();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("favoritesUpdated", handleUpdated);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("favoritesUpdated", handleUpdated);
    };
  }, []);

  const removeFavorite = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return;

    const allFav = JSON.parse(localStorage.getItem("favoritesByUser")) || {};
    const userFav = allFav[user.email] || [];

    const updated = userFav.filter((r) => r.id !== id);
    allFav[user.email] = updated;
    localStorage.setItem("favoritesByUser", JSON.stringify(allFav));
    setFavorites(updated);
  };

  const clearAllFavorites = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return;

    const allFav = JSON.parse(localStorage.getItem("favoritesByUser")) || {};
    allFav[user.email] = [];
    localStorage.setItem("favoritesByUser", JSON.stringify(allFav));
    setFavorites([]);
  };

  return (
    <div className="favorites-container">
      <h1>❤️ My Favorite Recipes</h1>

      {/* ✅ Action row: Clear button (left) + Summary (right) */}
      <div className="favorites-actions-row">
        {favorites.length > 0 && (
          <button className="clear-all-btn" onClick={clearAllFavorites}>
            🗑️ Clear All Recipes
          </button>
        )}

        <div className="favorites-summary">
          <div className="summary-card">
            <h3>Total Favorite Recipes</h3>
            <p>{favorites.length}</p>
          </div>
        </div>
      </div>

      <div className="recipe-grid">
        {favorites.length === 0 ? (
          <p className="no-results">You have no favorite recipes yet.</p>
        ) : (
          favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onRemoveFavorite={removeFavorite}
              sourcePage="favorites"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyFavorite;
