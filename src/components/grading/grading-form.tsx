"use client"

import { useState } from "react"
import { StudentSelector } from "./student-selector"
import { SubjectSelector } from "./subject-selector"
import { DistributionBuilder } from "./distribution-builder"
import { PartialGradeInput } from "./partial-grade-input"
import { GradingSummary } from "./grading-summary"
import type { GradeDistribution, PartialGrade, Student, Subject } from "../../types/grading"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

interface GradingFormProps {
  onSuccess?: () => void
}

export function GradingForm({ onSuccess }: GradingFormProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [maxScore, setMaxScore] = useState(100)
  const [distributions, setDistributions] = useState<GradeDistribution[]>([])
  const [partialGrades, setPartialGrades] = useState<PartialGrade[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const totalScore = partialGrades.reduce((sum, pg) => sum + pg.points, 0)
  const isValid = partialGrades.length === distributions.length
  const progress = distributions.length > 0 ? (partialGrades.length / distributions.length) * 100 : 0

  const handleDistributionsChange = (newDistributions: GradeDistribution[]) => {
    setDistributions(newDistributions)
    setPartialGrades([])
  }

  const handlePartialGradesChange = (newGrades: PartialGrade[]) => {
    setPartialGrades(newGrades)
  }

  const handleSave = async () => {
    if (!selectedStudent || !selectedSubject) {
      setErrorMessage("Debe seleccionar estudiante y materia")
      return
    }

    if (!isValid) {
      setErrorMessage("Debe completar todas las calificaciones parciales")
      return
    }

    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccessMessage(`Calificaciones guardadas para ${selectedStudent.first_name} ${selectedStudent.last_name}`)

      // Reset form
      setSelectedStudent(null)
      setSelectedSubject(null)
      setMaxScore(100)
      setDistributions([])
      setPartialGrades([])

      onSuccess?.()
    } catch (error) {
      setErrorMessage("Error al guardar las calificaciones")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Sección 1: Selección */}
      <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm">
            1
          </span>
          Selecciona Estudiante y Materia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StudentSelector value={selectedStudent} onChange={setSelectedStudent} />
          <SubjectSelector value={selectedSubject} onChange={setSelectedSubject} />
        </div>
      </div>

      {/* Sección 2: Nota Máxima */}
      {selectedStudent && selectedSubject && (
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm">
              2
            </span>
            Define la Nota Máxima
          </h2>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-foreground mb-2">Puntuación Máxima</label>
            <input
              type="number"
              value={maxScore}
              onChange={(e) => setMaxScore(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      )}

      {/* Sección 3: Estructura de Distribución */}
      {selectedStudent && selectedSubject && (
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm">
              3
            </span>
            Estructura de la Evaluación
          </h2>
          <DistributionBuilder maxScore={maxScore} distributions={distributions} onChange={handleDistributionsChange} />
        </div>
      )}

      {/* Sección 4: Ingreso de Calificaciones */}
      {distributions.length > 0 && (
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm">
              4
            </span>
            Ingresa las Calificaciones Parciales
          </h2>

          {/* Barra de progreso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progreso</span>
              <span className="text-sm text-muted-foreground">
                {partialGrades.length} de {distributions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <PartialGradeInput
            distributions={distributions}
            maxScore={maxScore}
            partialGrades={partialGrades}
            onChange={handlePartialGradesChange}
          />
        </div>
      )}

      {/* Sección 5: Resumen y Validación */}
      {distributions.length > 0 && (
        <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm">
              5
            </span>
            Resumen y Validación
          </h2>

          <GradingSummary
            distributions={distributions}
            partialGrades={partialGrades}
            maxScore={maxScore}
            totalScore={totalScore}
            isValid={isValid}
          />

          {/* Mensajes */}
          {errorMessage && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-red-700">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700">{successMessage}</span>
            </div>
          )}

          {/* Botón Guardar */}
          <button
            onClick={handleSave}
            disabled={!isValid || isLoading}
            className="mt-6 w-full px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Calificaciones"
            )}
          </button>
        </div>
      )}
    </div>
  )
}
