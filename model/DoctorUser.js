const mongoose = require("mongoose");

const DocUserSchema = mongoose.Schema({
  email: String,
  password: String,
  confirmPassword: String,
});

const DoctorModel = mongoose.model("DocUser", DocUserSchema);

module.exports = { DoctorModel };
