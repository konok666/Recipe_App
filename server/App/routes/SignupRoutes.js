const express = require("express");
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/SignupController");

const router = express.Router();

// Routes
router.post("/signup", registerUser);      // Create user
router.get("/signup", getAllUsers);        // Get all users
router.get("/signup/:id", getUserById);    // Get single user
router.put("/signup/:id", updateUser);     // Update user
router.delete("/signup/:id", deleteUser);  // Delete user

module.exports = router;
