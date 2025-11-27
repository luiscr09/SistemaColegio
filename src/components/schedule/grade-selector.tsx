"use client"

import type { GradeLevel } from "../../types/schedule"

interface GradeSelectorProps {
  grades: GradeLevel[]
  selectedGrade: string
  onGradeChange: (gradeId: string) => void
}

export function GradeSelector({ grades, selectedGrade, onGradeChange }: GradeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">Seleccionar Grado</label>
      <select
        value={selectedGrade}
        onChange={(e) => onGradeChange(e.target.value)}
        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
      >
        <option value="">-- Elige un grado --</option>
        {grades.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.name}
          </option>
        ))}
      </select>
    </div>
  )
}
