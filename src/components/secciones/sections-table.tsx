import { useNavigate } from "react-router-dom"
import type { SectionViewProps } from "../../types/types"

interface SectionsTableProps {
  educationalLevels: SectionViewProps[]
}

export function SectionsTable({ educationalLevels }: SectionsTableProps) {
  const navigate = useNavigate();
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
            {educationalLevels.map((section) => (
              <tr
                key={section.section_id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{section.level}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{section.grade_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">Aula {section.section_name}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/dashboard/schedule/${section.section_id}`)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                  >
                    Ver Horario
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}
