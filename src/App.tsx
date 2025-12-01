import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import "./App.css"

// Supabase

// Vistas
import Login from "./views/login"
import HomePage from "./views/home"
import Student from "./views/student"
import TeachersPage from "./views/teacher"
import DashboardLayout from "./views/dashboardLayout"
import DashboardHome from "./views/dashboardhome"
import Profile from "./views/profile"
import EnrollmentsPage from "./views/enrollment"
import PaymentsPage from "./views/payment"
import SchedulePage from "./views/schedule"
import GradingPage from "./views/grading"
import NewsPage from "./views/news"
import { supabase } from "./lib/supabase"
import SeccionesPage from "./views/secciones"
import GradingBySectionPage from "./views/grading"

function App() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const location = useLocation()

  // Obtener sesión
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    getSession()

    // Escuchar cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <p>Cargando...</p>

  const isLogged = !!session

  if (!isLogged && location.pathname.startsWith("/dashboard")) {
    return <Navigate to="/login" replace />
  }

  if (isLogged && location.pathname === "/login") {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />

      {/* Rutas protegidas */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="students" element={<Student />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="enrollment" element={<EnrollmentsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="schedule/:section_id?" element={<SchedulePage />} />
        <Route path="grading" element={<GradingPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="grading" element={<GradingBySectionPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="section" element={<SeccionesPage />} />
      </Route>
    </Routes>
  )
}

export default App
