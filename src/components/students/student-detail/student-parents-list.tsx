"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { StudentParentCard } from "./student-parent-card"
import { AddParentModal } from "./add-parent-modal"

interface StudentParentsListProps {
  parents: any[]
  studentId: string
}

export function StudentParentsList({ parents, studentId }: StudentParentsListProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAddSuccess = () => {
    setShowAddModal(false)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Tutores/Papás</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm text-white hover:bg-sky-700"
          >
            <Plus className="h-4 w-4" />
            Agregar Tutor
          </button>
        </div>

        <div key={refreshKey} className="space-y-4">
          {parents && parents.length > 0 ? (
            parents.map((sp) => (
              <StudentParentCard
                key={`${sp.student_id}-${sp.parent_id}`}
                parent={sp.parent}
                relationshipType={sp.relationship_type}
                studentId={studentId}
                parentId={sp.parent_id}
                onUpdate={() => setRefreshKey((prev) => prev + 1)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No hay tutores registrados</p>
          )}
        </div>
      </div>

      <AddParentModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        studentId={studentId}
        onSuccess={handleAddSuccess}
      />
    </>
  )
}
