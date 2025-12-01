"use client"

import type { EducationalLevel } from "@/types/schedule"

interface SectionsTableProps {
  educationalLevels: EducationalLevel[]
  onViewSchedule: (levelName: string, gradeName: string, classroom: string) => void
}

export function SectionsTable({ educationalLevels, onViewSchedule }: SectionsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Nivel Educativo</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Grado</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Aula</th>
              <th className="px-6 py-3 text-center text-sm font-bold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {educationalLevels.map((level) =>
              level.grades.map((grade) =>
                grade.classrooms.map((classroom) => (
                  <tr
                    key={`${level.id}-${grade.id}-${classroom}`}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{level.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{grade.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Aula {classroom}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => onViewSchedule(level.name, grade.name, classroom)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                      >
                        Ver Horario
                      </button>
                    </td>
                  </tr>
                )),
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
