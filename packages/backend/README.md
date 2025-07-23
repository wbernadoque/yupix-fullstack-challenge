# Backend API - SOLID Architecture

This backend API follow SOLID principles and clean architecture patterns.

## Architecture Overview

The application follows a layered architecture with clear separation of concerns:

```
src/
├── entities/          # Core business objects
├── interfaces/        # Contracts and abstractions
├── repositories/      # Data access layer
├── services/          # Business logic layer
├── controllers/       # HTTP request handling
├── routes/           # API route definitions
├── middleware/       # Express middleware
├── config/           # Dependency injection
└── types/            # Type exports
```

## SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)
- **Entities**: Pure business objects with no dependencies
- **Controllers**: Handle HTTP requests and responses only
- **Services**: Contain business logic only
- **Repositories**: Handle data access only
- **Routes**: Define API endpoints only

### 2. Open/Closed Principle (OCP)
- The system is open for extension but closed for modification
- New repository implementations can be added without changing existing code
- New services can be added by implementing interfaces

### 3. Liskov Substitution Principle (LSP)
- All implementations can be substituted for their interfaces
- Repository implementations are interchangeable
- Service implementations follow the same contract

### 4. Interface Segregation Principle (ISP)
- Interfaces are specific to their use cases
- `ITaskRepository` defines only data access methods
- `ITaskService` defines only business logic methods

### 5. Dependency Inversion Principle (DIP)
- High-level modules depend on abstractions, not concretions
- Services depend on repository interfaces
- Controllers depend on service interfaces
- Dependency injection container manages all dependencies

## Key Components

### Entities
- `Task`: Core business object representing a task

### Interfaces
- `ITaskRepository`: Contract for data access operations
- `ITaskService`: Contract for business logic operations

### Repositories
- `FileTaskRepository`: File-based implementation of task storage

### Services
- `TaskService`: Business logic for task operations

### Controllers
- `TaskController`: HTTP request handling for task endpoints

### Configuration
- `DependencyContainer`: Manages dependency injection and wiring

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /health` - Health check

## Benefits of This Architecture

1. **Testability**: Each component can be tested in isolation
2. **Maintainability**: Clear separation of concerns makes code easier to maintain
3. **Extensibility**: New features can be added without modifying existing code
4. **Flexibility**: Easy to swap implementations (e.g., database instead of file storage)
5. **Scalability**: Components can be scaled independently

## Adding New Features

To add new features following this architecture:

1. Define entities in the `entities/` folder
2. Create interfaces in the `interfaces/` folder
3. Implement repositories in the `repositories/` folder
4. Implement services in the `services/` folder
5. Create controllers in the `controllers/` folder
6. Define routes in the `routes/` folder
7. Wire up dependencies in the `DependencyContainer`

## Running the Application

```bash
npm install
npm run dev
```

The server will start on port 3001 by default. 