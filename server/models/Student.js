const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  registration_number: String,
  department: String,
  feesPaid: { type: Boolean, default: false },
  paymentAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Student", StudentSchema);
