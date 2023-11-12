const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: [String],
  },
  category: {
    type: String,
  },
  difficultyLevel: {
    type: String,
  },
  estimatedTime: {
    type: String,
  },
  skillsRequired: {
    type: [String],
  },
  resources: {
    type: [String],
  },
  score: {
    type: Number,
    default: 0,
  },
  dueDate: {
    type: Date,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
