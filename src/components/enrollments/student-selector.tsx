"use client"

import { useState, useEffect } from "react"
import type { Student } from "../../types/types"
import { supabase } from "../../lib/supabase"

interface StudentSelectorProps {
  onSelect: (student: Student) => void
}

export default function StudentSelector({ onSelect }: StudentSelectorProps) {
  const [search, setSearch] = useState("")
  const [students, setStudents] = useState<Student[]>([])
  const [filtered, setFiltered] = useState<Student[]>([])

  useEffect(() => {
    const handleLoadStudents = async () => {
      const { data, error } = await supabase.from("students").select("*")

      if (error) {
        console.log(error);
        return;
      }
      setStudents(data || [])
      setFiltered(data || [])
    }

    handleLoadStudents();
  }, [])

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered(students)
      return
    }

    const searchWords = search.toLowerCase().split(" ").filter(Boolean)

    const results = students.filter((student) => {
      const studentValues = [
        student.first_name ?? "",
        student.last_name ?? "",
        student.cue_mined ?? "",
        student.birth_certificate_number ?? ""
      ].map((v) => v.toLowerCase())

      return searchWords.every((word) =>
        studentValues.some((value) => value.includes(word))
      )
    })

    setFiltered(results)
  }, [search, students])

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecciona un Estudiante</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por nombre, CUI o certificado</label>
        <input
          type="text"
          placeholder="Ingresa nombre, apellido, CUI o número de certificado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelect(student)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <p className="font-medium text-gray-900">
                {student.first_name} {student.last_name}
              </p>
              <p className="text-sm text-gray-600">
                CUI: {student.cue_mined ?? 'N/A'} | Cert: {student.birth_certificate_number ?? 'N/A'}
              </p>
            </button>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No se encontraron estudiantes</p>
        )}
      </div>
    </div>
  )
}
