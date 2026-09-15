import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Consultants from './pages/Consultants'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Clients from './pages/Clients'
import Certificates from './pages/Certificates'
import Reports from './pages/Reports'
import Contact from './pages/Contact'
import OurPurpose from './pages/OurPurpose'
import Portfolio from './pages/Portfolio'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import PrivateRoute from './components/common/PrivateRoute'

export default function App() {
  return (
    <Routes>
      {/* Public Routes wrapped in shared Layout */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="our-purpose" element={<OurPurpose />} />
        <Route path="team" element={<Team />} />
        <Route path="consultants" element={<Consultants />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="projects" element={<Projects />} />
        <Route path="clients" element={<Clients />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="reports" element={<Reports />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin — hidden, no nav link */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
