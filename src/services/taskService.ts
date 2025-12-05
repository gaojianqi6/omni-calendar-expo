import { useApiQuery, useApiMutation } from '../hooks/useApi';

/**
 * Task interface
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Task DTO
 */
export interface CreateTaskDto {
  title: string;
  description?: string;
}

/**
 * Update Task DTO
 */
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

/**
 * Hook to fetch all tasks
 * Uses /api/tasks endpoint which translates to http://localhost:5235/api/tasks
 */
export function useTasks() {
  return useApiQuery<Task[]>('/tasks');
}

/**
 * Hook to fetch a single task by ID
 */
export function useTask(taskId: string) {
  return useApiQuery<Task>(`/tasks/${taskId}`);
}

/**
 * Hook to create a new task
 */
export function useCreateTask() {
  return useApiMutation<Task, CreateTaskDto>('/tasks', 'POST');
}

/**
 * Hook to update a task
 */
export function useUpdateTask(taskId: string) {
  return useApiMutation<Task, UpdateTaskDto>(`/tasks/${taskId}`, 'PUT');
}

/**
 * Hook to delete a task
 */
export function useDeleteTask(taskId: string) {
  return useApiMutation<void, void>(`/tasks/${taskId}`, 'DELETE');
}

/**
 * Example usage:
 * 
 * // Fetch all tasks
 * const { data: tasks, isLoading, error } = useTasks();
 * 
 * // Create a task
 * const createTask = useCreateTask();
 * createTask.mutate({ title: 'New Task', description: 'Task description' });
 * 
 * // Update a task
 * const updateTask = useUpdateTask(taskId);
 * updateTask.mutate({ completed: true });
 * 
 * // Delete a task
 * const deleteTask = useDeleteTask(taskId);
 * deleteTask.mutate(undefined);
 */

