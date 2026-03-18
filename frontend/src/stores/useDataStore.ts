import { useState } from 'react'
import type { Parent, Student, ClassItem } from '../types'

export const useDataStore = () => {
  const [parents, setParents] = useState<Parent[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [classes, setClasses] = useState<ClassItem[]>([])

  return {
    parents,
    setParents,
    students,
    setStudents,
    classes,
    setClasses,
  }
}
