"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import type { NewsFormData } from "../../types/news"

interface NewsFormProps {
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
}

export function NewsForm({ onSubmit, onCancel }: NewsFormProps) {
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    description: "",
    image: null,
    imagePreview: null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria"
    } else if (formData.description.length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres"
    }

    if (!formData.image) {
      newErrors.image = "La imagen es obligatoria"
    } else if (formData.image.size > 5 * 1024 * 1024) {
      newErrors.image = "La imagen no debe superar 5 MB"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      setErrors({ ...errors, image: "Formato no soportado. Usa JPG, PNG, WebP o GIF" })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: reader.result as string,
      }))
      setErrors({ ...errors, image: "" })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      await onSubmit({
        title: formData.title,
        description: formData.description,
        image: formData.imagePreview,
        imageName: formData.image?.name,
        imageSize: formData.image?.size,
      })
      setMessage({ type: "success", text: "¡Noticia creada exitosamente!" })
      setTimeout(() => {
        setFormData({ title: "", description: "", image: null, imagePreview: null })
        setMessage(null)
      }, 2000)
    } catch (error) {
      setMessage({ type: "error", text: "Error al crear la noticia. Intenta nuevamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Crear Nueva Noticia</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ingresa un título claro y conciso"
            maxLength={100}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-400" : "border-input focus:ring-sky-500"
            } bg-background text-foreground`}
          />
          {errors.title && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.title}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">{formData.title.length}/100 caracteres</p>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Escribe el contenido completo de la noticia"
            rows={5}
            maxLength={1000}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
              errors.description ? "border-red-500 focus:ring-red-400" : "border-input focus:ring-sky-500"
            } bg-background text-foreground`}
          />
          {errors.description && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.description}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/1000 caracteres</p>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Imagen Destacada</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                errors.image ? "border-red-400 bg-red-50" : "border-input hover:border-sky-400 hover:bg-sky-50"
              }`}
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              <input
                id="imageInput"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />
              <svg
                className="w-12 h-12 mx-auto mb-2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm font-medium text-foreground mb-1">Sube tu imagen aquí</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, WebP o GIF (máx. 5 MB)</p>
            </div>

            {/* Preview */}
            {formData.imagePreview && (
              <div className="relative">
                <img
                  src={formData.imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: null, imagePreview: null })}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          {errors.image && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.image}
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`flex items-center gap-2 p-4 rounded-lg ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            {message.text}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            {isLoading ? "Guardando..." : "Guardar Noticia"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-foreground rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
