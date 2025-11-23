"use client"

import { useState, useEffect } from "react"
import type { Student, SchoolYear } from "../../types/types"

interface SchoolYearSelectorProps {
  student: Student
  onSelect: (year: SchoolYear) => void
}

// Mock data - Reemplazar con Supabase
const mockSchoolYears: SchoolYear[] = [
  { id: "1", name: "2024", start_date: "2024-01-01", end_date: "2024-12-31", state: "abierto" },
  { id: "2", name: "2025", start_date: "2025-01-01", end_date: "2025-12-31", state: "abierto" },
  { id: "3", name: "2023", start_date: "2023-01-01", end_date: "2023-12-31", state: "cerrado" },
]

export default function SchoolYearSelector({ student, onSelect }: SchoolYearSelectorProps) {
  const [years, setYears] = useState<SchoolYear[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Filtrar solo años escolares con estado 'abierto'
    const openYears = mockSchoolYears.filter((year) => year.state === "abierto")
    setYears(openYears)
  }, [])

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona Año Escolar</h3>
      <p className="text-sm text-gray-600 mb-4">
        Estudiante:{" "}
        <strong>
          {student.first_name} {student.last_name}
        </strong>
      </p>

      <div className="space-y-2">
        {years.length > 0 ? (
          years.map((year) => (
            <button
              key={year.id}
              onClick={() => onSelect(year)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <p className="font-medium text-gray-900">{year.name}</p>
              <p className="text-sm text-gray-600">
                {new Date(year.start_date).toLocaleDateString()} - {new Date(year.end_date).toLocaleDateString()}
              </p>
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No hay años escolares disponibles</p>
        )}
      </div>
    </div>
  )
}
