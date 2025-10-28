import React from "react";
import "./Footer.css";

const Footer = () => {
  const recipes = [
    { name: "Paneer Butter Masala", image: "/public/PaneerButterMasala.png" },
    { name: "Hyderabadi Biryani", image: "/public/Hyderabadi_Biryani.png" },
    { name: "Veg Momos", image: "/public/Momos.png" },
    { name: "Chocolate Brownies", image: "/public/brownies.png" },
    { name: "Dhokla", image: "/public/Dhokla.png" },
    { name: "Caesar Salad", image: "/public/Caesar_Salad.png" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">🍽️ Popular Recipes</h2>

        <div className="footer-recipes">
          {recipes.map((recipe, index) => (
            <div key={index} className="footer-recipe-card">
              <img src={recipe.image} alt={recipe.name} />
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>

        <p className="footer-note">
          © {new Date().getFullYear()} RecipeHub — Made with ❤️ for food lovers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
