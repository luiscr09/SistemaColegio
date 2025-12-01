"use client"

import type { Student } from "../../../types/student-parent"
import { Edit2 } from "lucide-react"
import { useState } from "react"
import { StudentEditModal } from "./student-edit-modal"

interface StudentHeaderProps {
  student: Student
}

export function StudentHeader({ student }: StudentHeaderProps) {
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-sky-50 to-sky-100 p-6">
        <div>
          <h1 className="text-3xl font-bold text-sky-900">
            {student.first_name} {student.last_name}
          </h1>
          <p className="mt-1 text-sky-700">CUE: {student.cue_mined || "No asignado"}</p>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
        >
          <Edit2 className="h-4 w-4" />
          Editar
        </button>
      </div>

      <StudentEditModal student={student} open={showEditModal} onOpenChange={setShowEditModal} />
    </>
  )
}
