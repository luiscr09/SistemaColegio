"use client"

import { Trash2 } from "lucide-react"
import type { News } from "../../types/news"

interface NewsListProps {
  news: News[]
}

export function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <p className="text-muted-foreground text-lg">No hay noticias publicadas aún</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-input">
              <span className="text-xs text-muted-foreground">{item.createdAt.toLocaleDateString("es-ES")}</span>
              <button className="text-red-600 hover:text-red-700 transition-colors p-1">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
