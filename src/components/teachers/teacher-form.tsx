"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Teacher } from "../../types/types"
import { User } from "lucide-react"

interface TeacherFormProps {
  teacher: Teacher | null
  onSubmit: (teacher: Partial<Teacher>) => void
  onCancel: () => void
}

// Función helper para convertir Date a yyyy-mm-dd
const dateToInputValue = (date: Date | string | null) => {
  if (!date) return ""
  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString().slice(0, 10)
}

export default function TeacherForm({ teacher, onSubmit, onCancel }: TeacherFormProps) {
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

  // Si cambia teacher, actualizamos formData
  useEffect(() => {
    if (teacher) {
      setFormData({
        ...teacher,
      })
    }
  }, [teacher])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = "El nombre es requerido"
    }
    if (!formData.lastname?.trim()) {
      newErrors.lastname = "El apellido es requerido"
    }
    if (!formData.birthday) {
      newErrors.birthday = "La fecha de nacimiento es requerida"
    }
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
      // Convertir string a Date
      const dateValue = value ? new Date(value) : null
      setFormData((prev) => ({ ...prev, birthday: dateValue! }))
      if (errors.birthday) setErrors((prev) => ({ ...prev, birthday: "" }))
      return
    }

    if (name === "gender" || name === "state") {
      // Convertir string a boolean
      const boolValue = value === "true"
      setFormData((prev) => ({ ...prev, [name]: boolValue }))
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
      return
    }

    // Para email, phone, name, lastname, address
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Enviamos solo los campos editables
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
      await onSubmit(submitData)
    } catch (error) {
      console.error("Error submitting form:", error)
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

      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nombre *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
              errors.name ? "border-red-500" : "border-sky-200"
            }`}
            placeholder="Nombre del profesor"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Apellido *</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
              errors.lastname ? "border-red-500" : "border-sky-200"
            }`}
            placeholder="Apellido del profesor"
          />
          {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
        </div>
      </div>

      {/* Cumpleaños y Género */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Cumpleaños *</label>
          <input
            type="date"
            name="birthday"
            value={dateToInputValue(formData.birthday)}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
              errors.birthday ? "border-red-500" : "border-sky-200"
            }`}
          />
          {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Género *</label>
          <select
            name="gender"
            value={formData.gender.toString()}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-white"
          >
            <option value="true">Masculino</option>
            <option value="false">Femenino</option>
          </select>
        </div>
      </div>

      {/* Email y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
              errors.email ? "border-red-500" : "border-sky-200"
            }`}
            placeholder="profesor@liceo.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Teléfono *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
              errors.phone ? "border-red-500" : "border-sky-200"
            }`}
            placeholder="+505 0000-0000"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Dirección *</label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
            errors.address ? "border-red-500" : "border-sky-200"
          }`}
          placeholder="Dirección del profesor"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Estado *</label>
        <select
          name="state"
          value={formData.state.toString()}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-white"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-6 border-t border-sky-100">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-sky-200 text-foreground rounded-lg hover:bg-sky-50 active:bg-sky-100 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-sky-400 text-white rounded-lg transition font-medium"
        >
          {isSubmitting ? "Guardando..." : teacher ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  )
}
