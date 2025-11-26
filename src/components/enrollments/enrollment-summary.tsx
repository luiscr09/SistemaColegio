"use client"

import type { Student, SchoolYear, Section, EnrollmentFormData } from "../../types/types"

interface EnrollmentSummaryProps {
  student: Student
  section: Section
  formData: Partial<EnrollmentFormData>
  loading: boolean
  onSave: () => void
}

export default function EnrollmentSummary({
  student,
  section,
  formData,
  loading,
  onSave,
}: EnrollmentSummaryProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Resumen de Matrícula</h3>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Datos del Estudiante</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-600">Nombre:</span>{" "}
              <strong>
                {student.first_name} {student.last_name}
              </strong>
            </p>
            <p>
              <span className="text-gray-600">CUI:</span> <strong>{student.cue_mined}</strong>
            </p>
            <p>
              <span className="text-gray-600">Certificado:</span> <strong>{student.birth_certificate_number}</strong>
            </p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Asignación Académica</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-600">Sección:</span> <strong>{section.name}</strong>
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Información de Matrícula</h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-600">Fecha:</span>{" "}
              <strong>{new Date(formData.enrollment_date || "").toLocaleDateString()}</strong>
            </p>
            {formData.comments && (
              <p>
                <span className="text-gray-600">Comentarios:</span> <strong>{formData.comments}</strong>
              </p>
            )}
            {(formData.custom_enrollment_fee || formData.custom_monthly_fee) && (
              <div className="mt-3 pt-3 border-t border-purple-200">
                {formData.custom_enrollment_fee && (
                  <p>
                    <span className="text-gray-600">Arancel:</span>{" "}
                    <strong>${formData.custom_enrollment_fee.toFixed(2)}</strong>
                  </p>
                )}
                {formData.custom_monthly_fee && (
                  <p>
                    <span className="text-gray-600">Cuota Mensual:</span>{" "}
                    <strong>${formData.custom_monthly_fee.toFixed(2)}</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onSave}
        disabled={loading}
        className={`mt-6 w-full px-6 py-3 rounded-lg font-medium transition-colors ${loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        {loading ? "Guardando Matrícula..." : "Confirmar y Guardar"}
      </button>
    </div>
  )
}
