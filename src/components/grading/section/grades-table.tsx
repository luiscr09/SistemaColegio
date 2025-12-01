import { useEffect, useState } from "react"
import type { Section, Student } from "../../../types/types"
import { supabase } from "../../../lib/supabase"

interface Distribution {
  id: string
  name: string
  maxPoints: number
}

interface StudentGrades {
  studentId: string
  grades: { distributionId: string; score: number }[]
}

interface GradesTableProps {
  distributions: Distribution[]
  maxScore: number
  levelId: string
  gradeId: string
  classroom: Section|null
  subjectId: string
  subjectName: string
  students: Student[]
  onBack: () => void
}

export default function GradesTable({
  distributions,
  maxScore,
  levelId,
  gradeId,
  classroom,
  subjectId,
  subjectName,
  students,
  onBack,
}: GradesTableProps) {
  const [grades, setGrades] = useState<StudentGrades[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    const initialGrades: StudentGrades[] = students.map(s => ({
      studentId: s.id,
      grades: distributions.map(d => ({ distributionId: d.id, score: 0 })),
    }))
    setGrades(initialGrades)
  }, [students, distributions])

  const handleGradeChange = (studentId: string, distributionId: string, value: string) => {
    const numValue = parseFloat(value) || 0
    const maxPoints = distributions.find(d => d.id === distributionId)?.maxPoints || 0
    if (numValue > maxPoints) return

    setGrades(prev =>
      prev.map(sg =>
        sg.studentId === studentId
          ? {
            studentId: sg.studentId,
            grades: sg.grades.map(g =>
              g.distributionId === distributionId ? { distributionId: g.distributionId, score: numValue } : g
            ),
          }
          : sg
      )
    )
  }

  const getStudentTotal = (studentId: string) => {
    const studentGrades = grades.find(g => g.studentId === studentId)?.grades || []
    return studentGrades.reduce((sum, g) => sum + g.score, 0)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const payload = grades.map(sg => ({
        student_id: sg.studentId,
        section_id: classroom?.id,
        subject_id: subjectId,
        evaluations: sg.grades.map(g => ({
          distributionId: g.distributionId,
          score: g.score,
          name: distributions.find(d => d.id === g.distributionId)?.name || "",
          maxPoints: distributions.find(d => d.id === g.distributionId)?.maxPoints || 0,
        })),
        total: sg.grades.reduce((sum, g) => sum + g.score, 0),
      }))

      const { data, error } = await supabase
        .from("grading")
       .upsert(payload, { onConflict: "student_id,section_id,subject_id" })

 


      if (error) throw error
      setSavedMessage("Calificaciones guardadas exitosamente")
    } catch (err) {
      console.error(err)
      setSavedMessage("Error al guardar calificaciones")
    } finally {
      setIsSaving(false)
      setTimeout(() => setSavedMessage(""), 3000)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Registro de Calificaciones - Aula {classroom?.name} ({subjectName})
        </h2>
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
              {distributions.map(d => (
                <th key={d.id} className="px-4 py-3 text-center">
                  <div>{d.name}</div>
                  <div className="text-xs font-normal">({d.maxPoints})</div>
                </th>
              ))}
              <th className="px-4 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {student.first_name} {student.last_name}
                </td>
                {distributions.map(dist => {
                  const studentGrade = grades.find(g => g.studentId === student.id)
                  const value = studentGrade?.grades.find(g => g.distributionId === dist.id)?.score ?? 0
                  return (
                    <td key={dist.id} className="px-4 py-3 text-center">
                      <input
                        type="number"
                        value={value}
                        min={0}
                        max={dist.maxPoints}
                        placeholder="0"
                        onChange={e => handleGradeChange(student.id, dist.id, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </td>
                  )
                })}
                <td className="px-4 py-3 text-center font-semibold bg-sky-50">
                  {getStudentTotal(student.id).toFixed(2)} / {maxScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {savedMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300">
          ✓ {savedMessage}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`w-full px-6 py-3 font-semibold rounded-lg transition-all ${isSaving
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
          }`}
      >
        {isSaving ? "Guardando..." : "Guardar Calificaciones"}
      </button>
    </div>
  )
}
