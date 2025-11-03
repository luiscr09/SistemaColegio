import React, { useState } from "react"
import { supabase } from "../lib/supabase"
import Input from "../components/input"


export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    birthdate: "",
    gender: false,
    address: "",
    phone: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // 🔹 Manejar cambios de los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // 🔹 Función para guardar en Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.from("student").insert([
      {
        name: formData.name,
        lastname: formData.lastname,
        birthdate: formData.birthdate || null,
        gender: formData.gender,
        address: formData.address,
        phone: formData.phone,
      },
    ])

    setLoading(false)

    if (error) {
      console.error("Error al insertar:", error)
      setMessage("❌ Error al registrar el alumno.")
    } else {
      setMessage("✅ Alumno registrado correctamente.")
      setFormData({
        name: "",
        lastname: "",
        birthdate: "",
        gender: false,
        address: "",
        phone: "",
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-card rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-center mb-4">Registrar Alumno</h2>

      <Input
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Ej. Juan"
      />

      <Input
        label="Apellido"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
        placeholder="Ej. Pérez"
      />

      <Input
        label="Fecha de nacimiento"
        name="birthdate"
        type="date"
        value={formData.birthdate}
        onChange={handleChange}
      />

      <div className="flex items-center gap-2">
        <label htmlFor="gender" className="text-sm font-medium">
          ¿Es masculino?
        </label>
        <input
          id="gender"
          type="checkbox"
          name="gender"
          checked={formData.gender}
          onChange={handleChange}
          className="h-4 w-4 accent-blue-600"
        />
      </div>

      <Input
        label="Dirección"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Ej. Calle Central #123"
      />

      <Input
        label="Teléfono"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Ej. +505 8888 9999"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>

      {message && (
        <p
          className={`text-center mt-3 font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
