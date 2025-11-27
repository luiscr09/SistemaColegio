"use client"

import { useState } from "react"
import type { ScheduleEntry, Subject, Teacher } from "../../types/schedule"

const SUBJECTS: Subject[] = [
  { id: "1", name: "Matemáticas" },
  { id: "2", name: "Español" },
  { id: "3", name: "Inglés" },
  { id: "4", name: "Ciencias" },
  { id: "5", name: "Historia" },
  { id: "6", name: "Educación Física" },
  { id: "7", name: "Artes" },
]

const TEACHERS: Teacher[] = [
  { id: "1", firstName: "Juan", lastName: "García" },
  { id: "2", firstName: "María", lastName: "López" },
  { id: "3", firstName: "Carlos", lastName: "Rodríguez" },
  { id: "4", firstName: "Ana", lastName: "Martínez" },
  { id: "5", firstName: "Pedro", lastName: "Sánchez" },
]

interface SubjectAssignmentModalProps {
  entry: ScheduleEntry
  onSave: (subject: Subject, teacher: Teacher) => void
  onClose: () => void
}

export function SubjectAssignmentModal({ entry, onSave, onClose }: SubjectAssignmentModalProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>(entry.subjectId || "")
  const [selectedTeacher, setSelectedTeacher] = useState<string>(entry.teacherId || "")

  const handleSave = () => {
    if (!selectedSubject || !selectedTeacher) {
      alert("Por favor selecciona materia y profesor")
      return
    }

    const subject = SUBJECTS.find((s) => s.id === selectedSubject)!
    const teacher = TEACHERS.find((t) => t.id === selectedTeacher)!

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
            {SUBJECTS.map((subject) => (
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
            {TEACHERS.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
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
