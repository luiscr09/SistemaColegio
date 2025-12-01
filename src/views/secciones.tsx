import { useEffect, useState } from "react"
import { SectionsTable } from "../components/secciones/sections-table"
import { ScheduleModal } from "../components/secciones/schedule-modal"
import type { ScheduleEntry } from "../types/schedule"
import type { SectionViewProps } from "../types/types"
import { supabase } from "../lib/supabase"

export default function SeccionesPage() {
  const [sections, setSections] = useState<SectionViewProps[]>([]);

  useEffect(() => {
    const handleLoadSections = async () => {
      const { data } = await supabase.from('get_sections').select('*')
      setSections(data || [])
    }

    handleLoadSections();
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Secciones</h1>
        <p className="text-gray-600 mt-2">Consulta los horarios por nivel educativo, grado y aula</p>
      </div>

      <SectionsTable educationalLevels={sections} />
    </div>
  )
}
