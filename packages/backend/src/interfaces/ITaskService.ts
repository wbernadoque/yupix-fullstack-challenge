import { Task, CreateTaskRequest, UpdateTaskRequest } from '../entities/Task';

export interface ITaskService {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(taskData: CreateTaskRequest): Promise<Task>;
  updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task>;
  deleteTask(id: string): Promise<void>;
} 