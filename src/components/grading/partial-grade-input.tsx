import type { GradeDistribution, PartialGrade } from "../../types/grading"

interface PartialGradeInputProps {
  distributions: GradeDistribution[]
  maxScore: number
  partialGrades: PartialGrade[]
  onChange: (grades: PartialGrade[]) => void
}

export function PartialGradeInput({ distributions, maxScore, partialGrades, onChange }: PartialGradeInputProps) {
  const handleGradeChange = (distributionId: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    const distribution = distributions.find((d) => d.id === distributionId)

    if (!distribution) return

    // Limitar al máximo de puntos permitidos para esta distribución
    const limitedValue = Math.max(0, Math.min(distribution.maxPoints, numValue))

    const existingIndex = partialGrades.findIndex((pg) => pg.distributionId === distributionId)

    let updated: PartialGrade[]
    if (existingIndex >= 0) {
      updated = [...partialGrades]
      updated[existingIndex] = { distributionId, points: limitedValue }
    } else {
      updated = [...partialGrades, { distributionId, points: limitedValue }]
    }

    onChange(updated)
  }

  return (
    <div className="space-y-3">
      {distributions.map((dist) => {
        const currentGrade = partialGrades.find((pg) => pg.distributionId === dist.id)
        const inputValue = currentGrade?.points || ""

        return (
          <div key={dist.id} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">{dist.name}</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => handleGradeChange(dist.id, e.target.value)}
                  placeholder="0"
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  step="0.01"
                  min="0"
                  max={dist.maxPoints}
                />
                <span className="text-sm text-muted-foreground font-medium">/ {dist.maxPoints.toFixed(2)}</span>
              </div>
            </div>
            {inputValue && (
              <div
                className={`px-3 py-2 rounded-lg font-medium text-sm ${
                  Number.parseFloat(inputValue.toString()) === dist.maxPoints
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {((Number.parseFloat(inputValue.toString()) / dist.maxPoints) * 100).toFixed(0)}%
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
