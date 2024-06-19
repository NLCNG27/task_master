const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");


// Register a new user
router.post("/register", async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { username, email, password } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists:", existingUser);
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });    
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: error.message });
    }

});

// Login a user
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        // generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        console.log('logging in user:', user);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
    const { username, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { username, email },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Logout a user
router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

// Get current user
router.get("/me", authMiddleware, (req, res) => {
    console.log('Requested user:', req.user);
    res.json(req.user);
});




module.exports = router;