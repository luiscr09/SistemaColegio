"use client"

interface LevelSelectorProps {
  levels: Array<{ id: string; name: string }>
  onSelect: (levelId: string) => void
}

export default function LevelSelector({ levels, onSelect }: LevelSelectorProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Selecciona el Nivel Educativo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onSelect(level.id)}
            className="p-6 bg-gradient-to-br from-sky-50 to-sky-100 border-2 border-sky-200 rounded-lg hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer"
          >
            <p className="font-semibold text-lg text-sky-900">{level.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
