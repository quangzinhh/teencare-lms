import { NavLink } from 'react-router-dom'
import type { SidebarItem } from '../../types'

type SidebarProps = {
  items: SidebarItem[]
}

export const Sidebar = ({ items }: SidebarProps) => (
  <aside className="sidebar">
    <div className="sidebar__brand">
      <div className="sidebar__brand-title">TeenCare Admin</div>
      <div className="sidebar__brand-subtitle">
        Quản lý phụ huynh, học sinh, lớp học và đăng ký.
      </div>
    </div>
    <nav className="sidebar__nav">
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          className={({ isActive }) =>
            `sidebar__item ${isActive ? 'active' : ''}`
          }
        >
          <span>{item.label}</span>
          {item.description && (
            <span className="sidebar__desc">{item.description}</span>
          )}
        </NavLink>
      ))}
    </nav>
  </aside>
)

