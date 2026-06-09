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

const updateTask = (req, res) => {
    const id = Number(req.params.id);

    const updateTask = tasksService.updateTask(id, req.body);

    if (!updateTask) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(updateTask);
};

const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const deletedTask = tasksService.deleteTask(id);

  if (!deletedTask) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  res.json({ message: "Tarefa deletada com sucesso", task: deletedTask });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};