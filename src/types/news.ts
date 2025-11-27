export interface News {
  id: string
  title: string
  description: string
  image: string
  imageName?: string
  imageSize?: number
  createdAt: Date
  updatedAt: Date
  published: boolean
}

export interface NewsFormData {
  title: string
  description: string
  image: File | null
  imagePreview: string | null
}
