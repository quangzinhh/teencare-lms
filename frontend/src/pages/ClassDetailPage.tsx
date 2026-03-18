import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { StatusBanner } from '../components/StatusBanner'
import { useStatus } from '../hooks/useStatus'
import { registerClass } from '../services/registrationsApi'
import { fetchClassDetail } from '../services/classesApi'
import { fetchStudents } from '../services/studentsApi'
import type { ClassDetail } from '../services/classesApi'
import type { Student } from '../types'

const emptyRegistration = { studentId: '' }

export const ClassDetailPage = () => {
  const { id } = useParams()
  const { status, setStatus, clearStatus } = useStatus()
  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null)
  const [registrationForm, setRegistrationForm] = useState(emptyRegistration)
  const [students, setStudents] = useState<Student[]>([])
  const [studentQuery, setStudentQuery] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')

  useEffect(() => {
    if (!id) return

    fetchClassDetail(id)
      .then(setClassDetail)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải lớp học',
        })
      })
  }, [id, setStatus])

  useEffect(() => {
    fetchStudents()
      .then(setStudents)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải học sinh',
        })
      })
  }, [setStatus])

  const handleRegistrationSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    if (!id) return
    clearStatus()
    try {
      await registerClass({
        classId: id,
        studentId: registrationForm.studentId,
      })
      setRegistrationForm(emptyRegistration)
      setStudentQuery('')
      setSelectedStudentId('')
      const updated = await fetchClassDetail(id)
      setClassDetail(updated)
      setStatus({ type: 'success', message: 'Registration created' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Registration failed',
      })
    }
  }

  const selectedStudent = students.find(
    (student) => student.id === selectedStudentId,
  )
  const normalizedQuery = studentQuery.trim().toLowerCase()
  const filteredStudents = students.filter((student) => {
    if (!normalizedQuery || selectedStudentId) return false
    const nameMatch = student.name.toLowerCase().includes(normalizedQuery)
    const parentMatch = (student.parent?.name ?? '')
      .toLowerCase()
      .includes(normalizedQuery)
    return nameMatch || parentMatch
  })

  return (
    <AppLayout
      title="TeenCare Learning Admin"
      subtitle="Quản lý phụ huynh, học sinh, lớp học và đăng ký."
    >
      <StatusBanner status={status} />

      <section className="card">
        <div className="card-header">
          <div>
            <h2>{classDetail?.name ?? 'Chi tiết lớp học'}</h2>
            <div className="helper">
              {classDetail
                ? `${classDetail.subject} • ${classDetail.classDate} • ${classDetail.classStartTime} - ${classDetail.classEndTime}`
                : 'Đang tải thông tin'}
            </div>
          </div>
          <Link className="button" to="/classes">
            Quay lại danh sách
          </Link>
        </div>
        {classDetail && (
          <div className="grid">
            <div className="card" style={{ background: 'transparent' }}>
              <h3 className="section-title">Thông tin lớp</h3>
              <div className="helper">Giáo viên: {classDetail.teacherName}</div>
              <div className="helper">Sĩ số tối đa: {classDetail.maxStudents}</div>
            </div>
            <div className="card" style={{ background: 'transparent' }}>
              <h3 className="section-title">Đăng ký học sinh</h3>
              <form className="form" onSubmit={handleRegistrationSubmit}>
                <label>Tìm & chọn học sinh</label>
                <input
                  value={studentQuery}
                  onChange={(event) => {
                    setStudentQuery(event.target.value)
                    setSelectedStudentId('')
                    setRegistrationForm((prev) => ({
                      ...prev,
                      studentId: '',
                    }))
                  }}
                  placeholder="Tìm theo tên hoặc phụ huynh"
                />
                {selectedStudent && (
                  <div className="helper">
                    Đã chọn: {selectedStudent.name}
                    {selectedStudent.parent?.name
                      ? ` - ${selectedStudent.parent.name}`
                      : ''}
                  </div>
                )}
                {normalizedQuery && !selectedStudentId && (
                  <div className="card" style={{ background: 'transparent' }}>
                    {filteredStudents.length === 0 ? (
                      <div className="helper">
                        Không tìm thấy học sinh phù hợp.
                      </div>
                    ) : (
                      <div className="table-actions" style={{ flexWrap: 'wrap' }}>
                        {filteredStudents.map((student) => (
                          <button
                            key={student.id}
                            type="button"
                            onClick={() => {
                              const displayName = `${student.name}$${
                                student.parent?.name
                                  ? ` - ${student.parent.name}`
                                  : ''
                              }`
                              setStudentQuery(displayName.replace('$', ''))
                              setSelectedStudentId(student.id)
                              setRegistrationForm((prev) => ({
                                ...prev,
                                studentId: student.id,
                              }))
                            }}
                          >
                            {student.name}
                            {student.parent?.name
                              ? ` - ${student.parent.name}`
                              : ''}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <button type="submit" disabled={!registrationForm.studentId}>
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      <section className="card">
        <div className="card-header">
          <h2>Danh sách đăng ký</h2>
          <span className="badge">Registrations</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {classDetail?.registrations?.length ? (
              classDetail.registrations.map((registration) => (
                <tr key={registration.id}>
                  <td>{registration.student?.name ?? registration.studentId}</td>
                  <td>{registration.student?.currentGrade ?? '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>Chưa có đăng ký</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </AppLayout>
  )
}
