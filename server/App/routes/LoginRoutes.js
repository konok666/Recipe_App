const express = require("express");
const {
  loginUser,
  getAllLogins,
  getLoginById,
  updateLogin,
  deleteLogin,
} = require("../controllers/LoginController");

const router = express.Router();

// POST /api/login → Login user
router.post("/", loginUser);

// GET /api/login → Get all logins
router.get("/", getAllLogins);

// GET /api/login/:id → Get one login
router.get("/:id", getLoginById);

// PUT /api/login/:id → Update login
router.put("/:id", updateLogin);

// DELETE /api/login/:id → Delete login
router.delete("/:id", deleteLogin);

module.exports = router;
