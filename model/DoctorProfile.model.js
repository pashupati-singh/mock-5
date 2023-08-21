const mongoose = require("mongoose");

const DocProSchema = mongoose.Schema({
  name: String,
  image: String,
  specialization: String,
  experience: Number,
  location: String,
  date: String,
  slot: Number,
  fee: Number,
  userID: String,
});

const DocProModel = mongoose.model("/DocPro", DocProSchema);

module.exports = { DocProModel };
