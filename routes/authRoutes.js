const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

/* =========================
   REGISTER ADMIN (Run Once)
========================== */
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = new Admin({
      email: req.body.email,
      password: hashedPassword
    });

    await admin.save();

    res.json({ message: "Admin registered" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

/* =========================
   LOGIN ADMIN
========================== */
router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      "secretkey"
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
