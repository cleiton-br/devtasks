const tasksService = require("../services/tasksService");

const getTasks = (req, res) => {
    const tasks = tasksService.getAllTasks();
    res.json(tasks);
};

const createTask = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "O título da tarefa é obrigatório" });
    }

    const tasks = tasksService.getAllTasks();

    const maxId = tasks.length  ? Math.max(...tasks.map(task => task.id)) : 0;

    const newTask = {
        id: maxId + 1,
        title,
        completed: false
    };

    tasks.push(newTask);
    tasksService.saveTasks(tasks);
    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const id = Number(req.params.id);
    const tasks = tasksService.getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        tasks[taskIndex].title = title;
    }
    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }

    tasksService.saveTasks(tasks);
    res.json(tasks[taskIndex]);
};

const deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const tasks = tasksService.getAllTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  tasksService.saveTasks(tasks);

  res.json({ message: "Tarefa deletada com sucesso", task: deletedTask });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};