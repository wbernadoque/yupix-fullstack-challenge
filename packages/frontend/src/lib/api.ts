import axios from 'axios';
import { Task, CreateTaskRequest, UpdateTaskRequest, TasksResponse, TaskResponse } from '@yupix/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const tasksApi = {
  // Get all tasks
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<TasksResponse>('/tasks');
    return response.data.data || [];
  },

  // Create a new task
  create: async (task: CreateTaskRequest): Promise<Task> => {
    const response = await api.post<TaskResponse>('/tasks', task);
    return response.data.data!;
  },

  // Update a task
  update: async (id: string, task: UpdateTaskRequest): Promise<Task> => {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, task);
    return response.data.data!;
  },

  // Delete a task
  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api; 