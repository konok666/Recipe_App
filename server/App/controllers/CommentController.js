const Comment = require("../models/CommentModel");

// ➕ Add a new comment
const addComment = async (req, res) => {
  try {
    const { recipeId, userId, userName, commentText, rating } = req.body;

    if (!recipeId || !userId || !commentText) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (recipeId, userId, commentText)",
      });
    }

    const newComment = new Comment({
      recipeId,
      userId,
      userName,
      commentText,
      rating,
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while adding comment" });
  }
};

// 📖 Get all comments for a specific recipe
const getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch comments" });
  }
};

// ✏️ Update a comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentText, rating } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { commentText, rating },
      { new: true }
    );

    if (!updatedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update comment" });
  }
};

// ❌ Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete comment" });
  }
};

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment,
};
