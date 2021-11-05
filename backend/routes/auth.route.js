// Dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const createHttpError = require("http-errors");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const userModel = require("../models/user");

/**
 * Register a new user.
 * POST to /api/auth/register
 */
router.post("/register", (req, res, next) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    console.error("VALIDATION CHECK FAIL");
    console.error(req.body);
    return res.status(400).json(errors);
  }
  // Check if user is already registered
  userModel.findOne({ email: req.body.email }).then(user => {

    // If user with given email already exists, send error
    if (user) {

      return res.status(422).json({ message: "An account with this email already exists." });

    // If user does not exist, create a new user object
    } else {
      
      const newUser = new userModel({
        username: req.body.username || null,
        email: req.body.email || null,
        password: req.body.password || null
      });

      console.log(newUser);

      // Check if any fields are null (if the validator did not catch them)
      if (newUser.username === null || newUser.email === null || newUser.password === null) {
        console.error("NULL CHECK FAIL");
        return res
          .status(400)
          .json({ message: "A new user must have a username, email, and password. Request is missing one or more fields." });
      }

      // Hash password before saving in database (bcrypt)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .catch(err => console.log(err));
        });
      });

      // Send response
      return res.status(200).json({message: `Successfully registered user ${newUser.username}`, user: newUser});
    }
  });
});

/**
 * Login an existing user.
 * POST to /api/auth/login
 */
router.post("/login", (req, res) => {

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Extract fields
  const email = req.body.email;
  const password = req.body.password;

  // Lookup user by email in the database
  userModel.findOne({ email }).then(user => {

    // Check if user exists, if does not exist, send an error
    if (!user) {
      return res.status(404).json({ message: `No user exists with the email ${email}.`});
    }

    // Check password validation using bcrypt
    bcrypt.compare(password, user.password).then(isMatch => {

      if (isMatch) {

        // Password matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            // Send response with token
            res.status(200).json({
              message: `Successful Login for user ${user.username}`,
              token: "Bearer " + token
            });
          }
        );
      // Password was not a match
      } else {
        return res
          .status(400)
          .json({ message: "Password incorrect" });
      }
    });
  });
});

/**
 * Verify a user's access token.
 * GET to /api/auth/verify
 */
router.get("/verify", (req, res) => {
  // Get token from header
  let token = req.headers.token;

  // Verify that token exists / was passed in
  if (!token) return res.status(401).json({message: "Access denied, unauthorized request."});

  // Attempt to verify token
  try {
    // Remove Bearer from the token string
    token = token.split(' ')[1];

    // Check that token is not null, and exists
    if (token === 'null' || !token) return res.status(401).json({message: "Access denied, unauthorized request"});

    // Verify token for user
    let verifiedUser = jwt.verify(token, keys.secretOrKey);

    // Return an error if the user is not verified.
    if (!verifiedUser) return res.status(401).json({message: "Access denied, unauthorized request"});

    // Authentication success!
    res.status(200).json({message: `Authentication success for user ${verifiedUser.username}`});

  } catch (error) {
    // Return an error for unauthorized token
    res.status(400).json({message: "Access denied, invalid token"});
  }
})

module.exports = router;
