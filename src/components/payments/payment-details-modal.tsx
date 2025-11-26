import { X } from "lucide-react"
import { useState } from "react"
import type { Payment } from "../../types/types"

interface PaymentDetailsModalProps {
  payment: Payment | null
  isOpen: boolean
  onClose: () => void
  onSave?: (payment: Payment) => void
}

export function PaymentDetailsModal({ payment, isOpen, onClose, onSave }: PaymentDetailsModalProps) {
  const [notes, setNotes] = useState(payment?.notes || "")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Detalles del Pago</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
            <p className="text-2xl font-bold text-gray-900">${payment.amount.toFixed(2)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <p className="capitalize text-gray-600">{payment.status ? "Pagado" : "Pendiente"}</p>
          </div>

          {payment.payment_date && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Pago</label>
              <p className="text-gray-600">{new Date(payment.payment_date).toLocaleDateString("es-ES")}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Agregar notas..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          {onSave && (
            <button
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
