import { useState } from "react"
import { SubjectAssignmentModal } from "./subject-assignment-modal"
import type { ScheduleEntry } from "../../types/schedule"

interface ScheduleCellProps {
  entry: ScheduleEntry
  onUpdate: (updates: Partial<ScheduleEntry>) => void
}

export function ScheduleCell({ entry, onUpdate }: ScheduleCellProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`w-full p-2 rounded-lg text-sm font-medium transition-all min-h-16 flex flex-col justify-center items-center text-center ${entry.subjectName === "Sin asignar"
            ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
            : "bg-sky-500 text-white hover:bg-sky-600"
          }`}

      >
        {entry.subjectName ? (
          <>
            <div className="font-semibold">{entry.subjectName}</div>
            <div className="text-xs mt-1">{entry.teacherName}</div>
          </>
        ) : (
          "Sin asignar"
        )}
      </button>

      {showModal && (
        <SubjectAssignmentModal
          entry={entry}
          onSave={(subject, teacher) => {
            onUpdate({
              subjectId: subject.id,
              subjectName: subject.name,
              teacherId: teacher.teacherId,
              teacherName: teacher.name + " " + teacher.lastname,
            })
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
