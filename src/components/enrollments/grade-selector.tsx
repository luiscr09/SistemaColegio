"use client"

import { useState } from "react"
import type { Grade } from "../../types/types"

interface GradeSelectorProps {
  onSelect: (grade: Grade) => void
}

// Mock data - Reemplazar con Supabase
const mockGrades: Grade[] = [
  { id: "1", name: "Primero", level: 1 },
  { id: "2", name: "Segundo", level: 2 },
  { id: "3", name: "Tercero", level: 3 },
  { id: "4", name: "Cuarto", level: 4 },
]

export default function GradeSelector({ onSelect }: GradeSelectorProps) {
  const [grades, setGrades] = useState<Grade[]>(mockGrades)

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecciona Grado</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {grades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => onSelect(grade)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-center"
          >
            <p className="font-medium text-gray-900">{grade.name}</p>
            <p className="text-xs text-gray-600">Nivel {grade.level}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
