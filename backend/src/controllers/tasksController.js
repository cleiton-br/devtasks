// backend/src/controllers/tasksController.js
import * as tasksService from "../services/tasksService.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newTask = await tasksService.createTask(title, req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const updatedTask = await tasksService.updateTask(id, req.body);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const deletedTask = await tasksService.deleteTask(id);
    res.json({ message: "Tarefa deletada com sucesso", task: deletedTask });
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const task = await tasksService.getTaskById(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};