"use client"

import { useState } from "react"
import type { Student } from "../../types/grading"
import { Search, User } from "lucide-react"

// Mock data - Reemplazar con Supabase
const mockStudents: Student[] = [
  { id: "1", first_name: "Juan", last_name: "García", cui: "001-123456-7890A" },
  { id: "2", first_name: "María", last_name: "López", cui: "001-234567-8901B" },
  { id: "3", first_name: "Carlos", last_name: "Rodríguez", cui: "001-345678-9012C" },
  { id: "4", first_name: "Ana", last_name: "Martínez", cui: "001-456789-0123D" },
  { id: "5", first_name: "Pedro", last_name: "Sánchez", cui: "001-567890-1234E" },
]

interface StudentSelectorProps {
  value: Student | null
  onChange: (student: Student | null) => void
}

export function StudentSelector({ value, onChange }: StudentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = mockStudents.filter(
    (s) => `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) || s.cui.includes(search),
  )

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground mb-2">Estudiante</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-sky-600" />
            {value ? `${value.first_name} ${value.last_name}` : "Selecciona un estudiante"}
          </span>
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-border">
              <input
                type="text"
                placeholder="Buscar por nombre o CUI..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>
            <ul className="max-h-64 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((student) => (
                  <li key={student.id}>
                    <button
                      onClick={() => {
                        onChange(student)
                        setIsOpen(false)
                        setSearch("")
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-sky-50 transition-colors"
                    >
                      <div className="font-medium text-foreground">
                        {student.first_name} {student.last_name}
                      </div>
                      <div className="text-xs text-muted-foreground">CUI: {student.cui}</div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-center text-sm text-muted-foreground">No se encontraron estudiantes</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
