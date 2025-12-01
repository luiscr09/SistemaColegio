import type { Student } from "../../../types/types"

interface StudentsListProps {
  onContinue: () => void
  onBack: () => void
  levelId: string
  gradeId: string
  students: Student[]
  classroom: string
}

export default function StudentsList({ onContinue, onBack, classroom, students }: StudentsListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Estudiantes del Aula {classroom}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atrás
        </button>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-sky-600 text-white">
              <th className="px-4 py-3 text-left">No.</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Apellido</th>
              <th className="px-4 py-3 text-left">CUI</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{idx + 1}</td>
                <td className="px-4 py-3 text-gray-900">{student.first_name}</td>
                <td className="px-4 py-3 text-gray-900">{student.last_name}</td>
                <td className="px-4 py-3 text-gray-600">{student.cue_mined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onContinue}
          className="flex-1 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
