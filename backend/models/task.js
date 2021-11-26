const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// A task should have a name, a description, a due date, an associated type
// (is it for a class, is it for work, or is it just an activity), maybe a
// starting date and maybe an optional color selection
let taskSchema = new Schema(
  {
    // Name of the task.
    title: {
      type: String,
      required: true
    },

    // Optional description of the task.
    description: String,

    // Date task was added to database, automatically set to Date.now()
    createdDate: {
      type: Date,
      required: true
    },

    // due date of the task.
    dueDate: {
      type: Date,
    },
    
    // start date of the task.
    startDate: {
      type: Date,
    },

    // User who created task
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },

    // Task status
    status: {
      type: String,
      default: 'backlog'
    },

    // Parent task(s) - depend on this task
    parents: [{type: mongoose.Schema.Types.ObjectId, ref: 'task'}],
    
    // Dependencies for the task
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'task'}],

    // Whether or not task is blocked by dependencies 
    blocked: Boolean,

    // The chronicle holding this task
    chronicle: {
      type: String,
      required: false
    }
  });

const task = mongoose.model("task", taskSchema);

module.exports = task;
