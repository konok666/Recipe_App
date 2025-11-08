import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/MealPlanner.css";

const MealPlanner = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser ? currentUser._id || currentUser.email : "guest";

  const [day, setDay] = useState("");
  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [mealPlans, setMealPlans] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [editMeal, setEditMeal] = useState(null);

  // Animated counters
  const [mealCount, setMealCount] = useState(0);
  const [shoppingCount, setShoppingCount] = useState(0);

  const API_BASE = "http://localhost:5000/api";

  const animateCounter = (setter, target) => {
    let start = 0;
    const duration = 800;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = (target - start) / totalSteps;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setter(Math.floor(current));
    }, stepTime);
  };

  const fetchMealPlans = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mealplanner/${userId}`);
      const plans = res.data?.mealPlans || [];
      plans.forEach((plan) => {
        plan.meals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      });
      setMealPlans(plans);
      const totalMeals = plans.reduce((acc, plan) => acc + plan.meals.length, 0);
      animateCounter(setMealCount, totalMeals);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    }
  };

  const fetchShoppingList = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mealplanner/${userId}/shoppinglist`);
      const list = res.data?.shoppingList || [];
      setShoppingList(list);
      animateCounter(setShoppingCount, list.length);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMealPlans();
      fetchShoppingList();
    }
  }, [userId]);

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!day || !mealName || !ingredients) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editMeal) {
        await axios.put(`${API_BASE}/mealplanner/${userId}/${day}/${editMeal._id}`, {
          mealName,
          ingredients: ingredients.split(",").map((i) => i.trim()),
        });
        setEditMeal(null);
      } else {
        await axios.post(`${API_BASE}/mealplanner`, {
          userId,
          day,
          mealName,
          ingredients: ingredients.split(",").map((i) => i.trim()),
        });
      }

      setMealName("");
      setIngredients("");
      await fetchMealPlans();
      await fetchShoppingList();
    } catch (error) {
      console.error("Error adding/updating meal:", error);
    }
  };

  const handleEditMeal = (day, meal) => {
    setDay(day);
    setMealName(meal.name);
    setIngredients(meal.ingredients.join(", "));
    setEditMeal(meal);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteMeal = async (day, mealId) => {
    if (!window.confirm("Delete this meal?")) return;
    try {
      await axios.delete(`${API_BASE}/mealplanner/${userId}/${day}/${mealId}`);
      await fetchMealPlans();
      await fetchShoppingList();
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleClearAllMeals = async () => {
    if (!window.confirm("Are you sure you want to delete ALL meals?")) return;
    try {
      await axios.delete(`${API_BASE}/mealplanner/${userId}/clear`);
      setMealPlans([]);
      setShoppingList([]);
      animateCounter(setMealCount, 0);
      animateCounter(setShoppingCount, 0);
    } catch (error) {
      console.error("Error clearing all meals:", error);
    }
  };

  const handleDeleteShoppingItem = (index) => {
    const updated = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updated);
    animateCounter(setShoppingCount, updated.length);
  };

  const filteredPlans = mealPlans.filter((plan) => plan.meals?.length > 0);
  return (
    <div className="mealplanner-container">
      <h1>🥗 Meal Planner</h1>

      {/* 🌟 Summary Section */}
      <div className="summary-section">
        <div className="summary-card">
          <h2>{mealCount}</h2>
          <p>Total Meals Added</p>
        </div>
        <div className="summary-card">
          <h2>{shoppingCount}</h2>
          <p>Shopping Items</p>
        </div>
      </div>

      {/* 🥣 Add Meal Form */}
      <form className="meal-form" onSubmit={handleAddMeal}>
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Select Day</option>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
            (d) => (
              <option key={d} value={d}>
                {d}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          placeholder="Meal Name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />

        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <button type="submit">{editMeal ? "Update Meal" : "Add Meal➕"}</button>
      </form>

      {filteredPlans.length > 0 && (
        <div className="clear-section">
          <button className="clear-btn" onClick={handleClearAllMeals}>
            🗑️ Clear All Meals
          </button>
        </div>
      )}

      {/* 🛒 Shopping List */}
      {shoppingList.length > 0 && (
        <div className="shopping-list">
          <h2>🛍️ Shopping List</h2>
          <ul>
            {shoppingList.map((item, i) => (
              <li key={i}>
                {item}
                <button className="delete-item-btn" onClick={() => handleDeleteShoppingItem(i)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 📅 Meals Section by Day */}
      <div className="mealplan-list">
        <h2>🍽️ Added Meals</h2>
        {filteredPlans.length === 0 ? (
          <p className="no-meals">No meals added yet.</p>
        ) : (
          filteredPlans.map((plan) => (
            <div key={plan._id} className="day-card">
              <h2>{plan.day}</h2>
              {plan.meals.map((meal) => (
                <div key={meal._id} className="meal-card">
                  <h3>{meal.name}</h3>
                  <p>
                    <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
                  </p>
                  <div className="meal-actions">
                    <button onClick={() => handleEditMeal(plan.day, meal)}>✏️</button>
                    <button onClick={() => handleDeleteMeal(plan.day, meal._id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
