const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  
});

const task = mongoose.model("task", taskSchema);

module.exports = task;
