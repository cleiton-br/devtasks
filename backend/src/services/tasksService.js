// backend/src/services/tasksService.js
import { taskModel } from "../models/taskModel.js";
import appError from "../utils/appError.js";

export const getAllTasks = async () => {
  return await taskModel.getAllTasks();
};

export const getTaskById = async (id) => {
  const task = await taskModel.getTaskById(id);
  
  if (!task) {
    throw appError("Tarefa não encontrada", 404);
  }
  
  return task;
};

export const createTask = async (title, taskData = {}) => {
  return await taskModel.createTask({
    title,
    ...taskData
  });
};

export const updateTask = async (id, data) => {
  const existingTask = await taskModel.getTaskById(id);
  
  if (!existingTask) {
    throw appError("Tarefa não encontrada", 404);
  }
  
  return await taskModel.updateTask(id, data);
};

export const deleteTask = async (id) => {
  const existingTask = await taskModel.getTaskById(id);
  
  if (!existingTask) {
    throw appError("Tarefa não encontrada", 404);
  }
  
  return await taskModel.deleteTask(id);
};
