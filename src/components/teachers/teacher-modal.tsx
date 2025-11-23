
import type React from "react"
import { X } from "lucide-react"
import type { Teacher } from "../../types/types"
import TeacherForm from "./teacher-form"

interface TeacherModalProps {
  teacher: Teacher | null
  onClose: () => void
  onSave: (teacher: Partial<Teacher>) => void
}

export default function TeacherModal({ teacher, onClose, onSave }: TeacherModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-sky-100">
          <h2 className="text-2xl font-bold text-foreground">
            {teacher ? "Editar Profesor" : "Agregar Nuevo Profesor"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-sky-100 rounded-lg transition text-muted-foreground">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <TeacherForm teacher={teacher} onSubmit={onSave} onCancel={onClose} />
        </div>
      </div>
    </div>
  )
}
