const SignupModel = require("../models/SignupModel");
const LoginModel = require("../models/LoginModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ LOGIN user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await SignupModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Save login data in Login collection
    const hashedPassword = await bcrypt.hash(password, 10);
    const loginData = await LoginModel.create({
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      loginData,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// ✅ View all logins
exports.getAllLogins = async (req, res) => {
  try {
    const logins = await LoginModel.find().sort({ loginTime: -1 });
    res.status(200).json({ success: true, count: logins.length, logins });
  } catch (error) {
    console.error("Get All Logins Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ View login by ID
exports.getLoginById = async (req, res) => {
  try {
    const login = await LoginModel.findById(req.params.id);
    if (!login) {
      return res.status(404).json({ success: false, message: "Login not found" });
    }
    res.status(200).json({ success: true, login });
  } catch (error) {
    console.error("Get Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update login by ID
exports.updateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const updateData = { email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedLogin = await LoginModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedLogin) {
      return res.status(404).json({ success: false, message: "Login not found" });
    }

    res.status(200).json({
      success: true,
      message: "Login updated successfully",
      login: updatedLogin,
    });
  } catch (error) {
    console.error("Update Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete login by ID
exports.deleteLogin = async (req, res) => {
  try {
    const deletedLogin = await LoginModel.findByIdAndDelete(req.params.id);
    if (!deletedLogin) {
      return res.status(404).json({ success: false, message: "Login not found" });
    }
    res.status(200).json({ success: true, message: "Login deleted successfully" });
  } catch (error) {
    console.error("Delete Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
