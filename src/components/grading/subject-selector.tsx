"use client"

import { useState } from "react"
import type { Subject } from "../../types/grading"
import { BookOpen } from "lucide-react"

// Mock data - Reemplazar con Supabase
const mockSubjects: Subject[] = [
  { id: "1", name: "Matemáticas", code: "MAT-01" },
  { id: "2", name: "Español", code: "ESP-01" },
  { id: "3", name: "Inglés", code: "ENG-01" },
  { id: "4", name: "Ciencias Naturales", code: "CN-01" },
  { id: "5", name: "Estudios Sociales", code: "SS-01" },
]

interface SubjectSelectorProps {
  value: Subject | null
  onChange: (subject: Subject | null) => void
}

export function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground mb-2">Materia</label>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-600" />
            {value ? value.name : "Selecciona una materia"}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50">
            <ul>
              {mockSubjects.map((subject) => (
                <li key={subject.id}>
                  <button
                    onClick={() => {
                      onChange(subject)
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-sky-50 transition-colors"
                  >
                    <div className="font-medium text-foreground">{subject.name}</div>
                    <div className="text-xs text-muted-foreground">{subject.code}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
