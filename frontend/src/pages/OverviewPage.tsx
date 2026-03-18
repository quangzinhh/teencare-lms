import { ScheduleGrid } from '../components/ScheduleGrid'
import { StatusBanner } from '../components/StatusBanner'
import { AppLayout } from '../components/layout/AppLayout'
import { useClasses } from '../hooks/useClasses'
import { useStatus } from '../hooks/useStatus'
import { useDataStore } from '../stores/useDataStore'

export const OverviewPage = () => {
  const { classes, setClasses } = useDataStore()
  const { status, setStatus } = useStatus()

  useClasses(setClasses, (message) => setStatus({ type: 'error', message }))

  return (
    <AppLayout
      title="TeenCare Learning Admin"
      subtitle="Quản lý phụ huynh, học sinh, lớp học và đăng ký."
    >
      <section className="card">
        <div className="card-header">
          <h2>Lịch lớp theo tuần</h2>
          <span className="badge">Classes</span>
        </div>
        <ScheduleGrid classes={classes} />
      </section>

      <StatusBanner status={status} />
    </AppLayout>
  )
}
