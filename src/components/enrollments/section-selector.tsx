"use client"

import { useState, useEffect } from "react"
import type { Section } from "../../types/types"

interface SectionSelectorProps {
  gradeId: string
  onSelect: (section: Section) => void
}

// Mock data - Reemplazar con Supabase (filtrado por gradeId)
const mockSections: Section[] = [
  { id: "1", name: "Sección A", grade_id: "1", capacity: 30 },
  { id: "2", name: "Sección B", grade_id: "1", capacity: 30 },
  { id: "3", name: "Sección C", grade_id: "2", capacity: 30 },
  { id: "4", name: "Sección D", grade_id: "2", capacity: 30 },
]

export default function SectionSelector({ gradeId, onSelect }: SectionSelectorProps) {
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    // Filtrar secciones por grado
    const gradeSections = mockSections.filter((section) => section.grade_id === gradeId)
    setSections(gradeSections)
  }, [gradeId])

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecciona Sección</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sections.length > 0 ? (
          sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSelect(section)}
              className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-center"
            >
              <p className="font-medium text-gray-900">{section.name}</p>
              <p className="text-xs text-gray-600">Cap: {section.capacity}</p>
            </button>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">No hay secciones disponibles</p>
        )}
      </div>
    </div>
  )
}
