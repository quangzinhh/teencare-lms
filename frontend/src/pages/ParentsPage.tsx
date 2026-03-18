import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { StatusBanner } from '../components/StatusBanner'
import { useStatus } from '../hooks/useStatus'
import { useDataStore } from '../stores/useDataStore'
import { deleteParent, fetchParents } from '../services/parentsApi'

export const ParentsPage = () => {
  const navigate = useNavigate()
  const { parents, setParents } = useDataStore()
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
  }, [setParents, setStatus])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xoá?')
    if (!confirmDelete) return

    try {
      await deleteParent(id)
      setParents((prev) => prev.filter((parent) => parent.id !== id))
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
          <h2>Danh sách phụ huynh</h2>
          <button onClick={() => navigate('/parents/create')}>+ Tạo mới</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parents.length === 0 ? (
              <tr>
                <td colSpan={4}>Chưa có dữ liệu</td>
              </tr>
            ) : (
              parents.map((parent) => (
                <tr key={parent.id}>
                  <td>{parent.name}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.email}</td>
                  <td>
                    <div className="table-actions">
                      <button onClick={() => navigate(`/parents/${parent.id}/edit`)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(parent.id)}>Delete</button>
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
