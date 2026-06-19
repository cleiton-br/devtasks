const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

const appError = require("../utils/appError");

const getAllTasks = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

const createTask = (title) => {
    const tasks = getAllTasks();
    const maxId = tasks.length ? Math.max(...tasks.map(task => task.id)) : 0;

    const newTask = {
        id: maxId + 1,
        title,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
};

const updateTask = (id, data) => {
    const tasks = getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        throw appError("Tarefa não encontrada", 404);
    }

    if (data.title !== undefined) {
        tasks[taskIndex].title = data.title;
    }
    if (data.completed !== undefined) {
        tasks[taskIndex].completed = data.completed;
    }

    saveTasks(tasks);
    return tasks[taskIndex];
};

const deleteTask = (id) => {
    const tasks = getAllTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        throw appError("Tarefa não encontrada", 404);
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    saveTasks(tasks);
    return deletedTask;
};

const getTaskById = (id) => {
  const tasks = getAllTasks();

  const task = tasks.find(task => task.id === id);

  if (!task) {
    throw appError("Tarefa não encontrada", 404);
  }

  return task;
};

module.exports = {
    getAllTasks,
    getTaskById,
    saveTasks,
    createTask,
    updateTask,
    deleteTask
};