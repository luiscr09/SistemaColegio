import type { Teacher } from "../../types/types"
import TeacherRow from "./teacher-row"

interface TeachersTableProps {
  teachers: Teacher[]
  onEdit: (teacher: Teacher) => void
  onToggleState: (teacher: Teacher) => void
}

export default function TeachersTable({ teachers, onEdit, onToggleState }: TeachersTableProps) {
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
              <th className="hidden lg:table-cell px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">
                Dirección
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <TeacherRow key={teacher.teacherId} teacher={teacher} onEdit={onEdit} onToggleState={onToggleState} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
