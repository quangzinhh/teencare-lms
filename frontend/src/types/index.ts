export type Parent = {
  id: string
  name: string
  phone: string
  email: string
}

export type Student = {
  id: string
  name: string
  dob: string
  gender: string
  currentGrade: string
  parentId: string
  parent?: Parent
}

export type ClassItem = {
  id: string
  name: string
  subject: string
  classDate: string
  classStartTime: string
  classEndTime: string
  teacherName: string
  maxStudents: number
}

export type Subscription = {
  id: string
  studentId: string
  packageName: string
  startDate: string
  endDate: string
  totalSessions: number
  usedSessions: number
}

export type ApiStatus = {
  type: 'idle' | 'success' | 'error'
  message: string
}

export type SidebarItem = {
  id: string
  label: string
  to: string
  description?: string
}
