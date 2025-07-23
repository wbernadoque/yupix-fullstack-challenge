import fs from 'fs';
import path from 'path';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../entities/Task';
import { ITaskRepository } from '../interfaces/ITaskRepository';

export class FileTaskRepository implements ITaskRepository {
  private readonly dataFilePath: string;

  constructor() {
    this.dataFilePath = path.join(__dirname, '..', 'data', 'tasks.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory(): void {
    const dataDir = path.dirname(this.dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  private readTasksFromFile(): Task[] {
    try {
      if (!fs.existsSync(this.dataFilePath)) {
        const defaultTasks: Task[] = [
          {
            id: '1',
            title: 'Complete the coding challenge',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Review the codebase',
            completed: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        this.writeTasksToFile(defaultTasks);
        return defaultTasks;
      }
      
      const data = fs.readFileSync(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading tasks from file:', error);
      return [];
    }
  }

  private writeTasksToFile(tasks: Task[]): void {
    try {
      this.ensureDataDirectory();
      fs.writeFileSync(this.dataFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing tasks to file:', error);
      throw new Error('Failed to save tasks');
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async findAll(): Promise<Task[]> {
    return this.readTasksFromFile();
  }

  async findById(id: string): Promise<Task | null> {
    const tasks = this.readTasksFromFile();
    const task = tasks.find(task => task.id === id);
    return task || null;
  }

  async create(taskData: CreateTaskRequest): Promise<Task> {
    const tasks = this.readTasksFromFile();
    const now = new Date().toISOString();
    
    const newTask: Task = {
      id: this.generateId(),
      title: taskData.title,
      completed: false,
      createdAt: now,
      updatedAt: now
    };

    tasks.push(newTask);
    this.writeTasksToFile(tasks);
    return newTask;
  }

  async update(id: string, taskData: UpdateTaskRequest): Promise<Task | null> {
    const tasks = this.readTasksFromFile();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    const task = tasks[taskIndex];
    
    if (taskData.title !== undefined) {
      task.title = taskData.title;
    }
    if (taskData.completed !== undefined) {
      task.completed = taskData.completed;
    }
    
    task.updatedAt = new Date().toISOString();
    this.writeTasksToFile(tasks);
    
    return task;
  }

  async delete(id: string): Promise<boolean> {
    const tasks = this.readTasksFromFile();
    const initialLength = tasks.length;
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === initialLength) {
      return false;
    }
    
    this.writeTasksToFile(filteredTasks);
    return true;
  }
} 