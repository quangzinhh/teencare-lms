import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { useStatus } from '../hooks/useStatus'
import { StatusBanner } from '../components/StatusBanner'
import { fetchParents } from '../services/parentsApi'
import {
  createStudent,
  getStudentById,
  updateStudent,
} from '../services/studentsApi'
import type { Parent } from '../types'

const emptyStudent = {
  name: '',
  dob: '',
  gender: '',
  currentGrade: '',
  parentId: '',
}

export const StudentFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { status, setStatus, clearStatus } = useStatus()
  const [form, setForm] = useState(emptyStudent)
  const [parents, setParents] = useState<Parent[]>([])
  const isEdit = Boolean(id)

  useEffect(() => {
    fetchParents()
      .then(setParents)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải phụ huynh',
        })
      })
  }, [setStatus])

  useEffect(() => {
    if (!id) return
    getStudentById(id)
      .then(setForm)
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải học sinh',
        })
      })
  }, [id, setStatus])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    clearStatus()
    try {
      if (isEdit && id) {
        await updateStudent(id, form)
      } else {
        await createStudent(form)
      }
      setStatus({ type: 'success', message: 'Lưu học sinh thành công' })
      navigate('/students')
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Lưu học sinh thất bại',
      })
    }
  }

  return (
    <AppLayout title={isEdit ? 'Chỉnh sửa học sinh' : 'Tạo học sinh mới'}>
      <StatusBanner status={status} />
      <section className="card">
        <form className="form" onSubmit={handleSubmit}>
          <label>Họ tên</label>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
            placeholder="Trần Thị B"
          />
          <label>Ngày sinh</label>
          <input
            type="date"
            value={form.dob}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                dob: event.target.value,
              }))
            }
          />
          <label>Giới tính</label>
          <input
            value={form.gender}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                gender: event.target.value,
              }))
            }
            placeholder="Male / Female"
          />
          <label>Khối lớp</label>
          <input
            value={form.currentGrade}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                currentGrade: event.target.value,
              }))
            }
            placeholder="Grade 8"
          />
          <label>Phụ huynh</label>
          <select
            value={form.parentId}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                parentId: event.target.value,
              }))
            }
          >
            <option value="">Chọn phụ huynh</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name} ({parent.phone})
              </option>
            ))}
          </select>
          <button type="submit">{isEdit ? 'Cập nhật' : 'Tạo mới'}</button>
        </form>
      </section>
    </AppLayout>
  )
}
