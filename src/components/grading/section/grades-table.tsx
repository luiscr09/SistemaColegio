"use client"

import { useState } from "react"

interface GradesTableProps {
  distributions: Array<{ id: string; name: string; maxPoints: number }>
  maxScore: number
  levelId: string
  gradeId: string
  classroom: string
  onBack: () => void
}

export default function GradesTable({
  distributions,
  maxScore,
  levelId,
  gradeId,
  classroom,
  onBack,
}: GradesTableProps) {
  // Mock data - En producción venir de BD
  const mockStudents = Array.from({ length: 25 }, (_, i) => ({
    id: `student-${i + 1}`,
    name: `Estudiante ${i + 1}`,
  }))

  const [grades, setGrades] = useState<Record<string, Record<string, number>>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState("")

  const handleGradeChange = (studentId: string, distributionId: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    const maxPoints = distributions.find((d) => d.id === distributionId)?.maxPoints || 0

    if (numValue > maxPoints) {
      return // No permitir exceder el máximo
    }

    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [distributionId]: numValue,
      },
    }))
  }

  const getStudentTotal = (studentId: string) => {
    const studentGrades = grades[studentId] || {}
    return distributions.reduce((sum, dist) => sum + (studentGrades[dist.id] || 0), 0)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulamos guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSavedMessage("Calificaciones guardadas exitosamente")
    setIsSaving(false)
    setTimeout(() => setSavedMessage(""), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Registro de Calificaciones - Aula {classroom}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atrás
        </button>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sky-600 text-white">
              <th className="px-4 py-3 text-left">Estudiante</th>
              {distributions.map((dist) => (
                <th key={dist.id} className="px-4 py-3 text-center">
                  <div>{dist.name}</div>
                  <div className="text-xs font-normal">({dist.maxPoints})</div>
                </th>
              ))}
              <th className="px-4 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                {distributions.map((dist) => (
                  <td key={dist.id} className="px-4 py-3 text-center">
                    <input
                      type="number"
                      value={grades[student.id]?.[dist.id] || ""}
                      onChange={(e) => handleGradeChange(student.id, dist.id, e.target.value)}
                      max={dist.maxPoints}
                      min="0"
                      placeholder="0"
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </td>
                ))}
                <td className="px-4 py-3 text-center font-semibold bg-sky-50">
                  {getStudentTotal(student.id).toFixed(2)} / {maxScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {savedMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300">✓ {savedMessage}</div>
      )}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`w-full px-6 py-3 font-semibold rounded-lg transition-all ${
          isSaving
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
        }`}
      >
        {isSaving ? "Guardando..." : "Guardar Calificaciones"}
      </button>
    </div>
  )
}
