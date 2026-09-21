const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
function generateToken(payload){
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"});
}
// -------------------------------------------
//                Signup
// -------------------------------------------
async function SignUp(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role === "Provider" ? "Provider" : "Customer",
    });

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
}

// -------------------------------------------
//                Login
// -------------------------------------------
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if(!email || !password ){
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await user.findOne({ email: email.toLowerCase() });
    if(!User){
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ success: false, message: "Login Failed" });
  }
}

// -------------------------------------------
//                Login
// -------------------------------------------
async function getMe( req, res ) {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if(!user){
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Get me error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
}
module.exports = {SignUp, login, getMe};