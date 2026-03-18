import { useState } from 'react'
import type { ApiStatus } from '../types'

export const useStatus = () => {
  const [status, setStatus] = useState<ApiStatus>({ type: 'idle', message: '' })

  const clearStatus = () => setStatus({ type: 'idle', message: '' })

  return {
    status,
    setStatus,
    clearStatus,
  }
}
