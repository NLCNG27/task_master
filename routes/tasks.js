const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");

// Create a new task
router.post("/", async (req, res) => {
    const newTask = new Task(req.body);

    try {
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task
router.put("/:id", async (req, res) => { 
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Deleting a task
router.delete("/:id", (req, res) => {
    console.log(`Attempting to delete task with id ${req.params.id}`);
    Task.findByIdAndDelete(req.params.id)
        .then((task) => {
            if (task) {
                console.log(`Deleted task with id ${req.params.id}`);
                res.json({ message: "Task deleted successfully" });
            } else {
                console.log(`No task found with id ${req.params.id}`);
                res.status(404).json({ message: "No task found with that ID" });
            }
        })
        .catch((error) => {
            console.log(
                `Error deleting task with id ${req.params.id}: ${error}`
            );
            res.status(400).json("Error: ", error);
        });
});



module.exports = router;
