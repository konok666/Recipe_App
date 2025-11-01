const express = require("express");
const {
  loginUser,
  getAllLogins,
  getLoginById,
  updateLogin,
  deleteLogin,
} = require("../controllers/LoginController");

const router = express.Router();

// ✅ Login (insert)
router.post("/login", loginUser);

// ✅ Get all logins
router.get("/login", getAllLogins);

// ✅ Get single login by ID
router.get("/login/:id", getLoginById);

// ✅ Update login by ID
router.put("/login/:id", updateLogin);

// ✅ Delete login by ID
router.delete("/login/:id", deleteLogin);

module.exports = router;
