import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { StatusBanner } from '../components/StatusBanner'
import { useStatus } from '../hooks/useStatus'
import {
  createSubscription,
  getSubscriptionById,
  getSubscriptionsByStudent,
  useSubscriptionSession,
} from '../services/subscriptionsApi'
import { fetchStudents } from '../services/studentsApi'
import type { Student } from '../types'

const emptySubscription = {
  studentId: '',
  packageName: '',
  startDate: '',
  endDate: '',
  totalSessions: 0,
  usedSessions: 0,
}

export const SubscriptionsPage = () => {
  const { status, setStatus, clearStatus } = useStatus()
  const { id: studentIdFromRoute } = useParams()
  const [subscriptionForm, setSubscriptionForm] = useState({
    ...emptySubscription,
    studentId: studentIdFromRoute ?? '',
  })
  const [lookupId, setLookupId] = useState('')
  const [lookupResult, setLookupResult] = useState<null | {
    id: string
    packageName: string
    startDate: string
    endDate: string
    totalSessions: number
    usedSessions: number
  }>(null)
  const [studentSubscriptions, setStudentSubscriptions] = useState<
    Array<{
      id: string
      packageName: string
      startDate: string
      endDate: string
      totalSessions: number
      usedSessions: number
    }>
  >([])
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [studentsLoading, setStudentsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    setStudentsLoading(true)
    fetchStudents()
      .then((data) => {
        if (!isMounted) return
        setStudents(data)
      })
      .catch((error) => {
        if (!isMounted) return
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải học sinh',
        })
      })
      .finally(() => {
        if (!isMounted) return
        setStudentsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [setStatus])

  useEffect(() => {
    if (!studentIdFromRoute) return
    setSubscriptionForm((prev) => ({
      ...prev,
      studentId: studentIdFromRoute,
    }))
  }, [studentIdFromRoute])

  useEffect(() => {
    if (!studentIdFromRoute) {
      setStudentSubscriptions([])
      return
    }

    let isMounted = true
    setSubscriptionsLoading(true)
    getSubscriptionsByStudent(studentIdFromRoute)
      .then((data) => {
        if (!isMounted) return
        setStudentSubscriptions(data)
      })
      .catch((error) => {
        if (!isMounted) return
        setStatus({
          type: 'error',
          message: (error as Error).message ?? 'Không thể tải subscription',
        })
      })
      .finally(() => {
        if (!isMounted) return
        setSubscriptionsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [studentIdFromRoute, setStatus])

  const handleCreate = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    clearStatus()

    try {
      const created = await createSubscription(subscriptionForm)
      setSubscriptionForm((prev) => ({
        ...emptySubscription,
        studentId: prev.studentId,
      }))
      if (studentIdFromRoute) {
        setStudentSubscriptions((prev) => [created, ...prev])
      }
      setStatus({
        type: 'success',
        message: `Tạo thành công gói ${created.packageName}`,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Tạo subscription thất bại',
      })
    }
  }

  const handleLookup = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    clearStatus()

    try {
      const subscription = await getSubscriptionById(lookupId.trim())
      setLookupResult(subscription)
    } catch (error) {
      setLookupResult(null)
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Không tìm thấy subscription',
      })
    }
  }

  const handleUseSession = async () => {
    if (!lookupResult) return
    clearStatus()

    try {
      const updated = await useSubscriptionSession(lookupResult.id)
      setLookupResult(updated)
      setStatus({ type: 'success', message: 'Đã trừ 1 buổi học' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: (error as Error).message ?? 'Không thể trừ buổi học',
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
          <h2>Tạo subscription</h2>
          <span className="badge">Subscription</span>
        </div>
        <form className="form" onSubmit={handleCreate}>
          <label>Student</label>
          <select
            value={subscriptionForm.studentId}
            onChange={(event) =>
              setSubscriptionForm((prev) => ({
                ...prev,
                studentId: event.target.value,
              }))
            }
            disabled={studentsLoading || Boolean(studentIdFromRoute)}
          >
            <option value="" disabled>
              {studentsLoading ? 'Đang tải học sinh...' : 'Chọn học sinh'}
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.currentGrade})
              </option>
            ))}
          </select>

          <label>Package name</label>
          <input
            value={subscriptionForm.packageName}
            onChange={(event) =>
              setSubscriptionForm((prev) => ({
                ...prev,
                packageName: event.target.value,
              }))
            }
            placeholder="Combo 8 buổi"
          />

          <label>Start date</label>
          <input
            type="date"
            value={subscriptionForm.startDate}
            onChange={(event) =>
              setSubscriptionForm((prev) => ({
                ...prev,
                startDate: event.target.value,
              }))
            }
          />

          <label>End date</label>
          <input
            type="date"
            value={subscriptionForm.endDate}
            onChange={(event) =>
              setSubscriptionForm((prev) => ({
                ...prev,
                endDate: event.target.value,
              }))
            }
          />

          <label>Total sessions</label>
          <input
            type="number"
            min={1}
            value={subscriptionForm.totalSessions}
            onChange={(event) =>
              setSubscriptionForm((prev) => ({
                ...prev,
                totalSessions: Number(event.target.value),
              }))
            }
            placeholder="8"
          />

          <label>Used sessions</label>
          <input
            type="number"
            min={0}
            value={subscriptionForm.usedSessions}
            onChange={(event) =>
              setSubscriptionForm((prev) => ({
                ...prev,
                usedSessions: Number(event.target.value),
              }))
            }
            placeholder="0"
          />

          <button type="submit">Tạo subscription</button>
        </form>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>Tra cứu & trừ buổi học</h2>
          <span className="badge">Sessions</span>
        </div>
        <form className="form" onSubmit={handleLookup}>
          <label>Subscription ID</label>
          <input
            value={lookupId}
            onChange={(event) => setLookupId(event.target.value)}
            placeholder="UUID"
          />
          <button type="submit">Tra cứu</button>
        </form>

        {studentIdFromRoute && (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Total</th>
                  <th>Used</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionsLoading ? (
                  <tr>
                    <td colSpan={7}>Đang tải subscription...</td>
                  </tr>
                ) : studentSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={7}>Chưa có subscription</td>
                  </tr>
                ) : (
                  studentSubscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                      <td>{subscription.packageName}</td>
                      <td>{subscription.startDate}</td>
                      <td>{subscription.endDate}</td>
                      <td>{subscription.totalSessions}</td>
                      <td>{subscription.usedSessions}</td>
                      <td>
                        {subscription.totalSessions - subscription.usedSessions}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {lookupResult && (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Total</th>
                  <th>Used</th>
                  <th>Remaining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lookupResult.packageName}</td>
                  <td>{lookupResult.startDate}</td>
                  <td>{lookupResult.endDate}</td>
                  <td>{lookupResult.totalSessions}</td>
                  <td>{lookupResult.usedSessions}</td>
                  <td>{lookupResult.totalSessions - lookupResult.usedSessions}</td>
                  <td>
                    <button onClick={handleUseSession}>Trừ 1 buổi</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AppLayout>
  )
}

