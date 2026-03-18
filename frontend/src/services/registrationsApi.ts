import { apiRequest } from './apiClient'

export type CreateRegistrationPayload = {
  classId: string
  studentId: string
  scheduledAt?: string
}

export const registerClass = (payload: CreateRegistrationPayload) => {
  const scheduledAt = payload.scheduledAt ?? new Date().toISOString()

  return apiRequest<{ id: string }>(`/api/classes/${payload.classId}/register`, {
    method: 'POST',
    body: JSON.stringify({
      studentId: payload.studentId,
      scheduledAt,
    }),
  })
}
