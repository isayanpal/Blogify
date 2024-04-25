const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Register user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        message: "User registered",
      });
    } else {
      throw new Error("Invalid user data");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    // check for user email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const PassOk = await bcrypt.compare(req.body.password, user.password);
    if (!PassOk) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json({
      info,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, getUser };
