"use client"

import { useState, useEffect } from "react"

interface GradesInputTableProps {
  config: any
  levelId: string
  gradeId: string
  classroom: string
  subjectId: string
  subjectName: string
  onBack: () => void
}

interface StudentGrade {
  studentId: string
  studentName: string
  grades: Record<string, number>
}

export default function GradesInputTable({
  config,
  levelId,
  gradeId,
  classroom,
  subjectId,
  subjectName,
  onBack,
}: GradesInputTableProps) {
  const [students, setStudents] = useState<StudentGrade[]>([])
  const [modified, setModified] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const mockStudents = [
      { id: "1", name: "Juan García" },
      { id: "2", name: "María López" },
      { id: "3", name: "Carlos Rodríguez" },
      { id: "4", name: "Ana Martínez" },
      { id: "5", name: "Pedro Sánchez" },
    ]

    const gradesKey = `gradings-${levelId}-${gradeId}-${classroom}-${subjectId}`
    const savedGrades = localStorage.getItem(gradesKey)

    let studentGrades: StudentGrade[] = mockStudents.map((student) => ({
      studentId: student.id,
      studentName: student.name,
      grades: {},
    }))

    if (savedGrades) {
      try {
        const parsed = JSON.parse(savedGrades)
        studentGrades = parsed
      } catch (error) {
        console.log("[v0] Error parsing saved grades")
      }
    }

    setStudents(studentGrades)
  }, [levelId, gradeId, classroom, subjectId])

  const handleGradeChange = (studentId: string, distributionId: string, value: number) => {
    const maxPoints = config.distributions.find((d: any) => d.id === distributionId)?.maxPoints || 0

    if (value > maxPoints) {
      alert(`La calificación no puede exceder ${maxPoints} puntos`)
      return
    }

    setStudents(
      students.map((student) =>
        student.studentId === studentId
          ? {
              ...student,
              grades: {
                ...student.grades,
                [distributionId]: Math.max(0, value),
              },
            }
          : student,
      ),
    )
    setModified(true)
    setSuccessMessage("")
  }

  const handleSave = () => {
    const gradesKey = `gradings-${levelId}-${gradeId}-${classroom}-${subjectId}`
    localStorage.setItem(gradesKey, JSON.stringify(students))
    setModified(false)
    setSuccessMessage("Calificaciones guardadas exitosamente")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const calculateTotal = (grades: Record<string, number>) => {
    return Object.values(grades).reduce((sum, grade) => sum + (grade || 0), 0)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Ingreso de Calificaciones</h2>
          <p className="text-sm text-gray-600 mt-1">
            {subjectName} - Aula {classroom}
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atrás
        </button>
      </div>

      {/* Configuración Actual */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-300 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Configuración de Evaluación</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {config.distributions.map((dist: any) => (
            <div key={dist.id}>
              <div className="text-blue-700 font-semibold">{dist.name}</div>
              <div className="text-blue-600">Máx: {dist.maxPoints} pts</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mensajes */}
      {successMessage && (
        <div className="mb-6 p-3 bg-green-50 border border-green-300 rounded-lg text-green-700">{successMessage}</div>
      )}

      {/* Tabla de Calificaciones */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Estudiante</th>
              {config.distributions.map((dist: any) => (
                <th
                  key={dist.id}
                  className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold whitespace-nowrap"
                >
                  {dist.name}
                  <div className="text-xs font-normal text-gray-600">(máx {dist.maxPoints})</div>
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2 text-center text-sm font-semibold bg-sky-50">Total</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900">
                  {student.studentName}
                </td>
                {config.distributions.map((dist: any) => (
                  <td key={dist.id} className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="number"
                      min="0"
                      max={dist.maxPoints}
                      value={student.grades[dist.id] || ""}
                      onChange={(e) => handleGradeChange(student.studentId, dist.id, Number(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold bg-sky-50 text-sky-900">
                  {calculateTotal(student.grades).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón Guardar */}
      <button
        onClick={handleSave}
        disabled={!modified}
        className={`w-full px-6 py-3 font-semibold rounded-lg transition-all ${
          modified
            ? "bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Guardar Calificaciones
      </button>
    </div>
  )
}
