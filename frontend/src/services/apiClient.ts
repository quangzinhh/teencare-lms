const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3000'

export type ApiError = {
  message?: string
}

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  const text = await response.text()
  const data = (text ? JSON.parse(text) : {}) as T & ApiError
  if (!response.ok) {
    throw new Error(data.message ?? 'Request failed')
  }

  return data as T
}
