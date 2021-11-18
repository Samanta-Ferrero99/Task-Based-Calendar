const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *  A "chronicle" is a group of related tasks with a chain of dependency.
 */
let chronicleSchema = new Schema({
  // Name of the chronicle.
  title: {
    type: String,
    required: true
  },

  // Optional description of the chronicle.
  description: String,

  // Type (work, school, or life) of tasks held in the chonicle.
  type: {
    type: String,
    required: true
  },

  // Date chronicle was added to database, automatically set to Date.now()
  createdDate: {
    type: Date,
    required: true
  },

  // Required due date of all tasks held in the chronicle.
  dueDate: {
    type: Date,
  },

  // Optional selection of a color to represent the chronicle.
  color: String,

  // The chronicle's priority
  priority: {
    type: String,
  },

  // User who created the chronicle
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },

  // The tasks contained in the chronicle
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'task'}],

});

const chronicle = mongoose.model('chronicle', chronicleSchema);

module.exports = chronicle;
