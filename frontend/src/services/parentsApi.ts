import { apiRequest } from './apiClient'
import type { Parent } from '../types'

export const fetchParents = () => apiRequest<Parent[]>('/api/parents')

export const createParent = (payload: Omit<Parent, 'id'>) =>
  apiRequest<Parent>('/api/parents', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const deleteParent = (id: string) =>
  apiRequest<void>(`/api/parents/${id}`, {
    method: 'DELETE',
  })

export const getParentById = (id: string) =>
  apiRequest<Parent>(`/api/parents/${id}`)

export const updateParent = (id: string, payload: Omit<Parent, 'id'>) =>
  apiRequest<Parent>(`/api/parents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
