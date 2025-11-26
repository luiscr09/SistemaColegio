import type React from "react"
import { useState, useEffect } from "react"
import type { Teacher } from "../../types/types"
import { User } from "lucide-react"
import Input from "../input"
import { supabase } from "../../lib/supabase"


interface TeacherFormProps {
  teacher: Teacher | null
  onCancel: () => void
}

const dateToInputValue = (date: Date | string | null) => {
  if (!date) return ""
  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString().slice(0, 10)
}

export default function TeacherForm({ teacher, onCancel }: TeacherFormProps) {
  const [formData, setFormData] = useState<Teacher>({
    teacherId: "",
    name: "",
    lastname: "",
    birthday: new Date(),
    gender: true,
    email: null,
    phone: null,
    address: null,
    state: true,
    createdAt: new Date(),
    ...teacher,
  })

  useEffect(() => {
    if (teacher) {
      setFormData({ ...teacher })
    }
  }, [teacher])
          
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.lastname?.trim()) newErrors.lastname = "El apellido es requerido"
    if (!formData.birthday) newErrors.birthday = "La fecha de nacimiento es requerida"

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }
    if (!formData.address || !formData.address.trim()) {
      newErrors.address = "La dirección es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === "birthday") {
      const dateValue = value ? new Date(value) : null
      setFormData((prev) => ({ ...prev, birthday: dateValue! }))
      if (errors.birthday) setErrors((prev) => ({ ...prev, birthday: "" }))
      return
    }

    if (name === "gender" || name === "state") {
      const boolValue = value === "true"
      setFormData((prev) => ({ ...prev, [name]: boolValue }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const submitData: Partial<Teacher> = {
        name: formData.name,
        lastname: formData.lastname,
        birthday: formData.birthday,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        state: formData.state,
      }

      const { data, error } = !teacher ? await supabase.from("teacher").insert([submitData]) : await supabase.from("teacher").update(submitData).eq("teacherId", teacher.teacherId).select()

      if (error) {
        console.error("Error saving teacher:", error)
        return
      }

      console.log(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-sky-50 rounded-lg p-4 border border-sky-100 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <User className="h-5 w-5 text-sky-600" />
          <h3 className="font-semibold text-foreground">Información Personal</h3>
        </div>
        <p className="text-sm text-muted-foreground">Completa los datos del profesor</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del profesor"
          required
          error={errors.name}
        />

        <Input
          label="Apellido"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Apellido del profesor"
          required
          error={errors.lastname}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          label="Cumpleaños"
          type="date"
          name="birthday"
          value={dateToInputValue(formData.birthday)}
          onChange={handleChange}
          required
          error={errors.birthday}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Género *</label>
          <select
            name="gender"
            value={formData.gender.toString()}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-white"
          >
            <option value="true">Masculino</option>
            <option value="false">Femenino</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="profesor@liceo.com"
          required
          error={errors.email}
        />

        <Input
          label="Teléfono"
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="+505 0000-0000"
          required
          error={errors.phone}
        />
      </div>

      {/* DIRECCIÓN */}
      <Input
        label="Dirección"
        name="address"
        value={formData.address || ""}
        onChange={handleChange}
        placeholder="Dirección del profesor"
        required
        error={errors.address}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Estado</label>
        <select
          name="state"
          value={formData.state.toString()}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-white"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      <div className="flex gap-3 pt-6 border-t border-sky-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-sky-200 text-foreground rounded-lg hover:bg-sky-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
        >
          {isSubmitting ? "Guardando..." : teacher ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  )
}
