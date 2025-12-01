"use client"

import { ScheduleTable } from "../../components/schedule/schedule-table"
import type { ScheduleEntry } from "../../types/schedule"

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  schedule: ScheduleEntry[]
  gradeName: string
  classroom: string
}

export function ScheduleModal({ isOpen, onClose, schedule, gradeName, classroom }: ScheduleModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl max-h-[90vh] overflow-y-auto w-full mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Horario: {gradeName} - Aula {classroom}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <ScheduleTable schedule={schedule} gradeName={gradeName} classroom={classroom} onScheduleUpdate={() => {}} />
        </div>
      </div>
    </div>
  )
}
