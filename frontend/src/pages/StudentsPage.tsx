import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBanner } from '../components/StatusBanner'
import { AppLayout } from '../components/layout/AppLayout'
import { useStatus } from '../hooks/useStatus'
import { useDataStore } from '../stores/useDataStore'
import { deleteStudent, fetchStudents } from '../services/studentsApi'

export const StudentsPage = () => {
  const navigate = useNavigate()
  const { students, setStudents } = useDataStore()
  const { status, setStatus } = useStatus()

  useEffect(() => {
    fetchStudents()
      .then(setStudents)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải học sinh',
        })
      })
  }, [setStudents, setStatus])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xoá?')
    if (!confirmDelete) return

    try {
      await deleteStudent(id)
      setStudents((prev) => prev.filter((student) => student.id !== id))
      setStatus({ type: 'success', message: 'Xoá thành công' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Xoá thất bại',
      })
    }
  }

  return (
    <AppLayout
      title="TeenCare Learning Admin"
      subtitle="Quản lý phụ huynh, học sinh, lớp học và đăng ký."
    >
      <StatusBanner status={status} />

      <section className="card">
        <div className="card-header">
          <h2>Danh sách học sinh</h2>
          <button onClick={() => navigate('/students/create')}>+ Tạo mới</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>DOB</th>
              <th>Grade</th>
              <th>Parent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5}>Chưa có dữ liệu</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.dob}</td>
                  <td>{student.currentGrade}</td>
                  <td>{student.parent?.name ?? 'Chưa có'}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() =>
                          navigate(`/students/${student.id}/subscriptions`)
                        }
                      >
                        Subscription
                      </button>
                      <button onClick={() => navigate(`/students/${student.id}/edit`)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(student.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </AppLayout>
  )
}
