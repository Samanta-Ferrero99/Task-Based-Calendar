const express = require("express");
const taskModel = require("../models/task");
const app = express();
const router = express.Router();

// Test
router.get("/test", async (request, response) => {
  response.send("Hey!!");
});

// POST endpoint for creating new task
app.post("/:user_id/create-task", async (request, response) => {
  const task = new taskModel(request.body);
  try {
    await task.save();
    response.send(task);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET endpoint for getting all tasks.
app.get("/", async (request, response) => {
  const tasks = await taskModel.find({});

  try {
    response.send(tasks);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET endpoint for getting a single task.
app.get("/:task_id", async (request, response) => {
  try {
    const task = await taskModel.findById(request.params.task_id);
    response.send(task);
  } catch (error) {
    response.status(404).send(error);
  }
});

// UPDATE a task
app.patch("/edit-task/:task_id", async (request, response) => {
  try {
    const task = await taskModel.findById(request.params.task_id);
    if (request.body.title) {
      task.title = request.body.title;
    }
    if (request.body.description) {
      task.description = request.body.description;
    }
    if (request.body.createdDate) {
      task.createdDate = request.body.createdDate;
    }
    if (request.body.dueDate) {
      task.dueDate = request.body.dueDate;
    }
    await task.save();
    response.send(task);
  } catch (error) {
    response.status(404).send(error);
  }
});

// DELETE endpoint for a single task
app.delete('/delete-task/:task_id', async (request, response) => {
  try {
    const task = await taskModel.findByIdAndRemove(request.params.task_id);
    response.status(204).send();
  } catch (error) {
    response.status(404).send(error);
  }
});

module.exports = app;