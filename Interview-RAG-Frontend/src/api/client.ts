import type { ApiResponse } from '@/types';

// Using relative path, Vite proxy will handle routing it to the backend
const BASE_URL = '';

export async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json() as ApiResponse<T>;

  if (result.code !== 200) {
    throw new Error(result.message || 'Request failed with code ' + result.code);
  }

  return result.data;
}