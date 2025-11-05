const express = require("express");
const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");

const router = express.Router();

// routes
router.post("/add", addComment);
router.get("/:recipeId", getComments);
router.put("/update/:id", updateComment);
router.delete("/delete/:id", deleteComment);

module.exports = router;
