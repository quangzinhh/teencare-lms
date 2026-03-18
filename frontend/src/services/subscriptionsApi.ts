import { apiRequest } from './apiClient'
import type { Subscription } from '../types'

export type CreateSubscriptionPayload = Omit<Subscription, 'id'>

export const createSubscription = (payload: CreateSubscriptionPayload) =>
  apiRequest<Subscription>('/api/subscriptions', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const getSubscriptionById = (id: string) =>
  apiRequest<Subscription>(`/api/subscriptions/${id}`)

export const getSubscriptionsByStudent = (studentId: string) =>
  apiRequest<Subscription[]>(`/api/subscriptions/student/${studentId}`)

export const useSubscriptionSession = (id: string) =>
  apiRequest<Subscription>(`/api/subscriptions/${id}/use`, {
    method: 'PATCH',
  })
