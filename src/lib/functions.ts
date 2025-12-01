import type { Payment, PaymentSummary } from "../types/types";

export function calculatePaymentSummary(payments: Payment[]): PaymentSummary {
  return {
    total_amount: payments.reduce((sum, p) => sum + p.amount, 0),
    paid_amount: payments.filter((p) => p.status === true).reduce((sum, p) => sum + p.amount, 0),
    pending_amount: payments.filter((p) => p.status === false).reduce((sum, p) => sum + p.amount, 0),
    overdue_amount: payments.filter((p) => p.status === false).reduce((sum, p) => sum + p.amount, 0),
    paid_count: payments.filter((p) => p.status === true).length,
    pending_count: payments.filter((p) => p.status === false).length,
    overdue_count: payments.filter((p) => p.status === false).length,
  }
}

export default function getMonthName(month: number): string {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  return months[month] || ""
}

export function formatDate(dateString: string | Date): string {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}