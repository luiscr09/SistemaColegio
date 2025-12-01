import { useEffect, useState } from "react"
import type { ScheduleEntry, Subject } from "../../types/schedule"
import { supabase } from "../../lib/supabase"
import type { Teacher } from "../../types/types"

interface SubjectAssignmentModalProps {
  entry: ScheduleEntry
  onSave: (subject: Subject, teacher: Teacher) => void
  onClose: () => void
}

export function SubjectAssignmentModal({ entry, onSave, onClose }: SubjectAssignmentModalProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(entry.subjectId || "")
  const [selectedTeacher, setSelectedTeacher] = useState<string>(entry.teacherId || "")
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    const handleLoadSubjects = async () => {
      const { data } = await supabase.from("subjects").select("*")
      setSubjects(data || [])
    }

    const handleLoadTeachers = async () => {
      const { data } = await supabase.from("teacher").select("*")
      setTeachers(data || [])
    }

    handleLoadSubjects()
    handleLoadTeachers()
  }, [])

  const handleSave = () => {
    if (!selectedSubject || !selectedTeacher) {
      alert("Por favor selecciona materia y profesor")
      return
    }

    const subject = subjects.find((s) => s.id === selectedSubject)
    const teacher = teachers.find((t) => t.teacherId === selectedTeacher)

    if (!subject || !teacher) {
      alert("Error: materia o profesor no encontrado")
      return
    }

    onSave(subject, teacher)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-4">Asignar Materia y Profesor</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground mb-2">Materia</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
          >
            <option value="">-- Selecciona una materia --</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2">Profesor</label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
          >
            <option value="">-- Selecciona un profesor --</option>
            {teachers.map((teacher) => (
              <option key={teacher.teacherId} value={teacher.teacherId}>
                {teacher.name} {teacher.lastname}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
