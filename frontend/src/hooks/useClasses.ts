import { useEffect } from 'react'
import { fetchClasses } from '../services/classesApi'
import type { ClassItem } from '../types'

export const useClasses = (
  setClasses: (items: ClassItem[]) => void,
  onError: (message: string) => void,
) => {
  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch((error) => {
        onError(error.message ?? 'Không thể tải danh sách lớp')
      })
  }, [setClasses, onError])
}
