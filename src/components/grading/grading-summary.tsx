"use client"

import type { GradeDistribution, PartialGrade } from "../../types/grading"

interface GradingSummaryProps {
  distributions: GradeDistribution[]
  partialGrades: PartialGrade[]
  maxScore: number
  totalScore: number
  isValid: boolean
}

export function GradingSummary({ distributions, partialGrades, maxScore, totalScore, isValid }: GradingSummaryProps) {
  const percentage = (totalScore / maxScore) * 100

  return (
    <div className="space-y-4">
      {/* Detalles de cada componente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {distributions.map((dist) => {
          const grade = partialGrades.find((pg) => pg.distributionId === dist.id)
          const percentage = grade ? (grade.points / dist.maxPoints) * 100 : 0

          return (
            <div key={dist.id} className="p-3 border border-border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-foreground">{dist.name}</span>
                <span className="text-sm font-bold text-sky-600">
                  {grade?.points.toFixed(2) || "-"} / {dist.maxPoints.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div className="bg-sky-500 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Resumen final */}
      <div className="p-4 rounded-lg border-2 border-sky-200 bg-sky-50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Nota Total</span>
            <div className="text-2xl font-bold text-foreground mt-1">{totalScore.toFixed(2)}</div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Porcentaje</span>
            <div className="text-2xl font-bold text-foreground mt-1">{percentage.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
