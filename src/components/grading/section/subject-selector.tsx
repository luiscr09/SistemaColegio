"use client"

import { useState } from "react"

interface SubjectSelectorProps {
  onSelect: (subject: { id: string; name: string; code: string }) => void
  onBack: () => void
}

export default function SubjectSelector({ onSelect, onBack }: SubjectSelectorProps) {
  const [subjects, setSubjects] = useState([
    { id: "mat", name: "Matemáticas", code: "MAT" },
    { id: "esp", name: "Español", code: "ESP" },
    { id: "ing", name: "Inglés", code: "ING" },
    { id: "cie", name: "Ciencias", code: "CIE" },
    { id: "soc", name: "Estudios Sociales", code: "SOC" },
    { id: "art", name: "Artes", code: "ART" },
    { id: "edfi", name: "Educación Física", code: "EDFI" },
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Seleccionar Asignatura</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atrás
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject)}
            className="p-4 text-left border border-gray-300 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-all"
          >
            <div className="font-semibold text-gray-900">{subject.name}</div>
            <div className="text-sm text-gray-500">{subject.code}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
