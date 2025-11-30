export interface Teacher {
  teacherId: string
  name: string
  lastname: string
  birthday: Date // fecha en formato ISO o yyyy-mm-dd como string
  gender: boolean // true o false, probablemente true = masculino, false = femenino (o viceversa)
  email: string | null
  phone: string | null
  address: string | null
  state: boolean // true = activo, false = inactivo (suposición)
  createdAt: Date // fecha ISO string
}

export interface StudentPaymentProps extends Student {
  custom_enrollment_fee?: number
  custom_monthly_fee?: number
}

export interface Student {
  id: string
  first_name: string
  last_name: string
  cue_mined: string
  birth_certificate_number: string
}

export interface PaymentMethodProps {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface SchoolYear {
  id: string
  name: string
  start_date: string
  end_date: string
  state: "abierto" | "cerrado" | "completado"
}

export interface Grade {
  id: string
  grade_name: string
  level: string
}

export interface Section {
  id: string
  name: string
  grade_id: string
  capacity: number
}

export interface Enrollment {
  student_id: string
  school_year_id: string
  section_id: string
  enrollment_date: string
  comments?: string
  custom_enrollment_fee?: number
  custom_monthly_fee?: number
}

export interface EnrollmentFormData extends Enrollment {
  grade_id: string
}

export type PaymentType = "matricula" | "mensualidad"

export interface Payment {
  id: string
  enrollment_id: string
  amount: number
  payment_type: PaymentType
  status: boolean
  payment_date?: Date
  notes?: string
  created_at: string;
  month_name: string;
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
