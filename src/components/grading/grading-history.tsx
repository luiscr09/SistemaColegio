"use client"

import { useState, useEffect } from "react"
import type { GradingRecord } from "../../types/grading"
import { Calendar, BookOpen } from "lucide-react"

interface GradingHistoryProps {
  refreshTrigger: number
}

export function GradingHistory({ refreshTrigger }: GradingHistoryProps) {
  const [history, setHistory] = useState<GradingRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - Reemplazar con Supabase
  const mockHistory: GradingRecord[] = [
    {
      id: "1",
      studentId: "1",
      studentName: "Juan García",
      subjectId: "1",
      subjectName: "Matemáticas",
      maxScore: 100,
      distributions: [
        { id: "1", name: "Evaluación 1", maxPoints: 50 },
        { id: "2", name: "Evaluación 2", maxPoints: 50 },
      ],
      partialGrades: [
        { distributionId: "1", points: 45 },
        { distributionId: "2", points: 42 },
      ],
      finalScore: 87,
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    // Simular carga
    setTimeout(() => {
      setHistory([...mockHistory])
      setIsLoading(false)
    }, 500)
  }, [refreshTrigger])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Historial Reciente</h2>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">Historial Reciente</h2>

      {history.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No hay registros de calificaciones aún</p>
      ) : (
        <div className="space-y-3">
          {history.map((record) => (
            <div key={record.id} className="p-3 border border-border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{record.studentName}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {record.subjectName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(record.createdAt).toLocaleDateString("es")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-sky-600">{record.finalScore.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">
                    {((record.finalScore / record.maxScore) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
