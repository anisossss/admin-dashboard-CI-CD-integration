const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficultyLevel: {
    type: String,
  },
  estimatedTime: {
    type: String,
  },
  skillsRequired: {
    type: [String], // An array of skills required for the task
  },
  resources: {
    type: [String], // An array of necessary resources
  },
  score: {
    type: Number,
    default: 0,
  },
  dueDate: {
    type: Date,
  },
  dependencies: {
    type: [mongoose.Schema.Types.ObjectId], // An array of task IDs that this task depends on
    ref: "Task",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
