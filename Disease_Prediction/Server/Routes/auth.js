const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth");
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs'); // Add this line

dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = crypto.randomBytes(64).toString('hex');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password); // Debugging

  try {
    let user = await User.findOne({ email }).select("+password");
    console.log("User found:", user); // Debugging
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Password matched, login successful");

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, redirectUrl: "/dashboard" });
      }
    );

  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Logout a user
router.post("/logout", authMiddleware, (req, res) => {
  // Invalidate the token or perform any necessary cleanup
  res.json({ msg: "User logged out successfully" });
});

// Get authenticated user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Route to handle file upload and process with ML model
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log("File uploaded:", req.file); // Debugging line
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post("http://localhost:1000/predict", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Model result:", response.data); // Debugging line
    res.json({ message: "File uploaded successfully", result: response.data });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Error processing file" });
  }
});

module.exports = router;