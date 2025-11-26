import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"
import type { PaymentSummary } from "../../types/types"

interface PaymentSummaryCardProps {
  summary: PaymentSummary
}

export function PaymentSummaryCard({ summary }: PaymentSummaryCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">Total a Pagar</span>
          <TrendingUp className="w-4 h-4 text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-blue-900">${summary.overdue_amount.toFixed(2)}</p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-600">Pagado</span>
          <CheckCircle className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-green-900">${summary.paid_amount.toFixed(2)}</p>
        <p className="text-xs text-green-600 mt-1">{summary.paid_count} pagos</p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-red-600">Atrasado</span>
          <AlertCircle className="w-4 h-4 text-red-600" />
        </div>
        <p className="text-2xl font-bold text-red-900">${summary.overdue_amount.toFixed(2)}</p>
        <p className="text-xs text-red-600 mt-1">{summary.overdue_count} pagos</p>
      </div>
    </div>
  )
}
