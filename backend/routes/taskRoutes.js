const express = require('express');
const router = express.Router();
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
} = require('../controllers/taskController');
const { validateTask } = require('../middleware/taskValidator');

// Routes for /api/tasks
router.route('/')
    .get(getTasks)
    .post(validateTask, createTask);

// Routes for /api/tasks/:id
router.route('/:id')
    .put(validateTask, updateTask)
    .delete(deleteTask);

// Route for toggling status
router.patch('/:id/toggle', toggleTaskStatus);

module.exports = router;