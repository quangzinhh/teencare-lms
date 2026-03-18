import { useState } from 'react'
import { StatusBanner } from '../components/StatusBanner'
import { AppLayout } from '../components/layout/AppLayout'
import { useStatus } from '../hooks/useStatus'
import { registerClass } from '../services/registrationsApi'

const emptyRegistration = { classId: '', studentId: '' }

export const RegistrationsPage = () => {
  const { status, setStatus, clearStatus } = useStatus()
  const [registrationForm, setRegistrationForm] = useState(emptyRegistration)

  const handleRegistrationSubmit = async (event: React.FormEvent) => {
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
    <AppLayout
      title="TeenCare Learning Admin"
      subtitle="Quản lý phụ huynh, học sinh, lớp học và đăng ký."
    >
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
    </AppLayout>
  )
}
