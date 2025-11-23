"use client"

import { useState } from "react"
import EnrollmentForm from "../components/enrollments/enrollment-form"

export default function EnrollmentsPage() {
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false)

  const handleEnrollmentSuccess = () => {
    setEnrollmentSuccess(true)
    setTimeout(() => setEnrollmentSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Matrículas</h1>
        <p className="text-gray-600 mt-2">Registra nuevas matrículas de estudiantes para el año escolar</p>
      </div>

      {enrollmentSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <p className="font-medium">✓ Matrícula registrada exitosamente</p>
        </div>
      )}

      <EnrollmentForm onSuccess={handleEnrollmentSuccess} />
    </div>
  )
}
