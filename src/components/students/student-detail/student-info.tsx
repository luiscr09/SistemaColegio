"use client"

import type { Student } from "../../../types/student-parent"
import { Calendar, Fingerprint } from "lucide-react"

interface StudentInfoProps {
  student: Student
}

export function StudentInfo({ student }: StudentInfoProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Información del Estudiante</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <Fingerprint className="h-5 w-5 text-sky-600" />
          <div>
            <p className="text-sm text-gray-500">Certificado de Nacimiento</p>
            <p className="font-medium text-gray-900">{student.birth_certificate_number || "No registrado"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-sky-600" />
          <div>
            <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
            <p className="font-medium text-gray-900">
              {student.birth_date ? new Date(student.birth_date).toLocaleDateString("es-ES") : "No registrada"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
