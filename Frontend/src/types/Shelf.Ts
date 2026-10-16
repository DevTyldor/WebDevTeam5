export interface Shelf {
  id: number
  owner: string
  name: string
  description: string
  isPublic: boolean
  gameIds: number[]
}
