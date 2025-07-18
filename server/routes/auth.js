const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");

// Email & phone regex for basic validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validate email & phone
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ msg: "Invalid phone number" });
  }

  try {
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const student = new Student({ name, email, phone, password: hash });
    await student.save();

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error during signup" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    res.json({ success: true, student });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
