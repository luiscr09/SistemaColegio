"use client"

import { useState } from "react"
import type { GradeDistribution } from "../../types/grading"
import { Plus, Trash2 } from "lucide-react"

interface DistributionBuilderProps {
  maxScore: number
  distributions: GradeDistribution[]
  onChange: (distributions: GradeDistribution[]) => void
}

export function DistributionBuilder({ maxScore, distributions, onChange }: DistributionBuilderProps) {
  const [presetMode, setPresetMode] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState<string>("")

  const presets: Record<string, GradeDistribution[]> = {
    two: [
      { id: "1", name: "Primera Evaluación", maxPoints: maxScore / 2 },
      { id: "2", name: "Segunda Evaluación", maxPoints: maxScore / 2 },
    ],
    three: [
      { id: "1", name: "Evaluación 1", maxPoints: maxScore / 3 },
      { id: "2", name: "Evaluación 2", maxPoints: maxScore / 3 },
      { id: "3", name: "Evaluación 3", maxPoints: maxScore / 3 },
    ],
    four: [
      { id: "1", name: "Evaluación 1", maxPoints: maxScore / 4 },
      { id: "2", name: "Evaluación 2", maxPoints: maxScore / 4 },
      { id: "3", name: "Evaluación 3", maxPoints: maxScore / 4 },
      { id: "4", name: "Evaluación 4", maxPoints: maxScore / 4 },
    ],
    custom: [],
  }

  const handlePresetSelect = (presetKey: string) => {
    setSelectedPreset(presetKey)
    if (presetKey !== "custom") {
      onChange(presets[presetKey])
    }
  }

  const handleAddDistribution = () => {
    const newDistribution: GradeDistribution = {
      id: Date.now().toString(),
      name: `Evaluación ${distributions.length + 1}`,
      maxPoints: 0,
    }
    onChange([...distributions, newDistribution])
  }

  const handleUpdateDistribution = (id: string, field: "name" | "maxPoints", value: string | number) => {
    const updated = distributions.map((d) =>
      d.id === id
        ? {
            ...d,
            [field]:
              field === "maxPoints" ? Math.max(0, Math.min(maxScore, Number.parseFloat(value as string) || 0)) : value,
          }
        : d,
    )
    onChange(updated)
  }

  const handleDeleteDistribution = (id: string) => {
    onChange(distributions.filter((d) => d.id !== id))
  }

  const totalPoints = distributions.reduce((sum, d) => sum + d.maxPoints, 0)
  const isComplete = Math.abs(totalPoints - maxScore) < 0.01

  return (
    <div className="space-y-4">
      {presetMode && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Selecciona un patrón de evaluación:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { key: "two", label: "2 Partes (50-50)" },
              { key: "three", label: "3 Partes (33-33-33)" },
              { key: "four", label: "4 Partes (25-25-25-25)" },
              { key: "custom", label: "Personalizado" },
            ].map((preset) => (
              <button
                key={preset.key}
                onClick={() => handlePresetSelect(preset.key)}
                className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                  selectedPreset === preset.key
                    ? "border-sky-600 bg-sky-50 text-sky-700"
                    : "border-border bg-white text-foreground hover:bg-gray-50"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {(selectedPreset === "custom" || !presetMode) && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-foreground">Componentes de Evaluación</h3>
            <button
              onClick={handleAddDistribution}
              className="flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>

          <div className="space-y-2">
            {distributions.map((dist) => (
              <div key={dist.id} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Nombre</label>
                  <input
                    type="text"
                    value={dist.name}
                    onChange={(e) => handleUpdateDistribution(dist.id, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Puntos</label>
                  <input
                    type="number"
                    value={dist.maxPoints}
                    onChange={(e) => handleUpdateDistribution(dist.id, "maxPoints", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
                <button
                  onClick={() => handleDeleteDistribution(dist.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {distributions.length > 0 && (
        <div
          className={`p-3 rounded-lg border-2 ${
            isComplete ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
          }`}
        >
          <div className="flex justify-between items-center">
            <span className={`font-medium ${isComplete ? "text-green-700" : "text-amber-700"}`}>
              Total: {totalPoints.toFixed(2)} / {maxScore}
            </span>
            {isComplete && (
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">✓ Válido</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
