const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Withdrawn'], default: 'Pending' },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

});

module.exports = mongoose.model('Task', TaskSchema);