import { useEffect, useState } from "react"
import { ScheduleTable } from "../components/schedule/schedule-table"
import { ScheduleValidation } from "../components/schedule/schedule-validation"
import type { ScheduleEntry } from "../types/schedule"
import { supabase } from "../lib/supabase"
import type { Grade, Section } from "../types/types"
import { useParams } from "react-router-dom"

const INITIAL_SCHEDULE: ScheduleEntry[] = Array.from({ length: 35 }, (_, i) => ({
  id: `${i}`,
  dayOfWeek: Math.floor(i / 7),
  blockNumber: (i % 7) + 1,
  subjectId: null,
  subjectName: "Sin asignar",
  teacherId: null,
  teacherName: "Sin asignar",
}))

export default function SchedulePage() {
  const { section_id } = useParams()
  const LEVELS = ["Preescolar", "Primaria", "Secundaria"]

  const [selectedLevel, setSelectedLevel] = useState<string>(LEVELS[0])
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedClassroom, setSelectedClassroom] = useState<string>("")
  const [grades, setGrades] = useState<Grade[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(INITIAL_SCHEDULE)
  const [isSaving, setIsSaving] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  // Cargar todos los grados al iniciar
  useEffect(() => {
    const loadGrades = async () => {
      const { data: gradesData } = await supabase.from('grades').select('*')
      setGrades(gradesData || [])
    }
    loadGrades()
  }, [])

  // Cargar sección, nivel, grado, aula y horario si hay section_id
  useEffect(() => {
    if (!section_id) return

    const loadSectionAndSchedule = async () => {
      try {
        const { data: sectionData } = await supabase
          .from('sections')
          .select(`id, name, grade_id, grades!inner(level)`)
          .eq('id', section_id)
          .single()

        if (!sectionData) return

        const gradeId = sectionData.grade_id
        const level = sectionData.grades.level
        const classroomId = sectionData.id

        setSelectedLevel(level)
        setSelectedGrade(gradeId)
        setSelectedClassroom(classroomId)

        // Cargar todas las aulas del grado
        const { data: sectionsData } = await supabase
          .from('sections')
          .select('*')
          .eq('grade_id', gradeId)
        setSections(sectionsData || [])

        // Cargar horario de la sección
        const { data: scheduleData, error } = await supabase
          .from('get_schedule_by_sections')
          .select('*')
          .eq('section_id', classroomId)
          .single()

        if (error) {
          console.error('Error loading schedule:', error)
          setSchedule(INITIAL_SCHEDULE)
          return
        }

        // Mezclar datos de BD con el mapa completo de 35 bloques
        if (scheduleData?.section_details) {
          const mapped: ScheduleEntry[] = INITIAL_SCHEDULE.map((block) => {
            const dbEntry = scheduleData.section_details.find(
              (d: any) => d.day_of_week === block.dayOfWeek && d.block_number === block.blockNumber
            )
            return {
              ...block,
              id: dbEntry?.id?.toString() || block.id,
              subjectId: dbEntry?.subject_id ?? null,
              subjectName: dbEntry?.subject_name ?? "Sin asignar",
              teacherId: dbEntry?.teacher_id ?? null,
              teacherName: dbEntry?.teacher_fullname ?? "Sin asignar"
            }
          })
          setSchedule(mapped)
        }

      } catch (err) {
        console.error(err)
      }
    }

    loadSectionAndSchedule()
  }, [section_id])

  // Manejo de cambio de nivel
  const handleLevelChange = (levelId: string) => {
    setSelectedLevel(levelId)
    setSelectedGrade("")
    setSelectedClassroom("")
    setSchedule(INITIAL_SCHEDULE)
    setSections([])
  }

  // Manejo de cambio de grado: cargar aulas automáticamente
  const handleGradeChange = async (gradeId: string) => {
    setSelectedGrade(gradeId)
    setSelectedClassroom("")
    setSchedule(INITIAL_SCHEDULE)

    if (!gradeId) {
      setSections([])
      return
    }

    try {
      const { data: sectionsData, error } = await supabase
        .from('sections')
        .select('*')
        .eq('grade_id', gradeId)

      if (error) {
        console.error('Error loading sections:', error)
        setSections([])
        return
      }

      setSections(sectionsData || [])
    } catch (err) {
      console.error(err)
      setSections([])
    }
  }

  const handleClassroomChange = (classroomId: string) => {
    setSelectedClassroom(classroomId)
    setSchedule(INITIAL_SCHEDULE)
  }

  const handleScheduleUpdate = (entryId: string, updates: Partial<ScheduleEntry>) => {
    setSchedule(prev => prev.map(entry => entry.id === entryId ? { ...entry, ...updates } : entry))
  }

  const handleSave = async () => {
    if (!selectedClassroom) {
      alert("Debes seleccionar un aula")
      return
    }

    setIsSaving(true)
    try {
      const details = schedule.filter(entry => entry.subjectId).map(entry => ({
        subject_id: entry.subjectId,
        day_of_week: entry.dayOfWeek,
        block_number: entry.blockNumber,
        teacher_id: entry.teacherId,
      }))
      const { data, error } = await supabase.rpc("create_schedule", {
        p_section_id: selectedClassroom,
        p_state: true,
        p_details: details
      })
      if (error) {
        console.error(error)
        alert("Error al guardar el horario")
        return
      }
      alert("Horario guardado correctamente!")
      console.log("Horario guardado:", data)
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
                {LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
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
                  {grades.filter(g => g.level === selectedLevel).map(g => (
                    <option key={g.id} value={g.id}>{g.grade_name}</option>
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
                  {sections.map(s => <option key={s.id} value={s.id}>Aula {s.name}</option>)}
                </select>
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
            <p className="text-sm font-semibold text-foreground">
              {selectedLevel} - {grades.find(g => g.id === selectedGrade)?.grade_name || ''} - Aula {sections.find(s => s.id === selectedClassroom)?.name || ''}
            </p>
          </div>

          <ScheduleTable
            schedule={schedule}
            gradeName={grades.find(g => g.id === selectedGrade)?.grade_name || ''}
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
        </div>
      </div>
    </div>
  )
}
