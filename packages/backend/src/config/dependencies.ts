import { FileTaskRepository } from '../repositories/FileTaskRepository';
import { InMemoryTaskRepository } from '../repositories/InMemoryTaskRepository';
import { TaskService } from '../services/TaskService';
import { TaskController } from '../controllers/TaskController';
import { ITaskRepository } from '../interfaces/ITaskRepository';
import { ITaskService } from '../interfaces/ITaskService';

export class DependencyContainer {
  private static instance: DependencyContainer;
  private taskRepository: ITaskRepository;
  private taskService: ITaskService;
  private taskController: TaskController;

  private constructor() {
    // Choose repository implementation based on environment
    // This demonstrates the Open/Closed Principle - we can easily switch implementations
    const useInMemory = process.env.USE_IN_MEMORY_STORAGE === 'true';
    
    if (useInMemory) {
      this.taskRepository = new InMemoryTaskRepository();
      console.log('📦 Using InMemoryTaskRepository');
    } else {
      this.taskRepository = new FileTaskRepository();
      console.log('📁 Using FileTaskRepository');
    }
    
    this.taskService = new TaskService(this.taskRepository);
    this.taskController = new TaskController(this.taskService);
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  public getTaskController(): TaskController {
    return this.taskController;
  }

  public getTaskService(): ITaskService {
    return this.taskService;
  }

  public getTaskRepository(): ITaskRepository {
    return this.taskRepository;
  }
} 