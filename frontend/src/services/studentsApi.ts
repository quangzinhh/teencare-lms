import { apiRequest } from './apiClient'
import type { Student } from '../types'

export type CreateStudentPayload = Omit<Student, 'id' | 'parent'>

export const fetchStudents = () => apiRequest<Student[]>('/api/students')

export const createStudent = (payload: CreateStudentPayload) =>
  apiRequest<Student>('/api/students', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const getStudentById = (id: string) =>
  apiRequest<Student>(`/api/students/${id}`)

export const updateStudent = (id: string, payload: CreateStudentPayload) =>
  apiRequest<Student>(`/api/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteStudent = (id: string) =>
  apiRequest<void>(`/api/students/${id}`, {
    method: 'DELETE',
  })
