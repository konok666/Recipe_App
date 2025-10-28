import React, { useState, useEffect } from "react";
import "../Style/MealPlanner.css";

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

function MealPlanner() {
  // Get current user
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userKey = currentUser ? currentUser.email || currentUser.name : "guest";

  // Load user-specific meal plan
  const loadMealPlan = () => {
    try {
      const saved = localStorage.getItem(`mealPlan_${userKey}`);
      return saved
        ? JSON.parse(saved)
        : {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
          };
    } catch (error) {
      console.error("Error loading meal plan:", error);
      return {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };
    }
  };

  // Load user-specific shopping list
  const loadShoppingList = () => {
    try {
      const saved = localStorage.getItem(`shoppingList_${userKey}`);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading shopping list:", error);
      return [];
    }
  };

  const [mealPlan, setMealPlan] = useState(loadMealPlan);
  const [shoppingList, setShoppingList] = useState(loadShoppingList);
  const [currentDay, setCurrentDay] = useState("Monday");
  const [mealInput, setMealInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");

  // Save meal plan (specific to user)
  useEffect(() => {
    localStorage.setItem(`mealPlan_${userKey}`, JSON.stringify(mealPlan));
  }, [mealPlan, userKey]);

  // Save shopping list (specific to user)
  useEffect(() => {
    localStorage.setItem(`shoppingList_${userKey}`, JSON.stringify(shoppingList));
  }, [shoppingList, userKey]);

  const handleAddMeal = () => {
    if (mealInput.trim() === "") return;

    const updatedPlan = {
      ...mealPlan,
      [currentDay]: [
        ...mealPlan[currentDay],
        {
          name: mealInput.trim(),
          ingredients: ingredientInput
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i !== ""),
        },
      ],
    };

    setMealPlan(updatedPlan);
    setMealInput("");
    setIngredientInput("");
  };

  const handleDeleteMeal = (day, index) => {
    const updatedPlan = {
      ...mealPlan,
      [day]: mealPlan[day].filter((_, i) => i !== index),
    };
    setMealPlan(updatedPlan);
  };

  const handleDeleteShoppingItem = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
  };

  const generateShoppingList = () => {
    const allIngredients = [];
    Object.values(mealPlan).forEach((dayMeals) => {
      dayMeals.forEach((meal) => {
        allIngredients.push(...meal.ingredients);
      });
    });
    const uniqueList = [...new Set(allIngredients.filter((i) => i))];
    setShoppingList(uniqueList);
  };

  return (
    <div className="mealplanner-page">
      <div className="mealplanner-card">
        <h1 className="mealplanner-title">🍽️ Weekly Meal Planner</h1>
        <p className="mealplanner-subtitle">
          Plan your meals for the week and generate your shopping list!
        </p>

        <div className="planner-controls">
          <select
            className="day-selector"
            value={currentDay}
            onChange={(e) => setCurrentDay(e.target.value)}
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter meal name"
            value={mealInput}
            onChange={(e) => setMealInput(e.target.value)}
            className="meal-input"
          />

          <input
            type="text"
            placeholder="Enter ingredients (comma-separated)"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            className="ingredient-input"
          />

          <button className="add-meal-btn" onClick={handleAddMeal}>
            Add Meal
          </button>
        </div>

        <div className="meal-list">
          <h2>{currentDay}'s Meals</h2>
          {mealPlan[currentDay].length === 0 ? (
            <p className="no-meal">No meals planned yet.</p>
          ) : (
            mealPlan[currentDay].map((meal, index) => (
              <div key={index} className="meal-item">
                <div className="meal-content">
                  <strong>{meal.name}</strong>
                  <p className="ingredients">
                    Ingredients: {meal.ingredients.join(", ")}
                  </p>
                </div>
                <button
                  className="delete-meal-btn"
                  onClick={() => handleDeleteMeal(currentDay, index)}
                  title="Delete meal"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <button className="generate-list-btn" onClick={generateShoppingList}>
          Generate Shopping List
        </button>

        {shoppingList.length > 0 && (
          <div className="shopping-list">
            <h2>🛒 Shopping List</h2>
            <ul>
              {shoppingList.map((item, index) => (
                <li key={index} className="shopping-item">
                  <span>{item}</span>
                  <button
                    className="delete-shopping-btn"
                    onClick={() => handleDeleteShoppingItem(index)}
                    title="Delete item"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MealPlanner;
