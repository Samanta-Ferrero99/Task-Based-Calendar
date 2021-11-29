const express = require('express');
const chronicleModel = require('../models/chronicle');
const taskModel = require('../models/task');
const router = express.Router();

// Test
router.get('/test', (req, res) => {
  res.send(req.headers.user);
});

/**
 * Create a new chronicle
 * POST to /api/chronicles
 */
router.post('/', (req, res, next) => {
  // Check if chronicle already exists
  chronicleModel.findOne({ title: req.body.title }).then((chronicle) => {
    if (chronicle) {
      return res
        .status(422)
        .json({ message: 'A chronicle with this title already exists.' });
    } else {
      const newChronicle = new chronicleModel({
        title: req.body.title || 'Untitled',
        description: req.body.description || null,
        type: req.body.type,
        createdDate: Date.now(),
        dueDate: req.body.dueDate || null,
        color: req.body.color || null,
        priority: req.body.priority || null,
        owner: req.headers.user,
        tasks: req.body.tasks || []
      });

      newChronicle.save().catch((err) => console.log(err));

      // Send response
      return res
        .status(200)
        .json({
          message: `Successfully created chronicle ${newChronicle.title}`,
          chronicle: newChronicle
        });
    }
  });
});

/**
 * Retrieve all chronicles for a given user
 * GET to /api/chronicles
 */
router.get('/', (req, res, next) => {
  // Find chronicle
  chronicleModel.find({ owner: req.headers.user }).then((list) => {
    if (!list) {
      return res
        .status(404)
        .json({ message: 'Could not find chronicles for current user' });
    }
    return res
      .status(200)
      .json({
        message: `Successfully retrieved ${list.length} chronicles`,
        chronicles: list
      });
  });
});

/**
 * Retrieve chronicle by title
 * GET to /api/chronicles/:title
 */
router.get('/:title', (req, res, next) => {
  // Find chronicle
  chronicleModel
    .findOne({ owner: req.headers.user, title: req.params.title })
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({
            message: `Could not find chronicle with the title ${req.params.title}`
          });
      }
      return res
        .status(200)
        .json({ message: `Successfully retrieved chronicle`, chronicle: item });
    });
});

/**
 * Retrieve chronicle by type
 * GET to /api/chronicles/type/:type
 */
router.get('/type/:type', (req, res, next) => {
  // Find chronicle
  chronicleModel
    .findOne({ owner: req.headers.user, type: req.params.type })
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({
            message: `Could not find chronicle with the type ${req.params.type}`
          });
      }
      return res
        .status(200)
        .json({ message: `Successfully retrieved chronicle`, chronicle: item });
    });
});

/**
 * Retrieve chronicle by priority
 * GET to /api/chronicles/priority/:priority
 */
router.get('/priority/:priority', (req, res, next) => {
  // Find chronicle
  chronicleModel
    .findOne({ owner: req.headers.user, priority: req.params.priority })
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({
            message: `Could not find chronicle with the priority ${req.params.priority}`
          });
      }
      return res
        .status(200)
        .json({ message: `Successfully retrieved chronicle`, chronicle: item });
    });
});

/**
 * Update a chronicle
 * PUT to /api/chronicles
 */
router.put('/', (req, res, next) => {
  try {
    chronicleModel.findById(req.body._id).then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({
            message: `Could not find chronicle with the id ${req.body._id}`
          });
      }
      // Only allowed to edit description, type, dueDate, color, priority, and tasks
      item.title = req.body.title || item.title;
      item.description = req.body.description || item.description;
      item.type = req.body.type || item.type;
      item.dueDate = req.body.dueDate || item.dueDate;
      item.color = req.body.color || item.color;
      item.priority = req.body.priority || item.priority;
      item.tasks = req.body.tasks || item.tasks;
      item.save();
      return res
        .status(200)
        .json({ message: `Successfully updated chronicle`, chronicle: item });
    });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: `Could not update chronicle with title ${(req.body, title)}`
      });
  }
});

/**
 * Add new task to a chronicle with given title
 * POST to /api/chronicles/:title
 */
router.post('/add-task/:_id', (req, res, next) => {
  try {
    chronicleModel
      .findOne({ owner: req.headers.user, _id: req.params._id })
      .then((item) => {
        if (!item) {
          return res
            .status(404)
            .json({
              message: `Could not find chronicle with the id ${req.params._id}`
            });
        }
        try {
          taskModel
            .findOne({ owner: req.headers.user, title: req.body.title })
            .then((task) => {
              if (!task) {
                return res
                  .status(404)
                  .json({
                    message: `Could not find task with the title ${req.body.title}`
                  });
              }
              if (item.tasks.includes(task)) {
                return res
                  .status(404)
                  .json({ message: `Task already exists in chronicle` });
              }
              task.chronicle = req.params._id;
              task.save();
              item.tasks.push(task);
              item.save();
              return res
                .status(200)
                .json({
                  message: `Successfully added task ${req.body.title} to chronicle ${item.title}`,
                  chronicle: item
                });
            });
        } catch (error) {
          return res.status(400).json({
            message: `Could not add task ${req.body.title} to chronicle`
          });
        }
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Could not add task ${req.body.title} to chronicle` });
  }
});

/**
 * Delete a chronicle
 * DELETE to /api/chronicles/:_id
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const chronicle = await chronicleModel.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: `Successfully deleted chronicle`
    });
  } catch (error) {
    response.status(404).send(error);
  }
});

module.exports = router;
