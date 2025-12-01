"use client"

interface ClassroomSelectorProps {
  classrooms: string[]
  onSelect: (classroom: string) => void
  onBack: () => void
  gradeName: string
}

export default function ClassroomSelector({ classrooms, onSelect, onBack, gradeName }: ClassroomSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Selecciona el Aula - {gradeName}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atrás
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {classrooms.map((classroom) => (
          <button
            key={classroom}
            onClick={() => onSelect(classroom)}
            className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 border-2 border-sky-200 rounded-lg hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer"
          >
            <p className="font-semibold text-lg text-sky-900">Aula {classroom}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
