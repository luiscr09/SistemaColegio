import { useState, useEffect } from "react"
import TeachersTable from "../components/teachers/teachers-table"
import TeacherFilters from "../components/teachers/teacher-filters"
import TeacherModal from "../components/teachers/teacher-modal"
import type { Teacher } from "../types/types"
import { supabase } from "../lib/supabase"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState<"todos" | "activos" | "inactivos">("todos")

  useEffect(() => {
    const loadTeachers = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase.from("teacher").select("*")
        if (error) throw error

        if (data) {
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

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    setIsModalOpen(true)
  }

  const handleToggleState = async (teacher: Teacher) => {
  try {
    const newState = !teacher.state

    const {  error } = await supabase
      .from("teacher")
      .update({ state: newState })
      .eq("teacherId", teacher.teacherId)
      .select()

    if (error) {
      console.error("Error updating state:", error)
      return
    }

    const updatedTeachers = teachers.map((t) =>
      t.teacherId === teacher.teacherId
        ? { ...t, state: newState }
        : t
    )

    setTeachers(updatedTeachers)
    applyFilters(updatedTeachers, searchTerm, stateFilter)
  } catch (error) {
    console.error("Error toggling teacher state:", error)
  }
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Gestión de Profesores</h1>
          <p className="text-muted-foreground">Administra el registro de profesores del colegio</p>
        </div>

        <TeacherFilters
          searchTerm={searchTerm}
          stateFilter={stateFilter}
          onSearch={handleSearch}
          onStateFilter={handleStateFilter}
          onAddTeacher={handleAddTeacher}
        />

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

        {isModalOpen && (
          <TeacherModal
            teacher={editingTeacher}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
