"use client"

import { useState } from "react"
import { SectionsTable } from "../components/secciones/sections-table"
import { ScheduleModal } from "../components/secciones/schedule-modal"
import type { EducationalLevel, ScheduleEntry } from "../types/schedule"

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
      name: `${i + 1}° grado`,
      classrooms: i < 3 ? ["A", "B", "C", "D"] : ["A", "B", "C"],
    })),
  },
  {
    id: "secundaria",
    name: "Secundaria",
    grades: Array.from({ length: 5 }, (_, i) => ({
      id: `sec-${i + 7}`,
      number: i + 7,
      name: `${i + 7}° grado`,
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

export default function SeccionesPage() {
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedData, setSelectedData] = useState<{ level: string; grade: string; classroom: string } | null>(null)
  const [schedule] = useState<ScheduleEntry[]>(INITIAL_SCHEDULE)

  const handleViewSchedule = (levelName: string, gradeName: string, classroom: string) => {
    setSelectedData({ level: levelName, grade: gradeName, classroom })
    setShowScheduleModal(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Secciones</h1>
        <p className="text-gray-600 mt-2">Consulta los horarios por nivel educativo, grado y aula</p>
      </div>

      <SectionsTable educationalLevels={EDUCATIONAL_LEVELS} onViewSchedule={handleViewSchedule} />

      {/* Modal para ver horario */}
      {showScheduleModal && selectedData && (
        <ScheduleModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          schedule={schedule}
          gradeName={selectedData.grade}
          classroom={selectedData.classroom}
        />
      )}
    </div>
  )
}
