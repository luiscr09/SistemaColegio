"use client"

import { ScheduleCell } from "./schedule-cell"
import type { ScheduleEntry } from "../../types/schedule"

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
const TIME_BLOCKS = [
  { number: 1, time: "7:00 - 7:45" },
  { number: 2, time: "7:45 - 8:30" },
  { number: 3, time: "8:30 - 9:15" },
  { number: 4, time: "9:15 - 10:00" },
  { number: 5, time: "10:00 - 10:45" },
  { number: 6, time: "10:45 - 11:30" },
  { number: 7, time: "11:30 - 12:15" },
]

interface ScheduleTableProps {
  schedule: ScheduleEntry[]
  gradeName: string
  classroom: string
  onScheduleUpdate: (entryId: string, updates: Partial<ScheduleEntry>) => void
}

export function ScheduleTable({ schedule, gradeName, classroom, onScheduleUpdate }: ScheduleTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-sky-600 text-white">
            <th className="border border-gray-300 p-3 text-left font-semibold">Hora</th>
            {DAYS.map((day) => (
              <th key={day} className="border border-gray-300 p-3 text-center font-semibold">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_BLOCKS.map((block) => (
            <tr key={block.number} className="hover:bg-sky-50">
              <td className="border border-gray-300 p-3 bg-sky-100 font-semibold text-foreground">{block.time}</td>
              {DAYS.map((_, dayIndex) => {
                const entry = schedule.find((e) => e.dayOfWeek === dayIndex && e.blockNumber === block.number)
                return (
                  <td key={`${dayIndex}-${block.number}`} className="border border-gray-300 p-2">
                    {entry && (
                      <ScheduleCell entry={entry} onUpdate={(updates) => onScheduleUpdate(entry.id, updates)} />
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
