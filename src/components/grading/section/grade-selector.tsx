import type { Grade } from "../../../types/types"

interface GradeSelectorProps {
  grades: Grade[]
  onSelect: (gradeId: string) => void
  onBack: () => void
  levelName: string
}

export default function GradeSelector({ grades, onSelect, onBack, levelName }: GradeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Selecciona el Grado - {levelName}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atrás
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {grades.filter(g => g.level.toString().toLocaleLowerCase() === levelName.toString().toLocaleLowerCase()).map((grade) => (
          <button
            key={grade.id}
            onClick={() => onSelect(grade.id)}
            className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 border-2 border-sky-200 rounded-lg hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer"
          >
            <p className="font-semibold text-lg text-sky-900">{grade.grade_name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
