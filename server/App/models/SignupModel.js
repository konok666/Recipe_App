const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  signupTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Signup", SignupSchema);
