import { useState } from "react"
import type { Teacher } from "../../types/types"
import TeacherRow from "./teacher-row"

interface TeachersTableProps {
  teachers: Teacher[]
  onEdit: (teacher: Teacher) => void
  onToggleState: (teacher: Teacher) => void
}

export default function TeachersTable({ teachers, onEdit, onToggleState }: TeachersTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  const handleOpenModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsModalOpen(true)
  }

  const handleAccept = () => {
    if (selectedTeacher) {
      onToggleState(selectedTeacher)
    }
    setIsModalOpen(false)
    setSelectedTeacher(null)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedTeacher(null)
  }

  if (teachers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 border border-sky-100 text-center">
        <p className="text-muted-foreground">No hay profesores para mostrar</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-sky-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-sky-50 border-b border-sky-100">
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Nombre</th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Cumpleaños</th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Género</th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Teléfono</th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="hidden lg:table-cell px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Dirección</th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <TeacherRow
                key={teacher.teacherId}
                teacher={teacher}
                onEdit={onEdit}
                setIsOpenModal={() => handleOpenModal(teacher)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedTeacher && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] p-4">
            <div className="relative bg-neutral-50 border border-default rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">
                  ¿Estás seguro que quieres {selectedTeacher.state ? "desactivar" : "activar"} a {selectedTeacher.name}?
                </h3>
                <button
                  onClick={handleClose}
                  className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                <p className="leading-relaxed text-body">
                  Una vez {selectedTeacher.state ? "desactivado" : "activado"}, no aparecerá en otros procesos del sistema como matrícula, asignación de clases o estudiantes.
                </p>
              </div>
              <div className="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                <button
                  onClick={handleAccept}
                  type="button"
                  className="text-white bg-[#0284C7] box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                >
                  Aceptar
                </button>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
