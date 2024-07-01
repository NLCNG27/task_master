const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const authMiddleware = require("../middleware/auth");

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority, status, category } = req.body;
    const task = new Task({
        title,
        description,
        dueDate,
        priority,
        status,
        category,
        user: req.user._id,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task
router.put("/:id", authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority, status, category } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, description, dueDate, priority, status, category },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting a task
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        }); // Ensure the task belongs to the logged-in user

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
