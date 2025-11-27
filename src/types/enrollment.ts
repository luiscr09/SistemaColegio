export interface Student {
  id: string
  first_name: string
  last_name: string
  cue_mined: string
  birth_certificate_number: string
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
  name: string
  level: number
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
