// ✅ Import Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Import Routes
const signupRoutes = require("./App/routes/SignupRoutes");
const loginRoutes = require("./App/routes/LoginRoutes");
const cookbookRoutes = require("./App/routes/CookbookRoutes");
const mealPlannerRoutes = require("./App/routes/MealPlannerRoutes");
const commentRoutes = require("./App/routes/CommentRoutes");

// ✅ Register Routes
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/cookbook", cookbookRoutes);
app.use("/api/mealplanner", mealPlannerRoutes);
app.use("/api/comments", commentRoutes); // 👈 Proper base route for comments

// ✅ Default Route (Optional)
app.get("/", (req, res) => {
  res.send("🍳 Recipe App Backend is running successfully!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
