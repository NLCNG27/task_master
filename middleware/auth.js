const jwt = require("jsonwebtoken");
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

module.exports = authMiddleware;