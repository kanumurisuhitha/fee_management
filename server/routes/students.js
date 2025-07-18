const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Get all students (without passwords)
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({}, "-password");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Get a student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id, "-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student" });
  }
});

// Update student profile
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student profile" });
  }
});

// Mark fees as paid
router.put("/pay/:id", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ success: false, msg: "Invalid amount" });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { feesPaid: true, paymentAmount: amount },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }

    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Get list of students who paid fees
router.get("/paid/list", async (req, res) => {
  try {
    const paidStudents = await Student.find({ feesPaid: true }, "-password");
    res.json(paidStudents);
  } catch (err) {
    console.error("Error fetching paid students:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
