"use client"

import type { ScheduleEntry } from "../../types/schedule"

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

interface ScheduleValidationProps {
  schedule: ScheduleEntry[]
  onClose: () => void
}

export function ScheduleValidation({ schedule, onClose }: ScheduleValidationProps) {
  const emptySlots: Array<{ day: string; block: number }> = []
  const errors: string[] = []

  schedule.forEach((entry) => {
    if (!entry.subjectName) {
      emptySlots.push({
        day: DAYS[entry.dayOfWeek],
        block: entry.blockNumber,
      })
    }
  })

  if (emptySlots.length > 0) {
    errors.push(`Hay ${emptySlots.length} espacios sin asignar`)
  }

  const hasOverlaps =
    new Set(
      schedule.filter((e) => e.subjectName && e.teacherId).map((e) => `${e.teacherId}-${e.dayOfWeek}-${e.blockNumber}`),
    ).size !== schedule.filter((e) => e.subjectName && e.teacherId).length

  if (hasOverlaps) {
    errors.push("Hay solapamientos de profesores detectados")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-96 overflow-y-auto">
        <h2 className="text-2xl font-bold text-foreground mb-4">Validación del Horario</h2>

        {errors.length === 0 ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            ✓ Horario válido - No hay errores detectados
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {errors.map((error, i) => (
              <div key={i} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                ✗ {error}
              </div>
            ))}
          </div>
        )}

        {emptySlots.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-foreground mb-2">Espacios sin asignar:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 max-h-32 overflow-y-auto">
              {emptySlots.map((slot, i) => (
                <li key={i}>
                  • {slot.day} - Bloque {slot.block}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-medium transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
