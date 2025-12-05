/**
 * API Configuration
 * Common prefix for all API requests
 */

export const API_CONFIG = {
  BASE_URL: 'http://localhost:5235',
  API_PREFIX: '/api',
} as const;

/**
 * Builds a full API URL from a path
 * @param path - API path (e.g., '/tasks' becomes 'http://localhost:5235/api/tasks')
 */
export const getApiUrl = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}${normalizedPath}`;
};

/**
 * Custom fetch wrapper for API requests
 * Automatically prepends the base URL and API prefix
 */
export const apiFetch = async (
  path: string,
  options?: RequestInit
): Promise<Response> => {
  const url = getApiUrl(path);
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
};

