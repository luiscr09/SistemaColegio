"use client"

import { useState } from "react"
import { GradingForm } from "../components/grading/grading-form"
import { GradingHistory } from "../components/grading/grading-history"

export default function GradingPage() {
  const [refreshHistory, setRefreshHistory] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Gestión de Calificaciones</h1>
          <p className="text-muted-foreground">
            Define la estructura de evaluación e ingresa las calificaciones de tus estudiantes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GradingForm onSuccess={() => setRefreshHistory((prev) => prev + 1)} />
          </div>

          <div className="lg:col-span-1">
            <GradingHistory refreshTrigger={refreshHistory} />
          </div>
        </div>
      </div>
    </div>
  )
}
