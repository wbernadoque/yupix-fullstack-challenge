# Yupix Task Management - Full-Stack Developer Coding Challenge

A complete full-stack Task Management application built with Next.js frontend and Node.js backend, demonstrating modern web development practices and architectural patterns.

## 🏗️ Architecture Overview

This project follows a **monorepo architecture** with three main packages:

- **`@yupix/types`** - Shared TypeScript types and interfaces
- **`@yupix/backend`** - Express.js REST API server
- **`@yupix/frontend`** - Next.js React application

### Key Design Decisions

1. **Monorepo Structure**: Enables code sharing between frontend and backend while maintaining clear separation of concerns
2. **Type Safety**: Shared TypeScript types ensure consistency across the entire stack
3. **Modern Stack**: Next.js 14 with App Router, React Query for state management, and Material-UI for components
4. **API-First Design**: RESTful API with proper HTTP status codes and error handling
5. **Real-time Updates**: React Query handles cache invalidation and optimistic updates

## 🚀 Features

### Backend (Express.js API)
- ✅ RESTful API endpoints for CRUD operations
- ✅ Input validation with Zod
- ✅ Comprehensive error handling
- ✅ CORS configuration
- ✅ Rate limiting and security headers
- ✅ In-memory/File data storage (easily replaceable with database)
- ✅ TypeScript for type safety

### Frontend (Next.js)
- ✅ Modern React with TypeScript
- ✅ React Query for server state management
- ✅ Material-UI components with custom theme
- ✅ Responsive design
- ✅ Real-time updates without page refresh
- ✅ Optimistic updates for better UX
- ✅ Error handling and loading states

### Shared Features
- ✅ Type-safe communication between frontend and backend
- ✅ Consistent error handling
- ✅ Modern development experience

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/wbernadoque/yupix-fullstack-challenge.git
cd yupix-fullstack-challenge
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### 3. Build shared types
```bash
cd packages/types
npm run build
cd ../..
```

### 4. Start the development servers

#### Option A: Start both servers simultaneously
```bash
npm run dev
```

#### Option B: Start servers individually
```bash
# Terminal 1 - Backend (Port 8080)
npm run dev:backend

# Terminal 2 - Frontend (Port 3000)
npm run dev:frontend
```

### 5. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health

## 🏃‍♂️ Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run start` - Start both frontend and backend in production mode
- `npm run install:all` - Install dependencies for all packages

### Backend (`packages/backend`)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Frontend (`packages/frontend`)
- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application
- `npm start` - Start production server

### Types (`packages/types`)
- `npm run build` - Build TypeScript types
- `npm run dev` - Watch mode for type changes

## 🔌 API Endpoints

### Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/tasks` | Get all tasks | - | `{ success: true, data: Task[] }` |
| `POST` | `/tasks` | Create new task | `{ title: string }` | `{ success: true, data: Task }` |
| `PUT` | `/tasks/:id` | Update task | `{ title?: string, completed?: boolean }` | `{ success: true, data: Task }` |
| `DELETE` | `/tasks/:id` | Delete task | - | `204 No Content` |

### Task Interface
```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface using Material-UI
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Changes reflect immediately without page refresh
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages and notifications
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Confirmation Dialogs**: Safe deletion with confirmation prompts

## 🔧 Development

### Project Structure
```
yupix-fullstack-challenge/
├── packages/
│   ├── types/           # Shared TypeScript types
│   ├── backend/         # Express.js API server
│   └── frontend/        # Next.js React application
├── package.json         # Root package.json with workspaces
└── README.md
```

### Adding New Features

1. **Backend**: Add new endpoints in `packages/backend/src/index.ts`
2. **Frontend**: Create new components in `packages/frontend/src/components/`
3. **Types**: Update shared types in `packages/types/src/index.ts`
4. **API Integration**: Use React Query hooks for data fetching

### Environment Variables

#### Backend
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - CORS origin (default: http://localhost:3000)

#### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001/api)

## 🧪 Testing

The application includes:
- Type safety with TypeScript
- Input validation with Zod
- Error boundary handling
- API error responses
- Loading and error states