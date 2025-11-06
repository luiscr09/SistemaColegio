
import { useState } from "react"
import type React from "react"

import {
  Users,
  UserPlus,
  UserCheck,
  GraduationCap,
  BookOpen,
  ClipboardList,
  BarChart3,
  Calendar,
  CreditCard,
  FileText,
  CalendarDays,
  Award,
  Newspaper,
  Bell,
  Shield,
  Database,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

interface MenuItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
}

interface MenuSection {
  section: string
  items: MenuItem[]
}

const menuData: MenuSection[] = [
  {
    section: "Estudiantes",
    items: [
      { title: "Registrar Estudiantes", icon: UserPlus, href: "#" },
      { title: "Listar Estudiantes", icon: Users, href: "#" },
      { title: "Asignar a Cursos", icon: UserCheck, href: "#" },
    ],
  },
  {
    section: "Profesores",
    items: [
      { title: "Registrar Profesores", icon: GraduationCap, href: "#" },
      { title: "Asignar a Cursos", icon: UserCheck, href: "#" },
    ],
  },
  {
    section: "Cursos y Asignaturas",
    items: [
      { title: "Gestionar Cursos", icon: BookOpen, href: "#" },
      { title: "Gestionar Asignaturas", icon: ClipboardList, href: "#" },
    ],
  },
  {
    section: "Control Académico",
    items: [
      { title: "Calificaciones", icon: Award, href: "#" },
      { title: "Reportes Académicos", icon: BarChart3, href: "#" },
    ],
  },
  {
    section: "Administración",
    items: [
      { title: "Horarios", icon: Calendar, href: "#" },
      { title: "Pagos y Matrículas", icon: CreditCard, href: "#" },
      { title: "Reportes Financieros", icon: FileText, href: "#" },
      { title: "Eventos Escolares", icon: CalendarDays, href: "#" },
      { title: "Certificados", icon: Award, href: "#" },
    ],
  },
  {
    section: "Comunicación",
    items: [
      { title: "Noticias", icon: Newspaper, href: "#" },
      { title: "Notificaciones", icon: Bell, href: "#" },
    ],
  },
  {
    section: "Usuarios y Sistema",
    items: [
      { title: "Roles y Permisos", icon: Shield, href: "#" },
      { title: "Backup", icon: Database, href: "#" },
    ],
  },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const {pathname} = useLocation();
  const router = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear session/tokens here
    router("/login")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 
          transition-all duration-300 ease-in-out z-40 flex flex-col
          ${isCollapsed ? "w-20" : "w-72"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-blue-600 text-white">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8" />
              <div>
                <h1 className="font-bold text-lg leading-tight">Sistema Colegio</h1>
                <p className="text-xs text-blue-100">Liceo Fidel Coloma</p>
              </div>
            </div>
          )}
          {isCollapsed && <GraduationCap className="w-8 h-8 mx-auto" />}

          {/* Collapse Button - Desktop only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1.5 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          {menuData.map((section, idx) => (
            <div key={idx} className="mb-6">
              {!isCollapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.section}
                </h3>
              )}
              {isCollapsed && <div className="h-px bg-gray-200 mx-2 mb-2" />}
              <nav className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={itemIdx}
                      to={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                        ${isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"}
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : ""}`} />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                      {!isCollapsed && item.badge && (
                        <span className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer - Logout */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-red-600 hover:bg-red-50 transition-all font-medium
              ${isCollapsed ? "justify-center" : ""}
            `}
            title={isCollapsed ? "Cerrar Sesión" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
