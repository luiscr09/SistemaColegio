"use client"

import { useState, useEffect } from "react"
import type { Student } from "../../types/types"

interface StudentSelectorProps {
  onSelect: (student: Student) => void
}

// Mock data - Reemplazar con Supabase
const mockStudents: Student[] = [
  { id: "1", first_name: "Juan", last_name: "Pérez", cue_mined: "CUE001", birth_certificate_number: "BC001" },
  { id: "2", first_name: "María", last_name: "García", cue_mined: "CUE002", birth_certificate_number: "BC002" },
  { id: "3", first_name: "Carlos", last_name: "López", cue_mined: "CUE003", birth_certificate_number: "BC003" },
]

export default function StudentSelector({ onSelect }: StudentSelectorProps) {
  const [search, setSearch] = useState("")
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [filtered, setFiltered] = useState<Student[]>(mockStudents)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(students)
      console.log("lol")
      return
    }

    const searchLower = search.toLowerCase()
    const results = students.filter(
      (student) =>
        student.first_name.toLowerCase().includes(searchLower) ||
        student.last_name.toLowerCase().includes(searchLower) ||
        student.cue_mined.toLowerCase().includes(searchLower) ||
        student.birth_certificate_number.toLowerCase().includes(searchLower),
    )
    setFiltered(results)
  }, [search, students])

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecciona un Estudiante</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por nombre, CUI o certificado</label>
        <input
          type="text"
          placeholder="Ingresa nombre, apellido, CUI o número de certificado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelect(student)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <p className="font-medium text-gray-900">
                {student.first_name} {student.last_name}
              </p>
              <p className="text-sm text-gray-600">
                CUI: {student.cue_mined} | Cert: {student.birth_certificate_number}
              </p>
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No se encontraron estudiantes</p>
        )}
      </div>
    </div>
  )
}
