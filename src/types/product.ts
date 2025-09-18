import type { ImageMetadata } from 'astro'

export interface ProductInfo {
  headline?: string
  modelNumber?: string
  title: string
  copy?: string
  description?: string
  price?: string
  link?: string
}

export interface CarouselItem {
  id: string
  image: ImageMetadata
  alt: string
}