import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { supabase } from "../../lib/supabase"
import type { Student } from "../../types/types"

interface StudentSearchProps {
  onSelectStudent: (student: Student | null) => void
  selectedStudent: Student | null
}

export function StudentSearch({ onSelectStudent, selectedStudent }: StudentSearchProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])

  useEffect(() => {
    const handleLoadStudents = async () => {
      const { data, error } = await supabase.from('students').select('*')

      if (error) {
        console.error(error)
        return
      }

      setStudents(data as Student[])
    }

    handleLoadStudents()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStudents([])
      setIsOpen(false)
      return
    }

    // Divide lo que el usuario escribe en palabras
    const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean)

    const filtered = students.filter((student) => {
      // Campos donde buscar, protegidos contra null
      const studentValues = [
        student.first_name ?? "",
        student.last_name ?? "",
        student.cue_mined ?? "",
      ].map(v => v.toLowerCase())

      // Cada palabra debe aparecer en algún campo
      return searchWords.every((word) =>
        studentValues.some((value) => value.includes(word))
      )
    })

    setFilteredStudents(filtered)
    setIsOpen(filtered.length > 0)
  }, [searchTerm, students])


  const handleSelectStudent = (student: Student) => {
    onSelectStudent(student)
    setSearchTerm("")
    setIsOpen(false)
  }

  const handleClearSelection = () => {
    onSelectStudent(null)
    setSearchTerm("")
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Buscar Estudiante</label>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Busca por nombre, apellido o CUI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm && setIsOpen(true)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedStudent && (
            <button onClick={handleClearSelection} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown de resultados */}
      {isOpen && filteredStudents.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
          {filteredStudents.map((student) => (
            <button
              key={student.id}
              onClick={() => handleSelectStudent(student)}
              className="w-full px-4 py-2 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-gray-900">
                {student.first_name} {student.last_name}
              </div>
              <div className="text-sm text-gray-500">CUI: {student.cue_mined ?? 'N/A'}</div>
            </button>
          ))}
        </div>
      )}

      {selectedStudent && !searchTerm && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600">Estudiante seleccionado:</p>
          <p className="font-medium text-gray-900">
            {selectedStudent.first_name} {selectedStudent.last_name}
          </p>
          <p className="text-sm text-gray-500">CUI: {selectedStudent.cue_mined ?? 'N/A'}</p>
        </div>
      )}
    </div>
  )
}
