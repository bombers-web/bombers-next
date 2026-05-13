import { Image } from './imageTypes'

export type EventType = {
  id: number
  name: string
  active: boolean
  featured: boolean
  date: string
  location: string
  city?: string
  description: string
  image?: Image
  link?: string
  link_text?: string
}
