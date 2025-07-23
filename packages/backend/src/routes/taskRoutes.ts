import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

export function createTaskRoutes(taskController: TaskController): Router {
  const router = Router();

  // GET /api/tasks - Get all tasks
  router.get('/', (req, res) => taskController.getAllTasks(req, res));

  // POST /api/tasks - Create a new task
  router.post('/', (req, res) => taskController.createTask(req, res));

  // DELETE /api/tasks/:id - Delete a task
  router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

  // PUT /api/tasks/:id - Update a task
  router.put('/:id', (req, res) => taskController.updateTask(req, res));

  return router;
} 