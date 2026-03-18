import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { StatusBanner } from '../components/StatusBanner'
import { useStatus } from '../hooks/useStatus'
import { useDataStore } from '../stores/useDataStore'
import { deleteClass, fetchClasses } from '../services/classesApi'

export const ClassesPage = () => {
  const navigate = useNavigate()
  const { classes, setClasses } = useDataStore()
  const { status, setStatus } = useStatus()

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải lớp học',
        })
      })
  }, [setClasses, setStatus])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xoá?')
    if (!confirmDelete) return

    try {
      await deleteClass(id)
      setClasses((prev) => prev.filter((item) => item.id !== id))
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
          <h2>Danh sách lớp học</h2>
          <button onClick={() => navigate('/classes/create')}>+ Tạo mới</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Lớp</th>
              <th>Môn</th>
              <th>Ngày học</th>
              <th>Giờ bắt đầu</th>
              <th>Giờ kết thúc</th>
              <th>Giáo viên</th>
              <th>Sĩ số</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan={8}>Chưa có dữ liệu</td>
              </tr>
            ) : (
              classes.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.subject}</td>
                  <td>{item.classDate}</td>
                  <td>{item.classStartTime}</td>
                  <td>{item.classEndTime}</td>
                  <td>{item.teacherName}</td>
                  <td>{item.maxStudents}</td>
                  <td>
                    <div className="table-actions">
                      <button onClick={() => navigate(`/classes/${item.id}`)}>
                        Detail
                      </button>
                      <button onClick={() => navigate(`/classes/${item.id}/edit`)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
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
