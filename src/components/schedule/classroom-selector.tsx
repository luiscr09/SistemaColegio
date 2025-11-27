"use client"

interface ClassroomSelectorProps {
  classrooms: string[]
  selectedClassroom: string
  onClassroomChange: (classroom: string) => void
}

export function ClassroomSelector({ classrooms, selectedClassroom, onClassroomChange }: ClassroomSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">Seleccionar Aula</label>
      <select
        value={selectedClassroom}
        onChange={(e) => onClassroomChange(e.target.value)}
        className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-background text-foreground"
      >
        <option value="">-- Elige un aula --</option>
        {classrooms.map((classroom) => (
          <option key={classroom} value={classroom}>
            Aula {classroom}
          </option>
        ))}
      </select>
    </div>
  )
}
