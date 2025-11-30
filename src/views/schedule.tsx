import { useEffect, useState } from "react"
import { ScheduleTable } from "../components/schedule/schedule-table"
import { ScheduleValidation } from "../components/schedule/schedule-validation"
import type { ScheduleEntry, EducationalLevel } from "../types/schedule"
import { supabase } from "../lib/supabase"
import type { Grade, Section } from "../types/types"

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
  const LEVELS = ["Preescolar", "Primaria", "Secundaria"]
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVELS[0])
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedClassroom, setSelectedClassroom] = useState<string>("")
  const [grades, setGrades] = useState<Grade[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(INITIAL_SCHEDULE)
  const [isSaving, setIsSaving] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  useEffect(() => {
    const handleLoadCourses = async () => {
      const { data } = await supabase.from("grades").select('*')
      setGrades(data || [])
    }

    handleLoadCourses();
  }, [])

  useEffect(() => {
    const handleLoadSections = async () => {
      const { data } = await supabase.from('sections').select('*').eq('grade_id', selectedGrade)
      setSections(data || [])
    }

    handleLoadSections();
  }, [selectedGrade])

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
                value={selectedLevel || ""}
                onChange={(e) => handleLevelChange(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
              >
                <option value="">-- Elige un nivel --</option>
                {LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
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
                  {grades.filter((grade) => grade.level === selectedLevel).map((grade) => (
                    <option key={grade.id} value={grade.id}>
                      {grade.grade_name}
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
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      Aula {section.name}
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
                  {/* Horario actual: {currentLevel?.name} - {currentGrade?.name} - Aula {selectedClassroom} */}
                </p>
              </div>

              <ScheduleTable
                schedule={schedule}
                gradeName={"asd"}
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
