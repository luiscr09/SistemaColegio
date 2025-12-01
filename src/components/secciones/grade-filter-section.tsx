"use client"

import type { EducationalLevel } from "../../types/schedule"

interface GradeFilterSectionProps {
  educationalLevels: EducationalLevel[]
  selectedLevel: string
  selectedGrade: string
  selectedClassroom: string
  onLevelChange: (levelId: string) => void
  onGradeChange: (gradeId: string) => void
  onClassroomChange: (classroom: string) => void
  onViewSchedule: () => void
}

export function GradeFilterSection({
  educationalLevels,
  selectedLevel,
  selectedGrade,
  selectedClassroom,
  onLevelChange,
  onGradeChange,
  onClassroomChange,
  onViewSchedule,
}: GradeFilterSectionProps) {
  const currentLevel = educationalLevels.find((l) => l.id === selectedLevel)
  const currentGrade = currentLevel?.grades.find((g) => g.id === selectedGrade)
  const classrooms = currentGrade?.classrooms || []
  const isFormComplete = selectedLevel && selectedGrade && selectedClassroom

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold">Filtrar por Grado</h2>
        <p className="text-blue-100 text-sm mt-1">Selecciona nivel, grado y aula para ver el horario</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Nivel Educativo */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Nivel Educativo</label>
            <select
              value={selectedLevel}
              onChange={(e) => {
                onLevelChange(e.target.value)
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium"
            >
              <option value="">-- Selecciona un nivel --</option>
              {educationalLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grado */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Grado</label>
            <select
              value={selectedGrade}
              onChange={(e) => {
                onGradeChange(e.target.value)
              }}
              disabled={!selectedLevel}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">-- Selecciona un grado --</option>
              {currentLevel?.grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
          </div>

          {/* Aula */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Aula</label>
            <select
              value={selectedClassroom}
              onChange={(e) => {
                onClassroomChange(e.target.value)
              }}
              disabled={!selectedGrade}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">-- Selecciona un aula --</option>
              {classrooms.map((classroom) => (
                <option key={classroom} value={classroom}>
                  Aula {classroom}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Información seleccionada */}
        {isFormComplete && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900">
              {currentLevel?.name} • {currentGrade?.name} • Aula {selectedClassroom}
            </p>
          </div>
        )}

        {/* Botón Ver Horario */}
        <div className="flex justify-end">
          <button
            onClick={onViewSchedule}
            disabled={!isFormComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Ver Horario
          </button>
        </div>
      </div>
    </div>
  )
}
