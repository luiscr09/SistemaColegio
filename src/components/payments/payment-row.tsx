import { CheckCircle2, AlertCircle, Edit2 } from "lucide-react"
import { useState } from "react"
import type { Payment } from "../../types/types"
import { formatDate, getMonthName } from "../../lib/functions"

interface PaymentRowProps {
  payment: Payment
  onMarkAsPaid?: (paymentId: string) => void
  onEdit?: (payment: Payment) => void
}

export function PaymentRow({ payment, onMarkAsPaid, onEdit }: PaymentRowProps) {
  const [isLoading, setIsLoading] = useState(false)

  const getStatusIcon = () =>
    payment.status
      ? <CheckCircle2 className="w-5 h-5 text-green-600" />
      : <AlertCircle className="w-5 h-5 text-red-600" />

  const getStatusBadge = () => {
    const badges: Record<string, string> = {
      true: "bg-green-100 text-green-800",
      false: "bg-red-100 text-red-800",
    }
    return badges[String(payment.status)]
  }

  const handleMarkAsPaid = async () => {
    if (!onMarkAsPaid) return
    setIsLoading(true)
    try {
      await onMarkAsPaid(payment.id)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Tipo de pago */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <p className="font-medium text-gray-900">
              {payment.payment_type === "matricula"
                ? "Matrícula"
                : `Mensualidad - ${payment.month_name}`}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge()}`}>
          {payment.status ? "Pagado" : "Pendiente"}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-gray-900">
        ${payment.amount.toFixed(2)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {payment.payment_date
          ? (() => {
            const [year, month, day] = payment.payment_date.toString().split("-");
            const date = new Date(
              parseInt(year, 10),
              parseInt(month, 10) - 1,
              parseInt(day, 10)
            );
            return date.toLocaleDateString("es-ES");
          })()
          : "-"}
      </td>

      {/* Acciones */}
      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
        {payment.status === false && onMarkAsPaid && (
          <button
            onClick={handleMarkAsPaid}
            disabled={isLoading}
            className="px-3 py-1 bg-green-600 inline-flex items-center hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <CheckCircle2 className="w-5 h-5 text-white mr-1" />
            {isLoading ? "Procesando..." : "Pagar"}
          </button>
        )}
        {onEdit && payment.status !== false && (
          <button
            onClick={() => onEdit(payment)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
        )}
      </td>
    </tr>
  )
}
