import { useEffect, useState } from "react"
import type { Grade } from "../../types/types"
import { supabase } from "../../lib/supabase"

interface GradeSelectorProps {
  onSelect: (grade: Grade) => void
}

export default function GradeSelector({ onSelect }: GradeSelectorProps) {
  const [grades, setGrades] = useState<Grade[]>([])

  useEffect(() => {
    const handleLoadGrades = async () => {
      const { data, error } = await supabase.from("grades").select("*")

      if (error) {
        console.error("Error fetching grades:", error)
        return
      }

      setGrades(data)
    }

    handleLoadGrades()
  }, [])

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecciona Grado</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {grades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => onSelect(grade)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-center"
          >
            <p className="font-medium text-gray-900">{grade.grade_name}</p>
            <p className="text-xs text-gray-600">Nivel {grade.level}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
