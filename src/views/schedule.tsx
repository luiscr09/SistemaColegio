"use client"

import { useState } from "react"
import { ScheduleTable } from "../components/schedule/schedule-table"
import { ScheduleValidation } from "../components/schedule/schedule-validation"
import type { ScheduleEntry, EducationalLevel } from "../types/schedule"

const EDUCATIONAL_LEVELS: EducationalLevel[] = [
  {
    id: "preescolar",
    name: "Preescolar",
    grades: [{ id: "pre-a", number: 0, name: "Preescolar", classrooms: ["A", "B", "C"] }],
  },
  {
    id: "primaria",
    name: "Primaria",
    grades: Array.from({ length: 6 }, (_, i) => ({
      id: `prim-${i + 1}`,
      number: i + 1,
      name: `Primer grado`,
      classrooms: i < 3 ? ["A", "B", "C", "D"] : ["A", "B", "C"],
    })),
  },
  {
    id: "secundaria",
    name: "Secundaria",
    grades: Array.from({ length: 5 }, (_, i) => ({
      id: `sec-${i + 7}`,
      number: i + 7,
      name: `Séptimo grado`,
      classrooms: ["A", "B", "C", "D"],
    })),
  },
]

const INITIAL_SCHEDULE: ScheduleEntry[] = Array.from({ length: 35 }, (_, i) => ({
  id: `${i}`,
  dayOfWeek: Math.floor(i / 7),
  blockNumber: (i % 7) + 1,
  subjectId: null,
  subjectName: null,
  teacherId: null,
  teacherName: null,
}))

export default function SchedulePage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedClassroom, setSelectedClassroom] = useState<string>("")
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(INITIAL_SCHEDULE)
  const [isSaving, setIsSaving] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  const currentLevel = EDUCATIONAL_LEVELS.find((l) => l.id === selectedLevel)
  const currentGrade = currentLevel?.grades.find((g) => g.id === selectedGrade)
  const classrooms = currentGrade?.classrooms || []

  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId)
    setSelectedGrade("")
    setSelectedClassroom("")
    setSchedule(INITIAL_SCHEDULE)
  }

  const handleGradeChange = (gradeId: string) => {
    setSelectedGrade(gradeId)
    setSelectedClassroom("")
    setSchedule(INITIAL_SCHEDULE)
  }

  const handleClassroomChange = (classroom: string) => {
    setSelectedClassroom(classroom)
    setSchedule(INITIAL_SCHEDULE)
  }

  const handleScheduleUpdate = (entryId: string, updates: Partial<ScheduleEntry>) => {
    setSchedule((prev) => prev.map((entry) => (entry.id === entryId ? { ...entry, ...updates } : entry)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert(`Horario guardado para ${currentLevel?.name} - ${currentGrade?.name} - Aula ${selectedClassroom}`)
      setShowValidation(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gestión de Horarios</h1>
          <p className="text-muted-foreground">Configura los horarios de clases por nivel, grado y aula</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nivel Educativo</label>
              <select
                value={selectedLevel}
                onChange={(e) => handleLevelChange(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
              >
                <option value="">-- Elige un nivel --</option>
                {EDUCATIONAL_LEVELS.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedLevel && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Grado</label>
                <select
                  value={selectedGrade}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
                >
                  <option value="">-- Elige un grado --</option>
                  {currentLevel?.grades.map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedGrade && (
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Aula</label>
                <select
                  value={selectedClassroom}
                  onChange={(e) => handleClassroomChange(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
                >
                  <option value="">-- Elige un aula --</option>
                  {classrooms.map((classroom) => (
                    <option key={classroom} value={classroom}>
                      Aula {classroom}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {selectedLevel && selectedGrade && selectedClassroom && (
            <>
              <div className="mb-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
                <p className="text-sm font-semibold text-foreground">
                  Horario actual: {currentLevel?.name} - {currentGrade?.name} - Aula {selectedClassroom}
                </p>
              </div>

              <ScheduleTable
                schedule={schedule}
                gradeName={currentGrade?.name || ""}
                classroom={selectedClassroom}
                onScheduleUpdate={handleScheduleUpdate}
              />

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setShowValidation(true)}
                  className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  Validar Horario
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
                >
                  {isSaving ? "Guardando..." : "Guardar Horario"}
                </button>
              </div>

              {showValidation && <ScheduleValidation schedule={schedule} onClose={() => setShowValidation(false)} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
