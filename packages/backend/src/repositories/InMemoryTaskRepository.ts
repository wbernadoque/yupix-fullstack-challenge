import { Task, CreateTaskRequest, UpdateTaskRequest } from '../entities/Task';
import { ITaskRepository } from '../interfaces/ITaskRepository';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [
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

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks]; // Return a copy to prevent external modification
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find(task => task.id === id);
    return task ? { ...task } : null; // Return a copy
  }

  async create(taskData: CreateTaskRequest): Promise<Task> {
    const now = new Date().toISOString();
    
    const newTask: Task = {
      id: this.generateId(),
      title: taskData.title,
      completed: false,
      createdAt: now,
      updatedAt: now
    };

    this.tasks.push(newTask);
    return { ...newTask }; // Return a copy
  }

  async update(id: string, taskData: UpdateTaskRequest): Promise<Task | null> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    const task = this.tasks[taskIndex];
    
    if (taskData.title !== undefined) {
      task.title = taskData.title;
    }
    if (taskData.completed !== undefined) {
      task.completed = taskData.completed;
    }
    
    task.updatedAt = new Date().toISOString();
    
    return { ...task }; // Return a copy
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks.length < initialLength;
  }
} 