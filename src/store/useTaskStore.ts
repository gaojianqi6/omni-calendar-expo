import { create } from 'zustand';
import { Task } from '../services/taskService';

interface TaskStore {
  // State
  tasks: Task[];
  selectedTaskId: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
  setSelectedTaskId: (taskId: string | null) => void;
  clearTasks: () => void;
}

/**
 * Zustand store for task management
 * This can be used alongside React Query for local state management
 */
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedTaskId: null,
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task],
  })),
  
  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updates } : task
    ),
  })),
  
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId),
  })),
  
  setSelectedTaskId: (taskId) => set({ selectedTaskId: taskId }),
  
  clearTasks: () => set({ tasks: [], selectedTaskId: null }),
}));

/**
 * Example usage:
 * 
 * // In a component
 * const { tasks, addTask, updateTask, removeTask } = useTaskStore();
 * 
 * // Add a task
 * addTask({ id: '1', title: 'New Task', completed: false, ... });
 * 
 * // Update a task
 * updateTask('1', { completed: true });
 * 
 * // Remove a task
 * removeTask('1');
 */

