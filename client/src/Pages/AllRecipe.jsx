import React, { useState, useEffect } from "react";
import "../Style/AllRecipe.css";
import RecipeCard from "../Components/RecipeCard";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Load recipes
  useEffect(() => {
    const data = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        category: "Italian",
        image: "Spaghetti_Carbonara.png",
        description:
          "A creamy Italian pasta made with eggs, cheese, pancetta, and pepper.",
      },
      {
        id: 2,
        title: "Vegetable Fried Rice",
        category: "Veg Food",
        image: "veg_fried_rice.png",
        description:
          "A quick and delicious rice dish tossed with veggies and soy sauce.",
      },
      {
        id: 3,
        title: "Chocolate Brownies",
        category: "Dessert",
        image: "brownies.png",
        description:
          "Rich, fudgy brownies made with dark chocolate and a hint of coffee.",
      },
      {
        id: 4,
        title: "Greek Salad",
        category: "Salad",
        image: "greek_pasta_salad.png",
        description: "A refreshing Mediterranean salad made with crisp vegetables, feta cheese, and olives, tossed in a simple olive oil dressing.",
      },
      {
        id: 5,
        title: "Margherita Pizza",
        category: "Italian",
        image: "Margherita_pizza.png",
        description: "A classic Italian pizza topped with tomato sauce, fresh mozzarella, basil leaves, and a drizzle of olive oil for a simple yet flavorful taste.",
      },
      {
        id: 6,
        title: "Butter Chicken",
        category: "North Indian",
        image: "butter_chicken.png",
        description: "A rich and creamy North Indian curry made with marinated chicken cooked in a buttery tomato-based sauce with aromatic spices.",
      },
      {
        id: 7,
        title: "Masala Dosa",
        category: "South Indian",
        image: "masala_dosa.png",
        description:
          "A crispy South Indian crepe made from fermented rice and lentil batter, filled with spiced potato masala.",
      },
      {
        id: 8,
        title: "Caesar Salad",
        category: "Salad",
        image: "Caesar_Salad.png",
        description: "A classic salad made with crisp romaine lettuce, crunchy croutons, Parmesan cheese, and a creamy Caesar dressing.",
      },
      {
        id: 9,
        title: "Pad Thai",
        category: "Asian",
        image: "Pad_Thai.png",
        description:
          "Traditional Thai stir-fried noodles with shrimp, peanuts, and lime.",
      },
      {
        id: 10,
        title: "Tiramisu",
        category: "Dessert",
        image: "Tiramisu.png",
        description: "A classic Italian no-bake dessert made with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.",
      },
      {
        id: 11,
        title: "Pav Bhaji",
        category: "Street Food",
        image: "Pav_Bhaji.png",
        description: "A popular Indian street food dish consisting of spicy mashed vegetables served with buttered bread rolls (pav).",
      },
      {
        id: 12,
        title: "Rasgulla & Sandesh",
        category: "Dessert",
        image: "Rasgulla_Sandesh.png",
        description: "Iconic Bengali sweets made from chhena (fresh cottage cheese). Rasgulla is soft, spongy, and soaked in sugar syrup, while Sandesh is lightly sweetened and flavored with cardamom or saffron.",
      },
      {
        id: 13,
        title: "Macher Jhol",
        category: "East Indian",
        image: "Fish.png",
        description: "A traditional Bengali fish curry made with freshwater fish, mustard, and a blend of aromatic spices, served with steamed rice."
      },
      {
        id: 14,
        title: "Dhokla",
        category: "Snack",
        image: "Dhokla.png",
        description: "A soft and fluffy steamed cake made from fermented gram flour, originating from Gujarat, served with green chutney or fried chilies."
      },
      {
        id: 15,
        title: "Momos",
        category: "Street Food",
        image: "Momos.png",
        description: "A popular street food from India and Tibet consisting of steamed or fried dumplings filled with vegetables or meat, served with a spicy chutney.",
      },
      {
        id: 16,
        title: "Chole Bhature",
        category: "Breakfast",
        image: "Chole_Bhature.png",
        description: "A North Indian classic breakfast dish made of spicy chickpeas (chole) served with fluffy deep-fried bread (bhature).",
      },
      {
        id: 17,
        title: "Goan Prawn Curry",
        category: "West Indian",
        image: "GoanPrawnCurry.png",
        description: "A flavorful coastal curry from Goa made with prawns simmered in a rich coconut and tamarind-based gravy infused with aromatic spices.",
      },
      {
        id: 18,
        title: "Hyderabadi Biryani",
        category: "South Indian",
        image: "Hyderabadi_Biryani.png",
        description: "A royal and aromatic rice dish from Hyderabad made with layers of fragrant basmati rice, marinated meat, and rich spices cooked together in the traditional dum style.",
      },
      {
        id: 19,
        title: "Aloo Puri",
        category: "Breakfast",
        image: "Aloo_Puri.png",
        description: "A classic North Indian breakfast dish made of crispy, deep-fried bread (puri) served with a flavorful and spiced potato curry.",
      },
      {
        id: 20,
        title: "Chingri Malai Curry",
        category: "East Indian",
        image: "Chingri_Malai_Curry.png",
        description: "A rich and creamy Bengali delicacy made with prawns simmered in a coconut milk gravy infused with aromatic spices and a touch of sweetness.",
      },
      {
        id: 21,
        title: "Chicken Xacuti",
        category: "West Indian",
        image: "Chicken_Xacuti.png",
        description: "A flavorful Goan curry made with chicken cooked in a rich roasted coconut, poppy seed, and aromatic spice masala.",
      },
      {
        id: 22,
        title: "Rajma Chawal",
        category: "North Indian",
        image: "Rajma_Chawal.png",
        description: "A comforting North Indian dish featuring red kidney beans simmered in a spiced tomato gravy, served with steamed basmati rice.",
      },
      {
        id: 23,
        title: "Paneer Butter Masala",
        category: "Veg Food",
        image: "PaneerButterMasala.png",
        description: "A rich and creamy North Indian curry made with soft paneer cubes simmered in a buttery tomato-based gravy infused with aromatic spices.",
      },
      {
        id: 24,
        title: "Paneer Tikka",
        category: "Starter",
        image: "Paneer_Tikka.png",
        description: "A popular North Indian appetizer made with cubes of paneer marinated in yogurt and spices, grilled or baked to perfection.",
      }
    ];

    setRecipes(data);
    setFiltered(data);
  }, []);

  // Search & Filter
  useEffect(() => {
    let result = recipes;

    if (category !== "All") {
      result = result.filter((r) => r.category === category);
    }

    if (search.trim() !== "") {
      result = result.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, category, recipes]);

  return (
    <div className="all-recipes-container">
      <h1>🍲 Discover Delicious Recipes</h1>

      {/* Search and Filter Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Asian">Asian</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Dessert">Dessert</option>
          <option value="Italian">Italian</option>
          <option value="East Indian">East Indian</option>
          <option value="West Indian">West Indian</option>
          <option value="North Indian">North Indian</option>
          <option value="South Indian">South Indian</option>
          <option value="Salad">Salad</option>
          <option value="Snack">Snack</option>
          <option value="Veg Food">Veg Food</option>
        </select>
      </div>

      {/* Recipe Cards */}
      <div className="recipe-grid">
        {filtered.length === 0 ? (
          <p className="no-results">No recipes found 😔</p>
        ) : (
          filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} sourcePage="allrecipe" />
          ))
        )}
      </div>
    </div>
  );
};

export default AllRecipe;
