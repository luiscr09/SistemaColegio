"use client"

import { useState, useEffect } from "react"
import type { Section } from "../../types/types"
import { supabase } from "../../lib/supabase"

interface SectionSelectorProps {
  gradeId: string
  onSelect: (section: Section) => void
}

export default function SectionSelector({ gradeId, onSelect }: SectionSelectorProps) {
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    const handleLoadSections = async () => {
      const { data, error } = await supabase.from("sections").select("*").eq("grade_id", gradeId)

      if (error) {
        console.error("Error fetching sections:", error)
        return
      }

      setSections(data)
    }

    handleLoadSections()
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
            </button>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-8">No hay secciones disponibles</p>
        )}
      </div>
    </div>
  )
}
