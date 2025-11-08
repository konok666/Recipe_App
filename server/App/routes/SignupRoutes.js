const express = require("express");
const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/SignupController");

const router = express.Router();

// ✅ Correct paths — no duplicate "/signup"
router.post("/", registerUser);       // POST /api/signup
router.get("/", getAllUsers);         // GET /api/signup
router.get("/:id", getUserById);      // GET /api/signup/:id
router.put("/:id", updateUser);       // PUT /api/signup/:id
router.delete("/:id", deleteUser);    // DELETE /api/signup/:id

module.exports = router;
