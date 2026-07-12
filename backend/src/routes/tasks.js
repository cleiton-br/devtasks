import { Router }from "express";

import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/tasksController.js";

import { validateTask } from "../middlewares/taskValidation.js";
import { validateTaskId } from "../middlewares/taskIdValidation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.get("/:id", validateTaskId, getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTaskId, updateTask);
router.delete("/:id", validateTaskId, deleteTask);

export default router;