import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import "../Style/RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Comments & Ratings
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  // editing
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingRating, setEditingRating] = useState(0);

  // current user from localStorage (expected shape: { _id, name, email, ... })
  const user = JSON.parse(localStorage.getItem("user"));

  // ---------- recipes array (kept inline as you requested) ----------
  useEffect(() => {
    const recipes = [
      {
        id: 1,
        title: "Spaghetti Carbonara",
        category: "Italian",
        image: "Spaghetti_Carbonara.png",
        description: "A creamy Italian pasta made with eggs, cheese, pancetta, and pepper.",
        ingredients: [
          "400g spaghetti",
          "200g pancetta or guanciale",
          "4 large eggs",
          "100g Pecorino Romano cheese",
          "Black pepper",
          "Salt"
        ],
        instructions: [
          "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
          "Cut pancetta into small cubes and cook until crispy.",
          "Whisk eggs with grated cheese and black pepper.",
          "Drain pasta and reserve 1 cup of pasta water.",
          "Combine hot pasta and pancetta, remove from heat.",
          "Add egg mixture and mix quickly until creamy.",
          "Serve immediately with extra cheese and pepper."
        ],
        prepTime: "15 minutes",
        cookTime: "20 minutes",
        servings: "4 people"
      },
      {
        id: 2,
        title: "Vegetable Fried Rice",
        category: "Veg Food",
        image: "veg_fried_rice.png",
        description: "A quick and delicious rice dish tossed with veggies and soy sauce.",
        ingredients: [
          "2 cups cooked rice (preferably cooled)",
          "2 tbsp oil",
          "1 onion (finely chopped)",
          "1 carrot (finely chopped)",
          "1/2 cup capsicum (bell pepper, chopped)",
          "1/2 cup cabbage (shredded)",
          "1/4 cup beans (chopped)",
          "2-3 tbsp soy sauce",
          "1 tbsp vinegar",
          "1 tsp black pepper powder",
          "Salt to taste",
          "2 green onions (for garnish)"
        ],
        instructions: [
          "Heat oil in a wok or pan on high flame.",
          "Add onions and sauté until translucent.",
          "Add all chopped vegetables and stir-fry for 2-3 minutes.",
          "Add cooked rice, soy sauce, vinegar, pepper, and salt.",
          "Toss everything on high flame for 2-3 minutes until evenly mixed.",
          "Garnish with chopped green onions and serve hot."
        ],
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        servings: "2-3 people"
      },
      {
        id: 3,
        title: "Chocolate Brownies",
        category: "Dessert",
        image: "brownies.png",
        description: "Rich, fudgy brownies made with dark chocolate and a hint of coffee.",
        ingredients: ["200g dark chocolate", "150g butter", "200g sugar", "3 large eggs", "100g flour", "1 tsp vanilla extract"],
        instructions: [
          "Preheat oven to 180°C.",
          "Melt chocolate and butter together.",
          "Whisk eggs and sugar until fluffy.",
          "Mix chocolate with eggs.",
          "Fold in flour and vanilla.",
          "Pour into tray and bake for 25 mins.",
          "Cool, cut, and serve."
        ],
        prepTime: "15 minutes",
        cookTime: "25 minutes",
        servings: "8 servings"
      },
      {
        id: 4,
        title: "Greek Salad",
        category: "Salad",
        image: "greek_pasta_salad.png",
        description: "A refreshing Mediterranean salad made with crisp vegetables, feta cheese, and olives, tossed in a simple olive oil dressing.",
        ingredients: [
          "2 cups chopped cucumber",
          "2 cups cherry tomatoes (halved)",
          "1 red onion (thinly sliced)",
          "1 green bell pepper (sliced)",
          "1/2 cup Kalamata olives",
          "100g feta cheese (cubed or crumbled)",
          "3 tbsp olive oil",
          "1 tbsp red wine vinegar or lemon juice",
          "1 tsp dried oregano",
          "Salt and black pepper to taste"
        ],
        instructions: [
          "In a large bowl, combine cucumber, tomatoes, onion, and bell pepper.",
          "Add olives and feta cheese on top.",
          "In a small bowl, whisk olive oil, vinegar, oregano, salt, and pepper.",
          "Pour dressing over salad and toss gently.",
          "Serve immediately or chill for 10-15 minutes before serving."
        ],
        prepTime: "15 mins",
        cookTime: "0 mins",
        servings: "2-3 people"
      },
      {
        id: 5,
        title: "Margherita Pizza",
        category: "Italian",
        image: "Margherita_pizza.png",
        description: "A classic Italian pizza topped with tomato sauce, fresh mozzarella, basil leaves, and a drizzle of olive oil for a simple yet flavorful taste.",
        ingredients: [
          "1 pizza dough (store-bought or homemade)",
          "1/2 cup tomato sauce or pizza sauce",
          "150g fresh mozzarella cheese (sliced)",
          "Fresh basil leaves",
          "1 tbsp olive oil",
          "Salt to taste",
          "1/2 tsp dried oregano (optional)"
        ],
        instructions: [
          "Preheat oven to 220°C (425°F).",
          "Roll out the pizza dough onto a baking tray or pizza stone.",
          "Spread tomato sauce evenly over the base.",
          "Place mozzarella slices and fresh basil leaves on top.",
          "Drizzle olive oil and sprinkle a pinch of salt and oregano.",
          "Bake for 10-12 minutes until the crust is golden and cheese is melted.",
          "Slice and serve hot."
        ],
        prepTime: "15 mins",
        cookTime: "12 mins",
        servings: "2-3 people"
      },
      {
        id: 6,
        title: "Butter Chicken",
        category: "North Indian",
        image: "butter_chicken.png",
        description: "A rich and creamy North Indian curry made with marinated chicken cooked in a buttery tomato-based sauce with aromatic spices.",
        ingredients: [
          "500g boneless chicken (cut into pieces)",
          "1 cup yogurt (curd)",
          "1 tbsp lemon juice",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp garam masala",
          "2 tbsp butter",
          "1 tbsp oil",
          "1 large onion (finely chopped)",
          "2 tomatoes (pureed)",
          "1 tbsp ginger-garlic paste",
          "1/2 cup fresh cream",
          "1 tsp kasuri methi (dried fenugreek leaves)",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        instructions: [
          "Marinate chicken with yogurt, lemon juice, turmeric, chili powder, garam masala, and salt for at least 1 hour.",
          "Heat oil and butter in a pan, cook marinated chicken until lightly browned; remove and set aside.",
          "In the same pan, sauté onions until golden brown.",
          "Add ginger-garlic paste and tomato puree; cook until oil separates.",
          "Add chili powder, garam masala, and salt; mix well.",
          "Add cooked chicken pieces and simmer for 5-7 minutes.",
          "Pour in fresh cream and sprinkle kasuri methi; cook for 2-3 minutes.",
          "Garnish with coriander and serve hot with naan or rice."
        ],
        prepTime: "1 hour 15 mins",
        cookTime: "30 mins",
        servings: "3-4 people"
      },
      {
        id: 7,
        title: "Masala Dosa",
        category: "South Indian",
        image: "masala_dosa.png",
        description: "A crispy South Indian crepe made from fermented rice and lentil batter, filled with spiced potato masala.",
        ingredients: [
          "2 cups rice",
          "1/2 cup urad dal",
          "2 tbsp chana dal",
          "1/4 tsp fenugreek seeds",
          "Salt, water, oil as needed",
          "4 boiled potatoes",
          "1 onion, 2 green chilies, curry leaves",
          "1 tsp mustard seeds, 1/4 tsp turmeric",
          "2 tbsp oil, coriander, lemon juice"
        ],
        instructions: [
          "Soak and grind rice, dals, and methi into smooth batter; ferment overnight.",
          "Add salt and mix well.",
          "For filling: heat oil, add mustard, dals, chilies, onions, turmeric, potatoes.",
          "Cook 3-4 mins, add coriander and lemon juice.",
          "Spread batter on hot tawa, drizzle oil, cook until crisp.",
          "Place potato masala in center, fold, and serve hot."
        ],
        prepTime: "12 hrs",
        cookTime: "30 mins",
        servings: "8-10 dosas"
      },
      {
        id: 8,
        title: "Caesar Salad",
        category: "Salad",
        image: "Caesar_Salad.png",
        description: "A classic salad made with crisp romaine lettuce, crunchy croutons, Parmesan cheese, and a creamy Caesar dressing.",
        ingredients: [
          "4 cups romaine lettuce (chopped)",
          "1/2 cup croutons",
          "1/4 cup grated Parmesan cheese",
          "1/4 cup Caesar dressing",
          "1 tsp lemon juice (optional)",
          "Salt and black pepper to taste"
        ],
        instructions: [
          "In a large bowl, combine chopped romaine lettuce and croutons.",
          "Add Caesar dressing and toss well to coat evenly.",
          "Sprinkle grated Parmesan cheese on top.",
          "Add a squeeze of lemon juice and season with salt and pepper if desired.",
          "Serve immediately."
        ],
        prepTime: "10 mins",
        cookTime: "0 mins",
        servings: "2-3 people"
      },
      {
        id: 9,
        title: "Pad Thai",
        category: "Asian",
        image: "Pad_Thai.png",
        description: "A popular Thai stir-fried noodle dish made with rice noodles, vegetables, eggs, tofu or shrimp, and a tangy-sweet Pad Thai sauce.",
        ingredients: [
          "200g rice noodles",
          "2 tbsp vegetable oil",
          "2 cloves garlic (minced)",
          "1/2 cup tofu (cubed) or shrimp",
          "1 egg",
          "1 cup bean sprouts",
          "2 green onions (chopped)",
          "2 tbsp tamarind paste",
          "2 tbsp fish sauce",
          "1 tbsp soy sauce",
          "1 tbsp sugar",
          "1/4 cup roasted peanuts (chopped)",
          "Lime wedges for serving",
          "Cilantro for garnish"
        ],
        instructions: [
          "Cook rice noodles according to package instructions; drain and set aside.",
          "Heat oil in a wok or large pan over medium-high heat. Sauté garlic until fragrant.",
          "Add tofu or shrimp and cook until lightly browned or cooked through.",
          "Push ingredients to one side, crack in the egg, scramble, and mix with tofu/shrimp.",
          "Add cooked noodles, tamarind paste, fish sauce, soy sauce, and sugar; toss well.",
          "Stir in bean sprouts and green onions; cook for 1-2 minutes.",
          "Serve hot, garnished with chopped peanuts, lime wedges, and cilantro."
        ],
        prepTime: "15 mins",
        cookTime: "15 mins",
        servings: "2-3 people"
      },
      {
        id: 10,
        title: "Tiramisu",
        category: "Dessert",
        image: "Tiramisu.png",
        description: "A classic Italian no-bake dessert made with layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.",
        ingredients: [
          "200g ladyfingers (savoiardi)",
          "250g mascarpone cheese",
          "3 large eggs (separated)",
          "100g sugar",
          "1 cup strong brewed coffee (cooled)",
          "2 tbsp coffee liqueur (optional)",
          "Cocoa powder for dusting"
        ],
        instructions: [
          "Separate egg yolks and whites.",
          "Whisk egg yolks with sugar until pale and creamy; fold in mascarpone cheese.",
          "Beat egg whites until stiff peaks form and gently fold into mascarpone mixture.",
          "Mix coffee with coffee liqueur in a shallow dish.",
          "Dip ladyfingers briefly in coffee mixture and layer them in a serving dish.",
          "Spread half of the mascarpone mixture over the ladyfingers.",
          "Repeat with another layer of soaked ladyfingers and remaining mascarpone.",
          "Cover and refrigerate for at least 4 hours or overnight.",
          "Dust with cocoa powder before serving."
        ],
        prepTime: "20 mins",
        cookTime: "0 mins (plus chilling 4 hours)",
        servings: "4-6 people"
      },
      // ... (you already had many more entries — include them here exactly as in your file)
      // For brevity I didn't repeat every recipe here in this snippet comment,
      // but in your actual file paste the full array you already have.
    ];

    // find recipe (recipes list uses numeric id)
    const foundRecipe = recipes.find(r => r.id === parseInt(id));
    if (foundRecipe) setRecipe(foundRecipe);

    // local comments from localStorage (fallback in case backend not used)
    // but we will call backend below to populate actual comments
    setLoading(false);
  }, [id]);

  // ---------- Comments backend integration ----------
  const API_BASE = "http://localhost:5000/api"; // change if your backend base is different

  // fetch comments from backend
  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_BASE}/comments/${id}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments);
        // compute average rating
        if (data.comments.length > 0) {
          const avg = data.comments.reduce((s, c) => s + (Number(c.rating) || 0), 0) / data.comments.length;
          setAverageRating(Number(avg.toFixed(1)));
        } else {
          setAverageRating(0);
        }
      } else {
        // fallback: try reading localStorage (existing app used that)
        const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        setComments(stored);
        if (stored.length > 0) {
          const avg = stored.reduce((s, c) => s + (Number(c.rating) || 0), 0) / stored.length;
          setAverageRating(Number(avg.toFixed(1)));
        } else {
          setAverageRating(0);
        }
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      // fallback to localStorage
      const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
      setComments(stored);
      if (stored.length > 0) {
        const avg = stored.reduce((s, c) => s + (Number(c.rating) || 0), 0) / stored.length;
        setAverageRating(Number(avg.toFixed(1)));
      } else {
        setAverageRating(0);
      }
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Add comment (POST)
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      alert("Please log in to add a comment.");
      return;
    }
    if (!newComment.trim()) return;

    const payload = {
      recipeId: id,
      userId: user._id || user.id || user.email, // whatever your user id field is
      userName: user.name || user.email,
      commentText: newComment.trim(),
      rating: rating || 0,
    };

    try {
      const res = await fetch(`${API_BASE}/comments/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setNewComment("");
        setRating(0);
        fetchComments();
      } else {
        // If backend rejects, fallback to localStorage
        console.warn("Add comment response:", data);
        const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        const fallbackComment = {
          _id: "local-" + Date.now(),
          recipeId: id,
          userId: payload.userId,
          userName: payload.userName,
          commentText: payload.commentText,
          rating: payload.rating,
          createdAt: new Date().toISOString(),
        };
        const updated = [fallbackComment, ...stored];
        localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
        setComments(updated);
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      // fallback to localStorage
      const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
      const fallbackComment = {
        _id: "local-" + Date.now(),
        recipeId: id,
        userId: payload.userId,
        userName: payload.userName,
        commentText: payload.commentText,
        rating: payload.rating,
        createdAt: new Date().toISOString(),
      };
      const updated = [fallbackComment, ...stored];
      localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
      setComments(updated);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const res = await fetch(`${API_BASE}/comments/delete/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchComments();
      } else {
        // fallback: remove from localStorage
        const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        const updated = stored.filter(c => c._id !== commentId);
        localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
        setComments(updated);
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      // fallback local
      const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
      const updated = stored.filter(c => c._id !== commentId);
      localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
      setComments(updated);
    }
  };

  // Start editing
  const handleStartEdit = (c) => {
    setEditingCommentId(c._id);
    setEditingText(c.commentText);
    setEditingRating(c.rating || 0);
  };

  // Save edited comment (PUT)
  const handleSaveEdit = async (commentId) => {
    if (!editingText.trim()) return alert("Comment cannot be empty.");
    try {
      const res = await fetch(`${API_BASE}/comments/update/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText: editingText.trim(), rating: editingRating || 0 }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingCommentId(null);
        setEditingText("");
        setEditingRating(0);
        fetchComments();
      } else {
        // fallback to local edit
        const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
        const updated = stored.map(c => c._id === commentId ? { ...c, commentText: editingText, rating: editingRating } : c);
        localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
        setComments(updated);
        setEditingCommentId(null);
      }
    } catch (err) {
      console.error("Error updating comment:", err);
      // fallback local edit
      const stored = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
      const updated = stored.map(c => c._id === commentId ? { ...c, commentText: editingText, rating: editingRating } : c);
      localStorage.setItem(`comments_${id}`, JSON.stringify(updated));
      setComments(updated);
      setEditingCommentId(null);
    }
  };

  // Share (same as before)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: "Check out this recipe!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Recipe link copied to clipboard!");
    }
  };

  // Add to favorites (keeps your existing localStorage favorites behavior)
  const handleAddFavorite = () => {
    const userLS = JSON.parse(localStorage.getItem("user"));
    if (!userLS?.email) {
      alert("Please log in to add favorites.");
      return;
    }

    const allFav = JSON.parse(localStorage.getItem("favoritesByUser")) || {};
    const userFav = allFav[userLS.email] || [];

    if (userFav.some((r) => r.id === recipe.id)) {
      alert("This recipe is already in your favorites!");
      return;
    }

    const updated = [...userFav, recipe];
    allFav[userLS.email] = updated;
    localStorage.setItem("favoritesByUser", JSON.stringify(allFav));
    window.dispatchEvent(new Event("favoritesUpdated"));
    alert(`${recipe.title} has been added to your favorites ❤️`);
  };

  const handleBackNavigation = () => {
    const sourcePage = location.state?.from || 'allrecipe';
    navigate(`/${sourcePage}`);
  };

  // render loading or not found
  if (loading) return <div className="recipe-details-container">Loading...</div>;
  if (!recipe) {
    return (
      <div className="recipe-details-container">
        <h1>Recipe not found</h1>
        <button onClick={handleBackNavigation}>Back to Recipes</button>
      </div>
    );
  }

  return (
    <div className="recipe-details-container">
      <button className="back-btn" onClick={handleBackNavigation}>
        ← Back to Recipes
      </button>

      <div className="recipe-header">
        <div className="image-wrapper">
          <img src={`/${recipe.image}`} alt={recipe.title} className="recipe-image" />
          <div className="action-buttons">
            <button className="share-btn" onClick={handleShare}>📤 Share Recipe</button>
            <button className="favorite-btn" onClick={handleAddFavorite}>❤️ Add to Favorites</button>
          </div>
        </div>

        <div className="recipe-meta">
          <h1>{recipe.title}</h1>
          <p className="category">{recipe.category}</p>
          <p className="description">{recipe.description}</p>
          <p className="avg-rating">Average Rating: {averageRating} ⭐</p>

          <div className="recipe-stats">
            <div className="stat">
              <span className="stat-label">Prep Time:</span>
              <span className="stat-value">{recipe.prepTime}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Cook Time:</span>
              <span className="stat-value">{recipe.cookTime}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Servings:</span>
              <span className="stat-value">{recipe.servings}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>🍽️ Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>👨‍🍳 Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2>Comments & Reviews</h2>

        <form className="comment-form" onSubmit={handleAddComment}>
          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="rating">
            <label style={{ marginRight: 8 }}>Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={rating >= star ? "star active" : "star"}
                onClick={() => setRating(star)}
                style={{ cursor: 'pointer', marginRight: 6 }}
              >
                ★
              </span>
            ))}
          </div>
          <button type="submit">Post Comment</button>
        </form>

        <div className="comment-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet — be the first!</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="comment-card">
                <div className="comment-header">
                  <strong>{c.userName || c.user}</strong>
                  <span>⭐ {c.rating}</span>
                </div>

                {editingCommentId === c._id ? (
                  <>
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <div style={{ marginTop: 8 }}>
                      <label style={{ marginRight: 8 }}>Rating:</label>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className={editingRating >= s ? "star active" : "star"}
                          onClick={() => setEditingRating(s)}
                          style={{ cursor: 'pointer', marginRight: 6 }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="comment-footer" style={{ marginTop: 8 }}>
                      <button onClick={() => handleSaveEdit(c._id)}>Save</button>
                      <button onClick={() => { setEditingCommentId(null); setEditingText(""); }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{c.commentText || c.text}</p>
                    <div className="comment-footer">
                      <small>{new Date(c.createdAt || c.date || c.updatedAt || Date.now()).toLocaleString()}</small>
                      {user && (user._id === c.userId || user.id === c.userId || user.email === c.userId) && (
                        <div>
                          <button onClick={() => handleStartEdit(c)}>Edit</button>
                          <button onClick={() => handleDeleteComment(c._id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
