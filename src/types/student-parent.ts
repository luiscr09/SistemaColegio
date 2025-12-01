
export interface Student {
  id: string
  cue_mined: string | null
  birth_certificate_number: string | null
  first_name: string
  last_name: string
  birth_date: string | null
  created_at: string | null
}

export interface Parent {
  id: string
  full_name: string
  cedula: string
  phone: string
  email?: string
  job_title?: string
  work_phone?: string
  address?: string
  relationship_type: string
}

export interface StudentParent extends Student {
  parents: Parent[]
}
