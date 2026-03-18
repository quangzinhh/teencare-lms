import { useState } from 'react'
import { ScheduleGrid } from '../components/ScheduleGrid'
import { StatusBanner } from '../components/StatusBanner'
import { useStatus } from '../hooks/useStatus'
import { useClasses } from '../hooks/useClasses'
import { useDataStore } from '../stores/useDataStore'
import { createParent } from '../services/parentsApi'
import { createStudent } from '../services/studentsApi'
import { registerClass } from '../services/registrationsApi'

const emptyParent = { name: '', phone: '', email: '' }
const emptyStudent = {
  name: '',
  dob: '',
  gender: '',
  currentGrade: '',
  parentId: '',
}
const emptyRegistration = { classId: '', studentId: '' }

export const HomePage = () => {
  const { parents, setParents, students, setStudents, classes, setClasses } =
    useDataStore()
  const { status, setStatus, clearStatus } = useStatus()
  const [parentForm, setParentForm] = useState(emptyParent)
  const [studentForm, setStudentForm] = useState(emptyStudent)
  const [registrationForm, setRegistrationForm] = useState(emptyRegistration)

  useClasses(setClasses, (message) => setStatus({ type: 'error', message }))

  const handleParentSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    clearStatus()
    try {
      const created = await createParent(parentForm)
      setParents((prev) => [...prev, created])
      setParentForm(emptyParent)
      setStatus({ type: 'success', message: 'Parent created successfully' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Create parent failed',
      })
    }
  }

  const handleStudentSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    clearStatus()
    try {
      const created = await createStudent(studentForm)
      setStudents((prev) => [...prev, created])
      setStudentForm(emptyStudent)
      setStatus({ type: 'success', message: 'Student created successfully' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Create student failed',
      })
    }
  }

  const handleRegistrationSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    clearStatus()
    try {
      await registerClass(registrationForm)
      setRegistrationForm(emptyRegistration)
      setStatus({ type: 'success', message: 'Registration created' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Registration failed',
      })
    }
  }

  return (
    <div className="app">
      <div className="container">
        <section className="grid">
          <div className="card">
            <div className="card-header">
              <h2>Tạo phụ huynh</h2>
              <span className="badge">Parent</span>
            </div>
            <form className="form" onSubmit={handleParentSubmit}>
              <label>Họ tên</label>
              <input
                value={parentForm.name}
                onChange={(event) =>
                  setParentForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                placeholder="Nguyễn Văn A"
              />
              <label>Số điện thoại</label>
              <input
                value={parentForm.phone}
                onChange={(event) =>
                  setParentForm((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }))
                }
                placeholder="0901234567"
              />
              <label>Email</label>
              <input
                value={parentForm.email}
                onChange={(event) =>
                  setParentForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                placeholder="parent@email.com"
              />
              <div className="helper">
                Sau khi tạo, lưu lại ID để dùng cho học sinh.
              </div>
              <button type="submit">Tạo phụ huynh</button>
            </form>
          </div>

          <div className="card">
            <div className="card-header">
              <h2>Tạo học sinh</h2>
              <span className="badge">Student</span>
            </div>
            <form className="form" onSubmit={handleStudentSubmit}>
              <label>Họ tên</label>
              <input
                value={studentForm.name}
                onChange={(event) =>
                  setStudentForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                placeholder="Trần Thị B"
              />
              <label>Ngày sinh</label>
              <input
                type="date"
                value={studentForm.dob}
                onChange={(event) =>
                  setStudentForm((prev) => ({
                    ...prev,
                    dob: event.target.value,
                  }))
                }
              />
              <label>Giới tính</label>
              <input
                value={studentForm.gender}
                onChange={(event) =>
                  setStudentForm((prev) => ({
                    ...prev,
                    gender: event.target.value,
                  }))
                }
                placeholder="Male / Female"
              />
              <label>Khối lớp</label>
              <input
                value={studentForm.currentGrade}
                onChange={(event) =>
                  setStudentForm((prev) => ({
                    ...prev,
                    currentGrade: event.target.value,
                  }))
                }
                placeholder="Grade 8"
              />
              <label>Parent ID</label>
              <input
                value={studentForm.parentId}
                onChange={(event) =>
                  setStudentForm((prev) => ({
                    ...prev,
                    parentId: event.target.value,
                  }))
                }
                placeholder="UUID"
              />
              <button type="submit">Tạo học sinh</button>
            </form>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Lịch lớp theo tuần</h2>
            <span className="badge">Classes</span>
          </div>
          <ScheduleGrid classes={classes} />
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Đăng ký lớp</h2>
            <span className="badge">Registration</span>
          </div>
          <form className="form" onSubmit={handleRegistrationSubmit}>
            <label>Class ID</label>
            <input
              value={registrationForm.classId}
              onChange={(event) =>
                setRegistrationForm((prev) => ({
                  ...prev,
                  classId: event.target.value,
                }))
              }
              placeholder="UUID"
            />
            <label>Student ID</label>
            <input
              value={registrationForm.studentId}
              onChange={(event) =>
                setRegistrationForm((prev) => ({
                  ...prev,
                  studentId: event.target.value,
                }))
              }
              placeholder="UUID"
            />
            <button type="submit">Đăng ký</button>
          </form>
        </section>

        <StatusBanner status={status} />

        <section className="card">
          <div className="card-header">
            <h2>Dữ liệu tạo nhanh</h2>
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
          <div style={{ height: 16 }} />
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
      </div>
    </div>
  )
}
