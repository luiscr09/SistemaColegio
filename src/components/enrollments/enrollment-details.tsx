"use client"

import type React from "react"

import { useState } from "react"
import type { EnrollmentFormData } from "../../types/types"

interface EnrollmentDetailsProps {
  formData: Partial<EnrollmentFormData>
  onSubmit: (data: Partial<EnrollmentFormData>) => void
}

export default function EnrollmentDetails({ formData, onSubmit }: EnrollmentDetailsProps) {
  const [data, setData] = useState<Partial<EnrollmentFormData>>(formData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? Number.parseFloat(value) : undefined) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de Matrícula</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Matrícula *</label>
          <input
            type="date"
            name="enrollment_date"
            value={data.enrollment_date || ""}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comentarios (Opcional)</label>
          <textarea
            name="comments"
            value={data.comments || ""}
            onChange={handleChange}
            placeholder="Agrega comentarios o notas sobre la matrícula..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-4">Montos Personalizados (Opcional)</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arancel de Matrícula</label>
              <input
                type="number"
                name="custom_enrollment_fee"
                value={data.custom_enrollment_fee || ""}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuota Mensual</label>
              <input
                type="number"
                name="custom_monthly_fee"
                value={data.custom_monthly_fee || ""}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Continuar a Resumen
      </button>
    </form>
  )
}
