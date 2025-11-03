"use client"
import { useState } from "react"
import { Link } from "react-router-dom"


export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">LFC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg leading-tight">Liceo Fidel Coloma</span>
              <span className="text-xs text-gray-500">Excelencia Educativa</span>
            </div>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Inicio
            </a>
            <a href="#noticias" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Noticias
            </a>
            <a href="#nosotros" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Nosotros
            </a>
            <a href="#cursos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Cursos
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contacto
            </a>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Iniciar sesión
            </Link>
          </div>

          {/* Botón hamburguesa mobile */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Inicio
              </a>
              <a href="#noticias" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Noticias
              </a>
              <a href="#nosotros" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Nosotros
              </a>
              <a href="#cursos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Cursos
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Contacto
              </a>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
