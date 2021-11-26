const express = require('express');
const taskModel = require('../models/task');
const chronicleModel = require('../models/chronicle');
const router = express.Router();

// Test
router.get('/test', (req, res) => {
  res.send(req.user);
});

/**
 * Create a new task
 * POST to /api/tasks
 */
router.post('/', (req, res, next) => {
  
  // Check if task already exists
  taskModel.findOne({ owner: req.headers.user, title: req.body.title }).then((task) => {
    if (task) {
      return res
        .status(422)
        .json({ message: 'A task with this title already exists.' });
    } else {
      const newTask = new taskModel({
        title: req.body.title || 'Untitled',
        description: req.body.description || null,
        createdDate: Date.now(),
        dueDate: req.body.dueDate || null,
        startDate: req.body.startDate || null,
        owner: req.headers.user,
        status: req.body.status || null,
        parents: req.body.parents || [],
        children: req.body.children || [],
        blocked: req.body.blocked || false,
        chronicle: req.body.chronicle || null,
      });

      newTask.save().catch((err) => console.log(err));

      // Send response
      return res
        .status(200)
        .json({
          message: `Successfully created task ${newTask.title}`,
          task: newTask
        });
    }
  });
});

/**
 * Retrieve all tasks for a given user
 * GET to /api/tasks
 */
router.get('/', (req, res, next) => {
  // Find tasks
  taskModel.find({ owner: req.headers.user }).then((list) => {
    if (!list) {
      return res
        .status(404)
        .json({ message: 'Could not find tasks for current user' });
    }
    return res
      .status(200)
      .json({
        message: `Successfully retrieved ${list.length} tasks`,
        tasks: list
      });
  });
});

/**
 * Retrieve task by title
 * GET to /api/tasks/:title
 */
router.get('/title/:title', (req, res, next) => {
  // Find task
  taskModel
    .findOne({ owner: req.headers.user, title: req.params.title })
    .then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({
            message: `Could not find task with the title ${req.params.title}`
          });
      }
      return res
        .status(200)
        .json({ message: `Successfully retrieved task`, task: item });
    });
});

/**
 * Retrieve tasks by status
 * GET to /api/tasks/status/:status
 */
router.get('/status/:status', (req, res, next) => {
  // Find tasks
  taskModel
    .find({ owner: req.headers.user, status: req.params.status })
    .then((list) => {
      if (!list) {
        return res
          .status(404)
          .json({
            message: `Could not find task with the status ${req.params.status}`
          });
      }
      return res
        .status(200)
        .json({ message: `Successfully retrieved tasks`, tasks: list });
    });
});


/**
 * Retrieve tasks by chronicle
 * GET to /api/tasks/chronicle/:chronicle
 */
router.get('/chronicle/:chronicle', (req, res, next) => {
  // Find tasks
  taskModel
    .find({ owner: req.headers.user, chronicle: req.params.chronicle })
    .then((list) => {
      if (!list) {
        return res.status(404).json({
          message: `Could not find task with the chronicle ${req.params.chronicle}`
        });
      }
      return res
        .status(200)
        .json({ message: `Successfully retrieved tasks`, tasks: list });
    });
});

/**
 * Update a task
 * PUT to /api/tasks
 */
router.put('/', (req, res, next) => {
  try {
    taskModel.findById(req.body._id).then((item) => {
      if (!item) {
        return res
          .status(404)
          .json({
            message: `Could not find task with the id ${req.body._id}`
          });
      }
      item.title = req.body.title || 'Untitled',
      item.description = req.body.description || null,
      item.dueDate = req.body.dueDate || null,
      item.startDate = req.body.startDate || null,
      item.status = req.body.status || null,
      item.parents = req.body.parents || null,
      item.children = req.body.children || null,
      item.blocked = req.body.blocked || false,
      item.save();
      return res
        .status(200)
        .json({ message: `Successfully updated task`, task: item });
    });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: `Could not update task with title ${(req.body, title)}`
      });
  }
});

/**
 * Add task to dependencies list
 * POST to /api/tasks/add-child
 */
router.post('/add-child', (req, res, next) => {
  try {
    taskModel.findById(req.body.parentID).then((parent) => {
      if (!parent) {
        return res
          .status(404)
          .json({
            message: `Could not find task with the id ${req.body.parentID}`
          });
      }
      taskModel.findById(req.body.childID).then((child) => {
        if (!child) {
          return res.status(404).json({
            message: `Could not find task with the id ${req.body.childID}`
          });
        }
        child.parents.push(parent);
        child.save();
        parent.children.push(child);
        parent.save();
        return res
          .status(200)
          .json({ message: `Successfully added dependency ${child.title} to ${parent.title}`, task: parent });
      })
    });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: `Could not add child to task with id ${(req.body.parentID)}`
      });
  }
});

/**
 * Remove task from dependency list
 * DELETE to /api/tasks/remove-child
 */
router.delete('/remove-child', (req, res, next) => {
  try {
    taskModel.findById(req.body.parentID).then((parent) => {
      if (!parent) {
        return res
          .status(404)
          .json({
            message: `Could not find task with the id ${req.body.parentID}`
          });
      }
      taskModel.findById(req.body.childID).then((child) => {
        if (!child) {
          return res.status(404).json({
            message: `Could not find task with the id ${req.body.childID}`
          });
        }
        console.log(child.parents[0]);
        const newParents = [];
        for (let p of child.parents) {
          if (p.toString() !== req.body.parentID.toString()) {
            newParents.push(p);
          }
        }
        child.parents = newParents;
        const newChildren = [];
        for (let c of parent.children) {
          if (c.toString() !== req.body.childID.toString()) {
            newChildren.push(c);
          }
        }
        parent.children = newChildren;
        child.save();
        parent.save();
        return res
          .status(200)
          .json({ message: `Successfully removed dependency ${child.title} from ${parent.title}`, task: child });
      })
    });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: `Could not remove child from task with id ${(req.body.parentID)}`
      });
  }
});

/**
 * Delete a task
 * DELETE to /api/tasks/:_id
 */
router.delete('/remove/:id', async (req, res, next) => {
  try {
    const task = await taskModel.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: `Successfully deleted task`
    });
  } catch (error) {
    response.status(404).send(error);
  }
});

module.exports = router;
