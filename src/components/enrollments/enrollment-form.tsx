"use client"

import { useState } from "react"
import StudentSelector from "./student-selector"
import SchoolYearSelector from "./school-year-selector"
import GradeSelector from "./grade-selector"
import SectionSelector from "./section-selector"
import EnrollmentDetails from "./enrollment-details"
import EnrollmentSummary from "./enrollment-summary"
import type { Student, SchoolYear, Grade, Section, EnrollmentFormData } from "../../types/types"

interface EnrollmentFormProps {
  onSuccess: () => void
}

export default function EnrollmentForm({ onSuccess }: EnrollmentFormProps) {
  const [step, setStep] = useState<"student" | "year" | "grade" | "section" | "details" | "summary">("student")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedYear, setSelectedYear] = useState<SchoolYear | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [formData, setFormData] = useState<Partial<EnrollmentFormData>>({
    enrollment_date: new Date().toISOString().split("T")[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
    setError(null)
    setStep("year")
  }

  const handleYearSelect = (year: SchoolYear) => {
    setSelectedYear(year)
    setError(null)
    setStep("grade")
  }

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade)
    setFormData((prev) => ({ ...prev, grade_id: grade.id }))
    setError(null)
    setStep("section")
  }

  const handleSectionSelect = (section: Section) => {
    setSelectedSection(section)
    setFormData((prev) => ({ ...prev, section_id: section.id }))
    setError(null)
    setStep("details")
  }

  const handleDetailsSubmit = (data: Partial<EnrollmentFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep("summary")
  }

  const handleSaveEnrollment = async () => {
    if (!selectedStudent || !selectedYear || !selectedSection) {
      setError("Por favor completa todos los pasos")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const enrollmentData = {
        student_id: selectedStudent.id,
        school_year_id: selectedYear.id,
        section_id: selectedSection.id,
        enrollment_date: formData.enrollment_date,
        comments: formData.comments,
        custom_enrollment_fee: formData.custom_enrollment_fee,
        custom_monthly_fee: formData.custom_monthly_fee,
      }

      // Simulación de envío a Supabase
      console.log("Enrolling:", enrollmentData)

      // TODO: Conectar con Supabase
      // const { data, error } = await supabase
      //   .from('enrollments')
      //   .insert([enrollmentData])
      //   .select()

      await new Promise((resolve) => setTimeout(resolve, 1000))

      setLoading(false)
      onSuccess()

      // Reset form
      setStep("student")
      setSelectedStudent(null)
      setSelectedYear(null)
      setSelectedGrade(null)
      setSelectedSection(null)
      setFormData({ enrollment_date: new Date().toISOString().split("T")[0] })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la matrícula")
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep("student")
    setSelectedStudent(null)
    setSelectedYear(null)
    setSelectedGrade(null)
    setSelectedSection(null)
    setFormData({ enrollment_date: new Date().toISOString().split("T")[0] })
    setError(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
      {/* Progress Steps */}
      <div>
        <div className="flex items-center justify-between mb-4">
          {["Estudiante", "Año Escolar", "Grado", "Sección", "Detalles", "Resumen"].map((label, idx) => {
            const steps: (typeof step)[] = ["student", "year", "grade", "section", "details", "summary"]
            const isActive = steps.indexOf(step) >= idx
            const isComplete = steps.indexOf(step) > idx

            return (
              <div key={label} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isComplete
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isComplete ? "✓" : idx + 1}
                </div>
                {idx < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      isComplete ? "bg-green-600" : isActive ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Step Content */}
      <div className="min-h-96">
        {/* Sección de Estudiante */}
        {step === "student" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Paso 1: Seleccionar Estudiante</h2>
              <p className="text-sm text-gray-600 mt-1">Busca y selecciona el estudiante a matricular</p>
            </div>
            <StudentSelector onSelect={handleStudentSelect} />
          </div>
        )}

        {/* Sección de Año Escolar */}
        {step === "year" && selectedStudent && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Paso 2: Seleccionar Año Escolar</h2>
              <p className="text-sm text-gray-600 mt-1">
                Estudiante:{" "}
                <span className="font-medium">
                  {selectedStudent.first_name} {selectedStudent.last_name}
                </span>
              </p>
            </div>
            <SchoolYearSelector student={selectedStudent} onSelect={handleYearSelect} />
          </div>
        )}

        {/* Sección de Grado */}
        {step === "grade" && selectedYear && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Paso 3: Seleccionar Grado</h2>
              <p className="text-sm text-gray-600 mt-1">
                Año escolar: <span className="font-medium">{selectedYear.name}</span>
              </p>
            </div>
            <GradeSelector onSelect={handleGradeSelect} />
          </div>
        )}

        {/* Sección de Sección */}
        {step === "section" && selectedGrade && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Paso 4: Seleccionar Sección</h2>
              <p className="text-sm text-gray-600 mt-1">
                Grado: <span className="font-medium">{selectedGrade.name}</span>
              </p>
            </div>
            <SectionSelector gradeId={selectedGrade.id} onSelect={handleSectionSelect} />
          </div>
        )}

        {/* Sección de Detalles */}
        {step === "details" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Paso 5: Detalles de Matrícula</h2>
              <p className="text-sm text-gray-600 mt-1">Completa los datos adicionales de la matrícula</p>
            </div>
            <EnrollmentDetails formData={formData} onSubmit={handleDetailsSubmit} />
          </div>
        )}

        {/* Sección de Resumen */}
        {step === "summary" && selectedStudent && selectedYear && selectedSection && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Paso 6: Resumen de Matrícula</h2>
              <p className="text-sm text-gray-600 mt-1">Revisa los datos antes de guardar</p>
            </div>
            <EnrollmentSummary
              student={selectedStudent}
              year={selectedYear}
              section={selectedSection}
              formData={formData}
              loading={loading}
              onSave={handleSaveEnrollment}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-gray-200 flex gap-3 justify-between">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            if (step === "summary") {
              handleSaveEnrollment()
            }
          }}
          disabled={step !== "summary" || loading}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            step === "summary"
              ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Guardando..." : "Guardar Matrícula"}
        </button>
      </div>
    </div>
  )
}
