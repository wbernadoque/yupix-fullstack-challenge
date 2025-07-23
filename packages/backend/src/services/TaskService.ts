import { Task, CreateTaskRequest, UpdateTaskRequest } from '../entities/Task';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { ITaskService } from '../interfaces/ITaskService';

export class TaskService implements ITaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    if (!taskData.title || taskData.title.trim().length === 0) {
      throw new Error('Title is required');
    }
    
    if (taskData.title.length > 255) {
      throw new Error('Title too long');
    }

    return await this.taskRepository.create(taskData);
  }

  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    if (taskData.title !== undefined) {
      if (!taskData.title || taskData.title.trim().length === 0) {
        throw new Error('Title is required');
      }
      
      if (taskData.title.length > 255) {
        throw new Error('Title too long');
      }
    }

    const updatedTask = await this.taskRepository.update(id, taskData);
    if (!updatedTask) {
      throw new Error('Task not found');
    }

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const deleted = await this.taskRepository.delete(id);
    if (!deleted) {
      throw new Error('Task not found');
    }
  }
} 