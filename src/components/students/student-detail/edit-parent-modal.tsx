"use client"

import type React from "react"

import { useState } from "react"
import type { Parent } from "../../../types/student-parent"
import { updateParent , updateRelationshipType } from "../../../lib/queries"
import { X, Loader2 } from "lucide-react"

interface EditParentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parent: Parent
  relationshipType: string
  studentId: string
  onSuccess: () => void
}

export function EditParentModal({
  open,
  onOpenChange,
  parent,
  relationshipType,
  studentId,
  onSuccess,
}: EditParentModalProps) {
  const [formData, setFormData] = useState(parent)
  const [newRelationshipType, setNewRelationshipType] = useState(relationshipType)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setIsLoading(true)

      // Actualizar datos del tutor
      const updateResult = await updateParent(parent.id, formData)
      if (updateResult.error) {
        setError(updateResult.error)
        return
      }

      // Actualizar tipo de relación si cambió
      if (newRelationshipType !== relationshipType) {
        const relationResult = await updateRelationshipType(studentId, parent.id, newRelationshipType)
        if (relationResult.error) {
          setError(relationResult.error)
          return
        }
      }

      onSuccess()
    } finally {
      setIsLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Editar Tutor</h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cédula</label>
            <input
              type="text"
              value={formData.cedula}
              onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ocupación</label>
            <input
              type="text"
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono de Trabajo</label>
            <input
              type="tel"
              value={formData.work_phone}
              onChange={(e) => setFormData({ ...formData, work_phone: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Relación</label>
            <select
              value={newRelationshipType}
              onChange={(e) => setNewRelationshipType(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option>Padre</option>
              <option>Madre</option>
              <option>Tutor Legal</option>
              <option>Otro</option>
            </select>
          </div>

          {error && <div className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</div>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center gap-2 rounded bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
