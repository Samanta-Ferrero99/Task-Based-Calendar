const express = require("express");
const userModel = require("../models/user");
const app = express();

// Test
app.get("/test", async (request, response) => {
  response.send("Hey!!");
});

// POST endpoint for creating new user
app.post("/create-user", async (request, response) => {
  const user = new userModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET endpoint for getting all users.
app.get("/", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

// GET endpoint for getting a single user.
app.get("/:id", async (request, response) => {
  try {
    const user = await userModel.findById(request.params.id);
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
    
});

// DELETE endpoint for a single user
// app.delete('/delete-user/:id', async (request, response) => {
//   const user = userModel.findByIdAndRemove(request.params.id);
//   try {
//     response.status(200).send(user);
//   } catch (error) {
//     response.stataus(500).send(error);
//   }
// });

// PUT endpoint for a single user
// WIP

module.exports = app;