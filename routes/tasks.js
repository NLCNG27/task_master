const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const authMiddleware = require("../middleware/auth");

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;
    const task = new Task({
        title,
        description,
        dueDate,
        priority,
        status,
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
    const { title, description, dueDate, priority, status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, description, dueDate, priority, status },
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
    // console.log(`Attempting to delete task with id ${req.params.id}`);
    // Task.findByIdAndDelete(req.params.id)
    //     .then((task) => {
    //         if (task) {
    //             console.log(`Deleted task with id ${req.params.id}`);
    //             res.json({ message: "Task deleted successfully" });
    //         } else {
    //             console.log(`No task found with id ${req.params.id}`);
    //             res.status(404).json({ message: "No task found with that ID" });
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(
    //             `Error deleting task with id ${req.params.id}: ${error}`
    //         );
    //         res.status(400).json("Error: ", error);
    //     });
});

module.exports = router;
