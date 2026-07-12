// backend/src/services/tasksService.js
import { taskModel } from "../models/taskModel.js";
import appError from "../utils/appError.js";

export const getAllTasks = async (userId) => {
  return await taskModel.getAllTasks(userId);
};

export const getTaskById = async (id, userId) => {
  const task = await taskModel.getTaskById(id, userId);
  
  if (!task) {
    throw appError("Tarefa não encontrada", 404);
  }
  
  return task;
};

export const createTask = async (title, taskData, userId) => {
  return await taskModel.createTask({
    title, ...taskData }, userId);
};

export const updateTask = async (id, data, userId) => {
  const existingTask = await taskModel.getTaskById(id, userId);

  if (!existingTask) {
    throw appError("Tarefa não encontrada", 404);
  }

  return await taskModel.updateTask(id, data, userId);
};

export const deleteTask = async (id, userId) => {
  const existingTask = await taskModel.getTaskById(id, userId);

  if (!existingTask) {
    throw appError("Tarefa não encontrada", 404);
  }
  
  return await taskModel.deleteTask(id, userId);
};
