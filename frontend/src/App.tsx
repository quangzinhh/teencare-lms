import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { OverviewPage } from './pages/OverviewPage'
import { ParentsPage } from './pages/ParentsPage'
import { StudentsPage } from './pages/StudentsPage'
import { RegistrationsPage } from './pages/RegistrationsPage'
import { SubscriptionsPage } from './pages/SubscriptionsPage'
import { DataPage } from './pages/DataPage'
import { ClassesPage } from './pages/ClassesPage'
import { ClassDetailPage } from './pages/ClassDetailPage'
import { ClassFormPage } from './pages/ClassFormPage'
import { ParentFormPage } from './pages/ParentFormPage'
import { StudentFormPage } from './pages/StudentFormPage'
import './styles/layout.scss'
import './styles/forms.scss'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<OverviewPage />} />
      <Route path="/parents" element={<ParentsPage />} />
      <Route path="/parents/create" element={<ParentFormPage />} />
      <Route path="/parents/:id/edit" element={<ParentFormPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/students/create" element={<StudentFormPage />} />
      <Route path="/students/:id/edit" element={<StudentFormPage />} />
      <Route path="/students/:id/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/classes/create" element={<ClassFormPage />} />
      <Route path="/classes/:id/edit" element={<ClassFormPage />} />
      <Route path="/classes/:id" element={<ClassDetailPage />} />
      <Route path="/registrations" element={<RegistrationsPage />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
