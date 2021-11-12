const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A task should have a name, a description, a due date, an associated type
// (is it for a class, is it for work, or is it just an activity), maybe a
// starting date and maybe an optional color selection
let taskSchema = new Schema({
  // Name of the task.
  title: {
    type: String,
    required: true,
  },
  
  // Optional description of the task.
  description: String,

  // Type (work, class, or life) of task.
  typeOfTask: {
    type: String,
    required: true,
  },

  // Optional (?) start date of the task.
  createdDate: Date,

  // Required due date of the task.
  dueDate: {
    type: Date,
    required: true,
  },

  // Optional selection of a color.
  color: String
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
