"use client"

import { useState } from "react"
import type { Parent } from "../../../types/student-parent"
import { Edit2, Trash2, Phone, Mail, MapPin } from "lucide-react"
import { unlinkParentFromStudent } from "../../../lib/queries"
import { EditParentModal } from "./edit-parent-modal"

interface StudentParentCardProps {
  parent: Parent
  relationshipType: string
  studentId: string
  parentId: string
  onUpdate: () => void
}

export function StudentParentCard({ parent, relationshipType, studentId, parentId, onUpdate }: StudentParentCardProps) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este tutor?")) return

    try {
      setIsDeleting(true)
      const result = await unlinkParentFromStudent(studentId, parentId)

      if (result.error) {
        setError(result.error)
        return
      }

      onUpdate()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="flex items-start justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{parent.full_name}</h3>
            <span className="rounded bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700">{relationshipType}</span>
          </div>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            {parent.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {parent.phone}
              </div>
            )}
            {parent.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {parent.email}
              </div>
            )}
            {parent.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {parent.address}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setShowEditModal(true)} className="rounded p-2 hover:bg-sky-100" title="Editar">
            <Edit2 className="h-4 w-4 text-sky-600" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded p-2 hover:bg-red-100"
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>

      {error && <div className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</div>}

      <EditParentModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        parent={parent}
        relationshipType={relationshipType}
        studentId={studentId}
        onSuccess={() => {
          setShowEditModal(false)
          onUpdate()
        }}
      />
    </>
  )
}
