export type RecordStatus = 'Not played yet' | 'In progress' | 'Played'

export interface Game {
  id: number
  title: string
}

export interface CollectionRecord {
  id: number
  owner: string
  gameId: number
  status: RecordStatus
  plays: number
  rating: number
  note: string
}

export interface Shelf {
  id: number
  owner: string
  name: string
  description: string
  isPublic: boolean
  gameIds: number[]
}
