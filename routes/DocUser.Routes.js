const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const { DoctorModel } = require("../model/DoctorUser");
const DoctUserRoutes = express.Router();
require("dotenv").config();
DoctUserRoutes.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.json({ msg: "Password not match" });
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) return res.json({ err: err });
      else if (hash) {
        const user = await DoctorModel({
          email,
          password: hash,
          confirmPassword: hash,
        });
        await user.save();
        res.json({ msg: "user is added successfully" });
      }
    });
  } catch (error) {
    res.json({ err: error });
  }
});

DoctUserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await DoctorModel.findOne({ email });

  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.json({ msg: "Invalid Credentials" });
        else if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.SECKEY);
          res.json({ msg: "Login succesFull", token });
        }
      });
    } else {
      res.json({ msg: "register first" });
    }
  } catch (error) {
    res.json({ err: error });
  }
});

module.exports = { DoctUserRoutes };
