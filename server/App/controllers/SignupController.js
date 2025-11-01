const SignupModel = require("../models/SignupModel");
const bcrypt = require("bcrypt");

// ✅ Register (Insert)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await SignupModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new SignupModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ View all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await SignupModel.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ View single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await SignupModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    // If password is updated, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await SignupModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await SignupModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
