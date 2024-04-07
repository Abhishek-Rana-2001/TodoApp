const express = require("express");
const router = express.Router();
const User = require("../models/usermodel");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const mySecret = process.env.MY_SECRET


router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const token = jwt.sign({id:user._id, name:user.name}, mySecret)
    res.json({access:token});
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email already in use" });
    } else {
      res.status(401).json({ error: "Error during registration" });
    }
  }
});


router.post("/login", async (req, res) => {
    try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({id:user._id, name:user.name}, mySecret)
    return res.json({id:user._id , access:token});
  } catch (error) {
    res.status(400).send("bad request");
  }
});

module.exports = router;
