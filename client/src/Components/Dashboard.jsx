import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // Each recipe now has an ID (for details page navigation)
  const recipes = [
    { id: 23, name: "Paneer Butter Masala", image: "/PaneerButterMasala.png" },
    { id: 18, name: "Hyderabadi Biryani", image: "/Hyderabadi_Biryani.png" },
    { id: 3, name: "Chocolate Brownies", image: "/brownies.png" },
    { id: 8, name: "Caesar Salad", image: "/Caesar_Salad.png" },
    { id: 15, name: "Veg Momos", image: "/Momos.png" },
    { id: 14, name: "Dhokla", image: "/Dhokla.png" },
  ];

  const handleRecipeClick = (recipe) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email) {
      // ✅ Logged in → go to that recipe's detail page
      navigate(`/recipe/${recipe.id}`, { state: { recipe } });
    } else {
      // 🚪 Not logged in → redirect to Login page
      navigate("/login");
    }
  };

  return (
    <footer className="dashboard">
      <div className="dashboard-container">
        <h2 className="dashboard-title">🍽️ Popular Recipes</h2>

        <div className="dashboard-recipes">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="dashboard-recipe-card"
              onClick={() => handleRecipeClick(recipe)}
            >
              <img src={recipe.image} alt={recipe.name} />
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>

        <p className="dashboard-note">
          © {new Date().getFullYear()} RecipeHub — Made with ❤️ for food lovers.
        </p>
      </div>
    </footer>
  );
};

export default Dashboard;
