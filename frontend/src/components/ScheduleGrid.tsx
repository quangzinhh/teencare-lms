import type { ClassItem } from '../types'
import '../styles/week-grid.scss'

type ScheduleGridProps = {
  classes: ClassItem[]
}

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const getMonthDays = (year: number, month: number) => {
  const total = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: total }, (_, index) => index + 1)
}

export const ScheduleGrid = ({ classes }: ScheduleGridProps) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthDays = getMonthDays(year, month)
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = (firstDay + 6) % 7
  const totalCells = 42

  const classesByDate = classes.reduce<Record<string, ClassItem[]>>(
    (acc, item) => {
      if (!acc[item.classDate]) {
        acc[item.classDate] = []
      }
      acc[item.classDate].push(item)
      return acc
    },
    {},
  )

  const monthLabel = today.toLocaleDateString('vi-VN', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>{monthLabel}</h3>
      </div>
      <div className="calendar-grid">
        {weekLabels.map((label) => (
          <div key={label} className="calendar-weekday">
            {label}
          </div>
        ))}
        {Array.from({ length: totalCells }, (_, index) => {
          const dayNumber = index - startOffset + 1
          const isCurrentMonth = dayNumber >= 1 && dayNumber <= monthDays.length
          const dateValue = isCurrentMonth
            ? new Date(year, month, dayNumber).toISOString().slice(0, 10)
            : ''
          const dayClasses = dateValue ? classesByDate[dateValue] ?? [] : []

          return (
            <div
              key={`cell-${index}`}
              className={`calendar-cell ${isCurrentMonth ? '' : 'is-muted'}`}
            >
              {isCurrentMonth && (
                <div className="calendar-date">{dayNumber}</div>
              )}
              {isCurrentMonth && dayClasses.length > 0 ? (
                <div className="calendar-classes">
                  {dayClasses.map((item) => (
                    <div key={item.id} className="calendar-class">
                      <div className="calendar-class-time">
                        {item.classStartTime} - {item.classEndTime}
                      </div>
                      <div className="calendar-class-name">{item.name}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
