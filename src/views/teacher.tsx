import { useState, useEffect } from "react"
import TeachersTable from "../components/teachers/teachers-table"
import TeacherFilters from "../components/teachers/teacher-filters"
import TeacherModal from "../components/teachers/teacher-modal"
import type { Teacher } from "../types/types"
import { supabase } from "../lib/supabase"



// Helper para convertir string yyyy-mm-dd a Date
const inputValueToDate = (value: string) => {
  return value ? new Date(value) : new Date()
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState<"todos" | "activos" | "inactivos">("todos")

  // Carga inicial
  useEffect(() => {
    const loadTeachers = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase.from("teacher").select("*")
        if (error) throw error
        if (data) {
          // Convertimos fechas y booleanos de los datos recibidos
          const parsedTeachers: Teacher[] = data.map((t) => ({
            ...t,
            birthday: new Date(t.birthday),
            createdAt: new Date(t.createdAt),
            gender: Boolean(t.gender),
            state: Boolean(t.state),
          }))
          setTeachers(parsedTeachers)
          setFilteredTeachers(parsedTeachers)
        }
      } catch (error) {
        console.error("Error loading teachers:", error)
      } finally {
        setIsLoading(false)
      }

      
    }

    loadTeachers()
  }, [])

  // Aplica filtros de búsqueda y estado
  const applyFilters = (data: Teacher[], search: string, state: string) => {
    let filtered = data

    if (search) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(search.toLowerCase()) ||
          teacher.lastname.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (state !== "todos") {
      const stateBool = state === "activos"
      filtered = filtered.filter((teacher) => teacher.state === stateBool)
    }

    setFilteredTeachers(filtered)
  }

  const handleSearch = (search: string) => {
    setSearchTerm(search)
    applyFilters(teachers, search, stateFilter)
  }

  const handleStateFilter = (state: "todos" | "activos" | "inactivos") => {
    setStateFilter(state)
    applyFilters(teachers, searchTerm, state)
  }

  const handleAddTeacher = () => {
    setEditingTeacher(null)
    setIsModalOpen(true)
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Datos del formulario:", formData)

      
      const teacherData = {
        name: formData.nombreCompleto,
        lastname: formData.apellidos,
        birthday: formData.fechaNacimiento,
        gender: formData.genero === "masculino", 
        email: formData.correoElectronico,
        phone: formData.telefonoPersonal,
        address: formData.direccionCompleta,
        state: true,
      }

      
      const { data, error } = await supabase.from("teacher").insert([teacherData])

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setIsModalOpen(true)
  }

  const handleSaveTeacher = async (teacherData: Partial<Teacher>) => {
    try {
      if (editingTeacher) {
        // Actualización
        const updated: Teacher = {
          ...editingTeacher,
          ...teacherData,
          // Aseguramos tipos correctos para state y gender
          state: typeof teacherData.state === "boolean" ? teacherData.state : editingTeacher.state,
          gender: typeof teacherData.gender === "boolean" ? teacherData.gender : editingTeacher.gender,
          birthday:
            teacherData.birthday instanceof Date
              ? teacherData.birthday
              : editingTeacher.birthday,
          createdAt: editingTeacher.createdAt,
        }
        const updatedTeachers = teachers.map((t) =>
          t.teacherId === updated.teacherId ? updated : t,
        )
        setTeachers(updatedTeachers)
        applyFilters(updatedTeachers, searchTerm, stateFilter)
      } else {
        // Nuevo profesor
        const newTeacher: Teacher = {
          teacherId: crypto.randomUUID(), // Usa UUID real
          name: teacherData.name || "",
          lastname: teacherData.lastname || "",
          birthday:
            teacherData.birthday instanceof Date
              ? teacherData.birthday
              : inputValueToDate(
                  typeof teacherData.birthday === "string" ? teacherData.birthday : "",
                ),
          gender:
            typeof teacherData.gender === "boolean"
              ? teacherData.gender
              : true, // default masculino = true
          phone: teacherData.phone || null,
          email: teacherData.email || null,
          address: teacherData.address || null,
          state: typeof teacherData.state === "boolean" ? teacherData.state : true,
          createdAt: new Date(),
        }
        const newTeachers = [...teachers, newTeacher]
        setTeachers(newTeachers)
        applyFilters(newTeachers, searchTerm, stateFilter)
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error saving teacher:", error)
    }
  }

  const handleToggleState = async (teacher: Teacher) => {
    try {
      const newState = !teacher.state
      const updated: Teacher = { ...teacher, state: newState }
      const updatedTeachers = teachers.map((t) =>
        t.teacherId === teacher.teacherId ? updated : t,
      )
      setTeachers(updatedTeachers)
      applyFilters(updatedTeachers, searchTerm, stateFilter)
    } catch (error) {
      console.error("Error toggling teacher state:", error)
      console.log("✅ Profesor guardado:", data)
      setIsSubmitted(true)

      
      setFormData({
        nombreCompleto: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "",
        identificacion: "",
        correoElectronico: "",
        telefonoPersonal: "",
        direccionCompleta: "",
      })

      setTimeout(() => setIsSubmitted(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Gestión de Profesores</h1>
          <p className="text-muted-foreground">Administra el registro de profesores del colegio</p>
        </div>

        {/* Filtros */}
        <TeacherFilters
          searchTerm={searchTerm}
          stateFilter={stateFilter}
          onSearch={handleSearch}
          onStateFilter={handleStateFilter}
          onAddTeacher={handleAddTeacher}
        />

        {/* Tabla */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mb-4"></div>
              <p className="text-muted-foreground">Cargando profesores...</p>
            </div>
          </div>
        ) : (
          <TeachersTable
            teachers={filteredTeachers}
            onEdit={handleEditTeacher}
            onToggleState={handleToggleState}
          />
        )}

        {/* Modal */}
        {isModalOpen && (
          <TeacherModal
            teacher={editingTeacher}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTeacher}
          />
        )}
      </div>
    </div>
  )
}
