const express = require("express");

const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require("../controllers/tasksController");

const { validateTask } = require("../middlewares/taskValidation");
const { validateTaskId } = require("../middlewares/taskIdValidation");

const router = express.Router();

router.get("/", getTasks);

router.get(
  "/:id",
  validateTaskId,
  getTaskById
);

router.post(
  "/",
  validateTask,
  createTask
);

router.put(
  "/:id",
  validateTaskId,
  updateTask
);

router.delete(
  "/:id",
  validateTaskId,
  deleteTask
);

module.exports = router;