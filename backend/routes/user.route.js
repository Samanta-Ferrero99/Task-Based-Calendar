const express = require('express');
const r = require('ramda');
const router = express.Router();

module.exports = router;

// Get user informations
router.get('/', (req, res) => {
  const user = req.user && r.omit(["password", "__v", "__id"], req.user?.toObject({virtuals: true})) || null;
  console.log(user);
  res.status(200).send({ message: 'User info successfully retreived', user });
});
