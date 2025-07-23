import { Request, Response } from 'express';
import { z } from 'zod';
import { ITaskService } from '../interfaces/ITaskService';

// Validation schemas
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long')
});

const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long').optional(),
  completed: z.boolean().optional()
});

export class TaskController {
  constructor(private readonly taskService: ITaskService) {}

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json({
        success: true,
        data: tasks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tasks'
      });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const validation = createTaskSchema.safeParse(req.body);
      
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: validation.error.errors[0].message
        });
        return;
      }

      const newTask = await this.taskService.createTask(validation.data);

      res.status(201).json({
        success: true,
        data: newTask,
        message: 'Task created successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to create task'
        });
      }
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to delete task'
        });
      }
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validation = updateTaskSchema.safeParse(req.body);
      
      if (!validation.success) {
        res.status(400).json({
          success: false,
          error: validation.error.errors[0].message
        });
        return;
      }

      const updatedTask = await this.taskService.updateTask(id, validation.data);

      res.status(200).json({
        success: true,
        data: updatedTask,
        message: 'Task updated successfully'
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        res.status(404).json({
          success: false,
          error: 'Task not found'
        });
      } else if (error instanceof Error) {
        res.status(400).json({
          success: false,
          error: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to update task'
        });
      }
    }
  }
} 