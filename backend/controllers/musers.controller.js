// Import necessary modules
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const db = require("../models");
const User = db.user;

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get user by ID
async function getUser(req, res) {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update user information
async function updateUser(req, res) {
  const userId = req.params.userId;
  const {
    username,
    email,
    password,
    roles,
    phone,
    address
  } = req.body;

  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    
    if (password) {
      const hashedPassword = await bcrypt.hashSync(password, 8);
      user.password = hashedPassword;
    }
   
    if (roles) user.roles = roles;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // Save updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete user by ID
async function deleteUser(req, res) {
  const userId = req.params.userId;

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Create a new user
async function createUser(req, res) {
  const {
    username,
    email,
    password,
    roles,
    phone,
    address
  } = req.body;

  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      roles,
      phone,
      address
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Export the functions
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser
};
