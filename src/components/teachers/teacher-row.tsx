
import type { Dispatch, SetStateAction } from "react"
import type { Teacher } from "../../types/types"
import { Edit2, CheckCircle, XCircle } from "lucide-react"

interface TeacherRowProps {
  teacher: Teacher
  onEdit: (teacher: Teacher) => void
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function TeacherRow({ teacher, onEdit, setIsOpenModal }: TeacherRowProps) {
  const isActive = teacher.state === true

  return (
    <tr className="border-b border-sky-100 hover:bg-sky-50 transition">
      <td className="px-4 md:px-6 py-4 text-sm text-foreground font-medium">
        {teacher.name} {teacher.lastname}
      </td>
      <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">
        {new Date(teacher.birthday).toLocaleDateString("es-ES")}
      </td>
      <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">{teacher.gender}</td>
      <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">{teacher.phone}</td>
      <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">{teacher.email}</td>
      <td className="hidden lg:table-cell px-4 md:px-6 py-4 text-sm text-muted-foreground">{teacher.address}</td>
      <td className="px-4 md:px-6 py-4 text-sm">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          {isActive ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Activo
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              Inactivo
            </>
          )}
        </span>
      </td>
      <td className="px-4 md:px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(teacher)}
            className="p-2 hover:bg-sky-100 rounded-lg transition text-sky-600"
            title="Editar"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpenModal(true)}
            className={`p-2 rounded-lg transition ${isActive ? "hover:bg-red-100 text-red-600" : "hover:bg-green-100 text-green-600"
              }`}
            title={isActive ? "Inactivar" : "Activar"}
          >
            {isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          </button>
        </div>
      </td>
    </tr>
  )
}
