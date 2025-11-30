import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import type { Payment, PaymentSummary, Student } from "../types/types"
import { calculatePaymentSummary } from "../lib/functions"
import { StudentSearch } from "../components/payments/student-search"
import { PaymentSummaryCard } from "../components/payments/payment-summary-card"
import { PaymentsTable } from "../components/payments/payment-table"
import { PaymentDetailsModal } from "../components/payments/payment-details-modal"
import { supabase } from "../lib/supabase"
import PaymentRegisterModal from "../components/payments/payment-register-modal"

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([])
  const [summary, setSummary] = useState<PaymentSummary>(calculatePaymentSummary([]))
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalPaymentRegisterOpen, setIsModalPaymentRegisterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    const handleLoadPayments = async () => {
      const { data, error } = await supabase.from("get_payments_by_students").select("*").eq("student_id", selectedStudent?.id)

      if (error) {
        console.log(error);
        return;
      }
      setPayments(data || [])
      setFilteredPayments(data || [])
      setSummary(calculatePaymentSummary(data || []))

    }
    handleLoadPayments();
  }, [selectedStudent])

  const handleMarkAsPaid = async (paymentId: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, status: true, payment_date: new Date() } : p,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePayment = async (payment: Payment) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setPayments((prev) => prev.map((p) => (p.id === payment.id ? payment : p)))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pagos</h1>
          <p className="text-gray-600">Administra y visualiza los pagos de matrículas y mensualidades</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <StudentSearch onSelectStudent={setSelectedStudent} selectedStudent={selectedStudent} />
        </div>

        <PaymentSummaryCard summary={summary} />

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos los pagos</option>
            <option value="pagado">Pagados</option>
            <option value="atrasado">Atrasados</option>
          </select>

          <button disabled={!selectedStudent} onClick={() => setIsModalPaymentRegisterOpen(true)} className="flex disabled:opacity-50 disabled:cursor-default disabled:hover:bg-blue-600 items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ml-auto">
            <Plus className="w-5 h-5" />
            Registrar Pago
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <PaymentsTable
            payments={filteredPayments}
            isLoading={isLoading}
            onMarkAsPaid={handleMarkAsPaid}
            onEdit={(payment) => {
              setSelectedPayment(payment)
              setIsModalOpen(true)
            }}
          />
        </div>
      </div>

      <PaymentDetailsModal
        payment={selectedPayment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPayment(null)
        }}
        onSave={handleSavePayment}
      />

      {isModalPaymentRegisterOpen &&
        <PaymentRegisterModal
          student={selectedStudent}
          payments={payments}
          onClose={() => setIsModalPaymentRegisterOpen(false)}
        />
      }
    </div>
  )
}
