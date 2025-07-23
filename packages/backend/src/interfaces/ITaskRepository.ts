import { Task, CreateTaskRequest, UpdateTaskRequest } from '../entities/Task';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(taskData: CreateTaskRequest): Promise<Task>;
  update(id: string, taskData: UpdateTaskRequest): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
} 