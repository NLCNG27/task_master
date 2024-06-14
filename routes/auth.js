const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Middleware to verify token and attach user to request
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

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

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get current user
router.get("/me", authMiddleware, (req, res) => {
    res.json(req.user);
});


// Logout a user
router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});




module.exports = router;