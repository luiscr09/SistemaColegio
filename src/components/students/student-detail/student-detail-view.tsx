"use client"

import { useState, useEffect } from "react"
import { getStudentWithParents } from "../../../lib/queries"
import type { Student } from "../../../types/student-parent"
import { StudentHeader } from "./student-header"
import { StudentInfo } from "./student-info"
import { StudentParentsList } from "./student-parents-list"
import { Loader2 } from "lucide-react"

interface StudentDetailViewProps {
  studentId: string
}

export function StudentDetailView({ studentId }: StudentDetailViewProps) {
  const [student, setStudent] = useState<Student | null>(null)
  const [parents, setParents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStudentData() {
      try {
        setLoading(true)
        const result = await getStudentWithParents(studentId)

        if (result.error) {
          setError(result.error)
          return
        }

        if (result.data) {
          setStudent(result.data.student)
          setParents(result.data.parents)
        }
      } catch (err) {
        setError("Error al cargar los datos del estudiante")
      } finally {
        setLoading(false)
      }
    }

    loadStudentData()
  }, [studentId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      </div>
    )
  }

  if (error) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
  }

  if (!student) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-700">Estudiante no encontrado</div>
    )
  }

  return (
    <div className="space-y-6">
      <StudentHeader student={student} />
      <StudentInfo student={student} />
      <StudentParentsList parents={parents} studentId={studentId} />
    </div>
  )
}
