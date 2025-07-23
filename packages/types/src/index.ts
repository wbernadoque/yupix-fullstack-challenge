export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
}

export interface UpdateTaskRequest {
  title?: string;
  completed?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface TasksResponse extends ApiResponse<Task[]> {}
export interface TaskResponse extends ApiResponse<Task> {}
export interface DeleteResponse extends ApiResponse<null> {} 