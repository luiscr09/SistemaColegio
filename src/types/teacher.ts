export interface Teacher {
  id: string
  first_name: string
  last_name: string
  birthday: string
  gender: "Masculino" | "Femenino" | "Otro"
  phone: string
  email: string
  address: string
  state: "activo" | "inactivo"
  created_at: string
}
