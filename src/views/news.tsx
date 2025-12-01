"use client"

import { useState } from "react"
import { NewsForm } from "../components/news/news-form"
import { NewsList } from "../components/news/news-list"
import type { News } from "../types/news"

const MOCK_NEWS: News[] = [
  {
    id: "1",
    title: "Jornada de Inscripción 2025",
    description: "Se abre el período de inscripción para estudiantes nuevos y antiguos del ciclo escolar 2025.",
    image: "/images/Matricula_abierta.jpg",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    published: true,
  },
]

export default function NewsPage() {
  const [news, setNews] = useState<News[]>(MOCK_NEWS)
  const [showForm, setShowForm] = useState(false)

  const handleAddNews = async (newsData: any) => {
    const newNews: News = {
      id: Date.now().toString(),
      ...newsData,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true,
    }
    setNews([newNews, ...news])
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Gestión de Noticias</h1>
            <p className="text-muted-foreground">Crea y publica noticias que aparecerán en la página principal</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
          >
            {showForm ? "Cancelar" : "+ Agregar Noticia"}
          </button>
        </div>

        {showForm && <NewsForm onSubmit={handleAddNews} onCancel={() => setShowForm(false)} />}

        <NewsList news={news} />
      </div>
    </div>
  )
}
