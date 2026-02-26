/**
 * API Client Configuration
 *
 * Development: Uses VITE_API_BASE_URL from .env.development (proxied by Vite)
 * Production: Uses VITE_API_BASE_URL from .env.production (full URL to backend)
 *
 * This abstraction allows seamless switching between:
 * - Development: http://localhost:8080 (via Vite proxy)
 * - Production: https://api.yourdomain.com (direct to backend)
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

export const apiClient = {
  baseUrl: API_BASE_URL,

  async fetch(
    endpoint: string,
    options?: FetchOptions
  ): Promise<Response> {
    const url = `${API_BASE_URL}${endpoint}`;
    const { timeout = 10000, ...fetchOptions } = options || {};

    // Ensure headers is an object for easier manipulation
    if (!fetchOptions.headers) {
      fetchOptions.headers = {};
    }

    const headers = fetchOptions.headers as Record<string, string>;

    // Add Content-Type for POST requests if not present
    if (
      fetchOptions.method?.toUpperCase() === 'POST' &&
      !headers['Content-Type']
    ) {
      headers['Content-Type'] = 'application/json';
    }

    fetchOptions.headers = headers;

    // Add timeout capability
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  },
};

export default apiClient;
