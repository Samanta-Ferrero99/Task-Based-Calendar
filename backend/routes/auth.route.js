// Dependencies
const express = require("express");
const router = express.Router();
const sanitize = require('mongo-sanitize');
const moment = require('moment');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const r = require('ramda');

// Load user model
const userModel = require("../models/user");

// Load validation utility
const validateTool = require("../utils");

// Date format
moment().format();

router.post("/login", (req, res, next) => {
  const { error } = validateTool.loginInput(req.body);
  if  (error) {
    return res.status(400).send({message: error.details[0].message});
  }
  req.body = sanitize(req.body);
  req.body.email = req.body.email.toLowerCase();

  const userObject = {
    username: req.body.email,
    password: req.body.password
  }

  passport.authenticate("local", (err, userObject, info) => {
    if (err) {
      return next(err);
    }
    if (info && info.message === "Missing credentials") {
      return res.status(400).send({message: "Missing credentials"});
    }
    if (!userObject) {
      return res.status(400).send({messaaage: "Login failed: Invalid email or password"});
    }

    req.login(userObject, (err) => {
      if (err) {
        res.status(401).send({message: "Login failed", err});
      }
      console.log("LOG IN SUCCESS");
      console.log(userObject);
      res.status(200).send({message: "Login success!", user: r.omit(["password", "__v", "__id"], userObject.toObject({virtuals: true}))});
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({message: "Logout failed", err});
    }
    req.sessionID = null;
    req.logout();
    res.status(200).send({message: "Logout success"});
  });
});

router.post("/register", async (req, res) => {
  const { error } = validateTool.registerInput(req.body);
  if (error) {
    return res.status(400).send({message: error.details[0].message});
  }
  req.body = sanitize(req.body);
  let user = await userModel.findOne({email: req.body.email.toLowerCase()}, function(err) {
    if (err) {
      return res.status(500).send({message: "Unexpected error while attempting to register user"});
    }
  });
  if (user) {
    return res.status(400).send({message: "An account with this email already exists."});
  }

  if (req.body.password !== req.body.password2) {
    return res.status(400).send({message: "Passwords do not match"});
  }
  const newUser = new userModel({
    username: req.body.username || null,
    email: req.body.email || null,
    password: req.body.password || null
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      console.log(newUser.password + " " + hash);
      newUser
      .save()
      .catch(err => console.log(err));
      return res.status(200).json({
        message: `Successfully registered user ${newUser.email}`,
        user: newUser
      });
    });
  });

  
})

router.get("/test", (req, res) => {
  res.send("HELLO");
})

module.exports = router;
