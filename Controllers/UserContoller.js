const { validationResult } = require("express-validator");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    // validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }
    // Verify the existance of the account
    const { name, age, email, password, Role } = req.body;

    const found = await User.findOne({ email });
    if (found) {
      return res.status(401).json({ message: "You have already registred" });
    }
    // Creation of User
    ///-1- Crypt password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save User in DB
    const newUser = await User.create({
      name,
      age,
      email,
      password: hashedPassword,
      Role,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const Login = async (req, res) => {
  try {
    // validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }

    // Check if the user exists or not
    const { email, password } = req.body;
    const found = await User.findOne({ email });
    if (!found) {
      return res.status(402).json({ message: "You have to register first" });
    }
    // Check for password
    const isMatched = await bcrypt.compare(password, found.password);
    if (!isMatched) {
      return res.status(403).json({ message: "Wrong password" });
    }
    // generate a key : token
    const token = await jwt.sign({ id: found._id }, process.env.SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ found, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { Register, Login };
