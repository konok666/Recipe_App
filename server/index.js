const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const signupRoutes = require("./App/routes/SignupRoutes");
const loginRoutes = require("./App/routes/LoginRoutes"); // ✅ add this

app.use("/api", signupRoutes);
app.use("/api", loginRoutes); // ✅ register login route

app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
