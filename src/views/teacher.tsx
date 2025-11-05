import type React from "react"
import { useState } from "react"
import Input from "../components/input"
import { Select } from "../components/search"
import { supabase } from "../lib/supabase"

interface FormErrors {
  [key: string]: string
}

export function Teacher() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    identificacion: "",
    correoElectronico: "",
    telefonoPersonal: "",
    direccionCompleta: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = "El nombre completo es requerido"
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos"
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida"
    if (!formData.genero) newErrors.genero = "El género es requerido"
    if (!formData.identificacion.trim()) newErrors.identificacion = "La identificación es requerida"
    if (!formData.correoElectronico.trim()) {
      newErrors.correoElectronico = "El correo electrónico es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoElectronico)) {
      newErrors.correoElectronico = "El correo electrónico no es válido"
    }
    if (!formData.telefonoPersonal.trim()) newErrors.telefonoPersonal = "El teléfono personal es requerido"
    if (!formData.direccionCompleta.trim()) newErrors.direccionCompleta = "La dirección completa es requerida"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  // 🔥 Aquí agregamos la funcionalidad para guardar en Supabase
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Datos del formulario:", formData)

      // Mapeo al formato de la tabla en Supabase
      const teacherData = {
        name: formData.nombreCompleto,
        lastname: formData.apellidos,
        birthday: formData.fechaNacimiento,
        gender: formData.genero === "masculino", // true = masculino, false = femenino
        email: formData.correoElectronico,
        phone: formData.telefonoPersonal,
        address: formData.direccionCompleta,
        state: true,
      }

      // Inserción a Supabase
      const { data, error } = await supabase.from("teacher").insert([teacherData])

      if (error) {
        console.error("Error al guardar el profesor:", error)
        alert("❌ Error al guardar el profesor: " + error.message)
        return
      }

      console.log("✅ Profesor guardado:", data)
      setIsSubmitted(true)

      // Reiniciar el formulario
      setFormData({
        nombreCompleto: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "",
        identificacion: "",
        correoElectronico: "",
        telefonoPersonal: "",
        direccionCompleta: "",
      })

      setTimeout(() => setIsSubmitted(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Agregar Profesor</h1>
          <p className="text-muted-foreground">Completa los siguientes campos</p>
        </div>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm font-medium">✓ Profesor agregado exitosamente</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nombre completo"
            name="nombreCompleto"
            placeholder="Juan"
            value={formData.nombreCompleto}
            onChange={handleChange}
            error={errors.nombreCompleto}
          />

          <Input
            label="Apellido(s)"
            name="apellidos"
            placeholder="García López"
            value={formData.apellidos}
            onChange={handleChange}
            error={errors.apellidos}
          />

          <Input
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            error={errors.fechaNacimiento}
          />

          <Select
            label="Género"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            error={errors.genero}
            options={[
              { value: "masculino", label: "Masculino" },
              { value: "femenino", label: "Femenino" },
            ]}
          />

          <Input
            label="Número de cédula / DUI / Identificación nacional"
            name="identificacion"
            placeholder="1234567-8"
            value={formData.identificacion}
            onChange={handleChange}
            error={errors.identificacion}
          />

          <Input
            label="Correo electrónico"
            name="correoElectronico"
            type="email"
            placeholder="juan@example.com"
            value={formData.correoElectronico}
            onChange={handleChange}
            error={errors.correoElectronico}
          />

          <Input
            label="Teléfono personal"
            name="telefonoPersonal"
            type="tel"
            placeholder="+503 1234-5678"
            value={formData.telefonoPersonal}
            onChange={handleChange}
            error={errors.telefonoPersonal}
          />

          <Input
            label="Dirección completa"
            name="direccionCompleta"
            placeholder="Calle Principal #123, Apartamento 4B"
            value={formData.direccionCompleta}
            onChange={handleChange}
            error={errors.direccionCompleta}
          />

          <button
            type="submit"
            className="w-full mt-8 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Agregar Profesor
          </button>
        </form>
      </div>
    </div>
  )
}
