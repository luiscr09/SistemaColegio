import type { Payment } from "../../types/types"
import { PaymentRow } from "./payment-row"

interface PaymentsTableProps {
  payments: Payment[]
  isLoading?: boolean
  onMarkAsPaid?: (paymentId: string) => void
  onEdit?: (payment: Payment) => void
}

export function PaymentsTable({ payments, isLoading = false, onMarkAsPaid, onEdit }: PaymentsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay pagos registrados</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Concepto</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Monto</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha Pago</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <PaymentRow key={payment.id} payment={payment} onMarkAsPaid={onMarkAsPaid} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
