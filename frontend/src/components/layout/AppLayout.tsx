import { useLocation } from 'react-router-dom'
import type { SidebarItem } from '../../types'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

const NAV_ITEMS: SidebarItem[] = [
  {
    id: 'overview',
    label: 'Tổng quan',
    to: '/',
    description: 'Lịch lớp & trạng thái',
  },
  {
    id: 'classes',
    label: 'Lớp học',
    to: '/classes',
    description: 'Quản lý & đăng ký lớp',
  },
  {
    id: 'parents',
    label: 'Phụ huynh',
    to: '/parents',
    description: 'Tạo & quản lý phụ huynh',
  },
  {
    id: 'students',
    label: 'Học sinh',
    to: '/students',
    description: 'Thêm học sinh mới',
  }
]

type AppLayoutProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const AppLayout = ({ title, subtitle, children }: AppLayoutProps) => {
  const location = useLocation()
  const currentItem = NAV_ITEMS.find((item) => item.to === location.pathname)
  const navbarTitle = currentItem?.label ?? title
  const navbarSubtitle = currentItem?.description ?? subtitle

  return (
    <div className="app-shell">
      <Sidebar items={NAV_ITEMS} />
      <div className="app-shell__content">
        <Navbar title={navbarTitle} subtitle={navbarSubtitle} />
        <main className="app-shell__main">{children}</main>
      </div>
    </div>
  )
}
