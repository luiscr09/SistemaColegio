

import { Search, Plus } from "lucide-react"

interface TeacherFiltersProps {
  searchTerm: string
  stateFilter: "todos" | "activos" | "inactivos"
  onSearch: (search: string) => void
  onStateFilter: (state: "todos" | "activos" | "inactivos") => void
  onAddTeacher: () => void
}

export default function TeacherFilters({
  searchTerm,
  stateFilter,
  onSearch,
  onStateFilter,
  onAddTeacher,
}: TeacherFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 border border-sky-100">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        {/* Búsqueda */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">Buscar por nombre o apellido</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Ingresa nombre o apellido..."
              className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Filtro por estado */}
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
          <select
            value={stateFilter}
            onChange={(e) => onStateFilter(e.target.value as "todos" | "activos" | "inactivos")}
            className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-white"
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>
        </div>

        {/* Botón Agregar */}
        <button
          onClick={onAddTeacher}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus className="h-5 w-5" />
          Agregar Profesor
        </button>
      </div>
    </div>
  )
}
