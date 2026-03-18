import { useEffect } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { useDataStore } from '../stores/useDataStore'
import { useStatus } from '../hooks/useStatus'
import { StatusBanner } from '../components/StatusBanner'
import { fetchParents } from '../services/parentsApi'
import { fetchStudents } from '../services/studentsApi'

export const DataPage = () => {
  const { parents, students, setParents, setStudents } = useDataStore()
  const { status, setStatus } = useStatus()

  useEffect(() => {
    fetchParents()
      .then(setParents)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải phụ huynh',
        })
      })

    fetchStudents()
      .then(setStudents)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải học sinh',
        })
      })
  }, [setParents, setStudents, setStatus])

  return (
    <AppLayout
      title="TeenCare Learning Admin"
      subtitle="Quản lý phụ huynh, học sinh, lớp học và đăng ký."
    >
      <StatusBanner status={status} />

      <section className="card">
        <div className="card-header">
          <h2>Danh sách phụ huynh</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Parent</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {parents.length === 0 ? (
              <tr>
                <td colSpan={3}>Chưa có dữ liệu</td>
              </tr>
            ) : (
              parents.map((parent) => (
                <tr key={parent.id}>
                  <td>{parent.name}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>Danh sách học sinh</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>DOB</th>
              <th>Grade</th>
              <th>Parent ID</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4}>Chưa có dữ liệu</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.dob}</td>
                  <td>{student.currentGrade}</td>
                  <td>{student.parentId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </AppLayout>
  )
}
