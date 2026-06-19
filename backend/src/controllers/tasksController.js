const tasksService = require("../services/tasksService");

const getTasks = (req, res) => {
    const tasks = tasksService.getAllTasks();
    res.json(tasks);
};

const createTask = (req, res) => {
    const { title } = req.body;

    const newTask = tasksService.createTask(title);

    res.status(201).json(newTask);
};

const updateTask = (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const updatedTask = tasksService.updateTask(id, req.body);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const deletedTask = tasksService.deleteTask(id);
    res.json({ message: "Tarefa deletada com sucesso", task: deletedTask });
  } catch (err) {
    next(err);
  }
}; 

const getTaskById = (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const task = tasksService.getTaskById(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};