
import type React from "react"
import { X } from "lucide-react"
import PaymentForm from "./payment-form"
import type { Payment, StudentPaymentProps } from "../../types/types"

interface TeacherModalProps {
  onClose: () => void
  payments: Payment[]
  student: StudentPaymentProps | null
}

export default function PaymentRegisterModal({ onClose, payments, student }: TeacherModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-sky-100">
          <h2 className="text-2xl font-bold text-foreground">
            Registrar nuevo pago
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-sky-100 rounded-lg transition text-muted-foreground">
            <X className="size-6" />
          </button>
        </div>

        <div className="p-6">
          <PaymentForm onCancel={onClose} payments={payments} student={student} />
        </div>
      </div>
    </div>
  )
}
