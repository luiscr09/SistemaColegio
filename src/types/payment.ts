export type PaymentType = "matricula" | "mensualidad"
export type PaymentStatus = "pendiente" | "pagado" | "atrasado"

export interface Payment {
  id: string
  enrollment_id: string
  amount: number
  payment_type: PaymentType
  status: PaymentStatus
  month?: number // 1-12 para mensualidades
  due_date: string
  payment_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface PaymentSummary {
  total_amount: number
  paid_amount: number
  pending_amount: number
  overdue_amount: number
  paid_count: number
  pending_count: number
  overdue_count: number
}

export interface PaymentPlan {
  enrollment_id: string
  enrollment_fee: Payment
  monthly_fees: Payment[]
  summary: PaymentSummary
}
