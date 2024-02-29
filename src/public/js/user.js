const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Método POST para criar um novo usuário
router.post("/register", async (req, res) => {
  const { userID, username, email, password } = req.body;

  // Verifica se o email já está em uso
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "Email already in use" });
  }

  // Cria um novo usuário
  const newUser = new User({ userID, username, email, password });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
