import { apiRequest } from './apiClient'
import type { ClassItem } from '../types'

export const fetchClasses = (date?: string) => {
  const query = date ? `?date=${encodeURIComponent(date)}` : ''
  return apiRequest<ClassItem[]>(`/api/classes${query}`)
}

export type ClassDetail = ClassItem & {
  registrations?: {
    id: string
    studentId: string
    student?: {
      id: string
      name: string
      currentGrade: string
    }
  }[]
}

export const fetchClassDetail = (id: string) =>
  apiRequest<ClassDetail>(`/api/classes/${id}`)

export const createClass = (payload: Omit<ClassItem, 'id'>) =>
  apiRequest<ClassItem>('/api/classes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateClass = (id: string, payload: Omit<ClassItem, 'id'>) =>
  apiRequest<ClassItem>(`/api/classes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteClass = (id: string) =>
  apiRequest<void>(`/api/classes/${id}`, {
    method: 'DELETE',
  })
