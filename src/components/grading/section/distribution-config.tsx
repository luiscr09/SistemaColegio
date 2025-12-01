

import { useState, useEffect } from "react"

interface DistributionConfigProps {
  onComplete: (distributions: any[], maxScore: number) => void
  onBack: () => void
  subjectId?: string
  levelId?: string
  gradeId?: string
  classroom?: string
  existingConfig?: any
}

export default function DistributionConfig({
  onComplete,
  onBack,
  subjectId,
  levelId,
  gradeId,
  classroom,
  existingConfig,
}: DistributionConfigProps) {
  const [maxScore, setMaxScore] = useState(existingConfig?.maxScore || 100)
  const [preset, setPreset] = useState("2")
  const [distributions, setDistributions] = useState(
    existingConfig?.distributions || [
      { id: "1", name: "Evaluación 1", maxPoints: 50 },
      { id: "2", name: "Evaluación 2", maxPoints: 50 },
    ],
  )
  const [isCustom, setIsCustom] = useState(!!existingConfig)
  const [showWarning, setShowWarning] = useState(false)
  const [hasGradingData, setHasGradingData] = useState(false)

  useEffect(() => {
    if (existingConfig) {
      const savedGradings = localStorage.getItem(`gradings-${levelId}-${gradeId}-${classroom}-${subjectId}`)
      setHasGradingData(!!savedGradings)
    }
  }, [existingConfig, levelId, gradeId, classroom, subjectId])

  const presets = {
    "2": [
      { id: "1", name: "Evaluación 1", maxPoints: maxScore / 2 },
      { id: "2", name: "Evaluación 2", maxPoints: maxScore / 2 },
    ],
    "3": [
      { id: "1", name: "Evaluación 1", maxPoints: maxScore / 3 },
      { id: "2", name: "Evaluación 2", maxPoints: maxScore / 3 },
      { id: "3", name: "Evaluación 3", maxPoints: maxScore / 3 },
    ],
    "4": [
      { id: "1", name: "Evaluación 1", maxPoints: maxScore / 4 },
      { id: "2", name: "Evaluación 2", maxPoints: maxScore / 4 },
      { id: "3", name: "Evaluación 3", maxPoints: maxScore / 4 },
      { id: "4", name: "Evaluación 4", maxPoints: maxScore / 4 },
    ],
  }

  const handlePresetChange = (p: string) => {
    if (hasGradingData) {
      setShowWarning(true)
    }
    setPreset(p)
    setDistributions(presets[p as keyof typeof presets] || [])
    setIsCustom(false)
  }

  const handleMaxScoreChange = (value: number) => {
    if (hasGradingData) {
      setShowWarning(true)
    }
    setMaxScore(Math.max(1, value))
    if (!isCustom) {
      setDistributions(presets[preset as keyof typeof presets] || [])
    }
  }

  const handleUpdateDistribution = (id: string, field: "name" | "maxPoints", value: any) => {
    if (hasGradingData) {
      setShowWarning(true)
    }
    setDistributions(
      distributions.map((d) =>
        d.id === id ? { ...d, [field]: field === "maxPoints" ? Math.max(0, value) : value } : d,
      ),
    )
    setIsCustom(true)
  }

  const handleAddDistribution = () => {
    setDistributions([
      ...distributions,
      { id: Date.now().toString(), name: `Evaluación ${distributions.length + 1}`, maxPoints: 0 },
    ])
    setIsCustom(true)
  }

  const handleRemoveDistribution = (id: string) => {
    setDistributions(distributions.filter((d) => d.id !== id))
    setIsCustom(true)
  }

  const totalPoints = distributions.reduce((sum, d) => sum + d.maxPoints, 0)
  const isValid = totalPoints === maxScore && distributions.length > 0

  const handleComplete = () => {
    if (subjectId && levelId && gradeId && classroom) {
      const config = {
        subjectId,
        levelId,
        gradeId,
        classroom,
        maxScore,
        distributions,
        savedAt: new Date().toISOString(),
      }
      localStorage.setItem(`config-${levelId}-${gradeId}-${classroom}-${subjectId}`, JSON.stringify(config))
    }
    onComplete(distributions, maxScore)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Configurar Sistema de Evaluación</h2>
          {hasGradingData && (
            <p className="text-sm text-amber-600 mt-1">
              ⚠️ Ya hay calificaciones registradas. Los cambios aquí afectarán los datos existentes.
            </p>
          )}
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atrás
        </button>
      </div>

      {showWarning && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Advertencia:</strong> Modificar la estructura de evaluaciones puede afectar las calificaciones ya
            registradas. Asegúrate de que los cambios sean válidos.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {/* Puntuación Máxima */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Puntuación Máxima Total</label>
          <input
            type="number"
            value={maxScore}
            onChange={(e) => handleMaxScoreChange(Math.max(1, Number(e.target.value)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Presets */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Tipo de Distribución</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["2", "3", "4"].map((p) => (
              <button
                key={p}
                onClick={() => handlePresetChange(p)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  preset === p && !isCustom
                    ? "bg-sky-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-sky-500"
                }`}
              >
                {p} Evaluaciones
              </button>
            ))}
            <button
              onClick={() => setIsCustom(true)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isCustom
                  ? "bg-sky-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-sky-500"
              }`}
            >
              Personalizado
            </button>
          </div>
        </div>

        {/* Tabla de Distribuciones */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Estructura de Evaluaciones</h3>
          <div className="space-y-3">
            {distributions.map((dist) => (
              <div key={dist.id} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="text-xs text-gray-600">Nombre</label>
                  <input
                    type="text"
                    value={dist.name}
                    onChange={(e) => handleUpdateDistribution(dist.id, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
                <div className="w-24">
                  <label className="text-xs text-gray-600">Puntos</label>
                  <input
                    type="number"
                    value={dist.maxPoints}
                    onChange={(e) => handleUpdateDistribution(dist.id, "maxPoints", Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                  />
                </div>
                {isCustom && (
                  <button
                    onClick={() => handleRemoveDistribution(dist.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {isCustom && (
            <button
              onClick={handleAddDistribution}
              className="mt-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-semibold"
            >
              + Agregar Evaluación
            </button>
          )}
        </div>

        {/* Validación */}
        <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
          <p className="text-sm">
            <span className="font-semibold">Total de puntos:</span>{" "}
            <span className={totalPoints === maxScore ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
              {totalPoints} / {maxScore}
            </span>
          </p>
          {totalPoints !== maxScore && (
            <p className="text-xs text-red-700 mt-2">Los puntos deben sumar exactamente {maxScore}</p>
          )}
        </div>

        {/* Botones */}
        <button
          onClick={handleComplete}
          disabled={!isValid}
          className={`w-full px-6 py-3 font-semibold rounded-lg transition-all ${
            isValid
              ? "bg-sky-600 text-white hover:bg-sky-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continuar a Calificaciones
        </button>
      </div>
    </div>
  )
}
