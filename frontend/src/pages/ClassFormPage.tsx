import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { StatusBanner } from '../components/StatusBanner'
import { useStatus } from '../hooks/useStatus'
import {
  createClass,
  fetchClassDetail,
  updateClass,
} from '../services/classesApi'

const emptyClass = {
  name: '',
  subject: '',
  classDate: '',
  classStartTime: '',
  classEndTime: '',
  teacherName: '',
  maxStudents: 0,
}

export const ClassFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { status, setStatus, clearStatus } = useStatus()
  const [form, setForm] = useState(emptyClass)
  const isEdit = Boolean(id)

  useEffect(() => {
    if (!id) return
    fetchClassDetail(id)
      .then((data) => {
        setForm({
          name: data.name ?? '',
          subject: data.subject ?? '',
          classDate: data.classDate ?? '',
          classStartTime: data.classStartTime ?? '',
          classEndTime: data.classEndTime ?? '',
          teacherName: data.teacherName ?? '',
          maxStudents: data.maxStudents ?? 0,
        })
      })
      .catch((error) => {
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải lớp học',
        })
      })
  }, [id, setStatus])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    clearStatus()
    try {
      const payload = {
        ...form,
        classStartTime: form.classStartTime?.slice(0, 5) ?? '',
        classEndTime: form.classEndTime?.slice(0, 5) ?? '',
        maxStudents: Number(form.maxStudents) || 0,
      }

      if (isEdit && id) {
        await updateClass(id, payload)
      } else {
        await createClass(payload)
      }

      setStatus({ type: 'success', message: 'Lưu lớp học thành công' })
      navigate('/classes')
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Lưu lớp học thất bại',
      })
    }
  }

  return (
    <AppLayout title={isEdit ? 'Chỉnh sửa lớp học' : 'Tạo lớp học mới'}>
      <StatusBanner status={status} />
      <section className="card">
        <form className="form" onSubmit={handleSubmit}>
          <label>Tên lớp</label>
          <input
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
            placeholder="Math 10A"
          />
          <label>Môn học</label>
          <input
            value={form.subject}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                subject: event.target.value,
              }))
            }
            placeholder="Math"
          />
          <label>Ngày học</label>
          <input
            type="date"
            value={form.classDate}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                classDate: event.target.value,
              }))
            }
          />
          <label>Giờ bắt đầu</label>
          <input
            type="time"
            value={form.classStartTime}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                classStartTime: event.target.value,
              }))
            }
          />
          <label>Giờ kết thúc</label>
          <input
            type="time"
            value={form.classEndTime}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                classEndTime: event.target.value,
              }))
            }
          />
          <label>Giáo viên</label>
          <input
            value={form.teacherName}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                teacherName: event.target.value,
              }))
            }
            placeholder="Cô Lan"
          />
          <label>Sĩ số tối đa</label>
          <input
            type="number"
            value={form.maxStudents}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                maxStudents: Number(event.target.value),
              }))
            }
            placeholder="30"
          />
          <button type="submit">{isEdit ? 'Cập nhật' : 'Tạo mới'}</button>
        </form>
      </section>
    </AppLayout>
  )
}
