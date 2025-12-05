import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { apiFetch, getApiUrl } from '../config/api';

/**
 * Custom hook for API GET requests using React Query
 */
export function useApiQuery<TData = unknown>(
  path: string,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData>({
    queryKey: [path],
    queryFn: async () => {
      const response = await apiFetch(path);
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      return response.json() as Promise<TData>;
    },
    ...options,
  });
}

/**
 * Custom hook for API mutations (POST, PUT, DELETE, etc.)
 */
export function useApiMutation<TData = unknown, TVariables = unknown>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
  options?: UseMutationOptions<TData, Error, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await apiFetch(path, {
        method,
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      return response.json() as Promise<TData>;
    },
    onSuccess: () => {
      // Invalidate queries for the same path
      queryClient.invalidateQueries({ queryKey: [path] });
    },
    ...options,
  });
}

/**
 * Example usage:
 * 
 * // GET request
 * const { data, isLoading, error } = useApiQuery('/tasks');
 * 
 * // POST request
 * const mutation = useApiMutation('/tasks', 'POST');
 * mutation.mutate({ title: 'New Task' });
 */

