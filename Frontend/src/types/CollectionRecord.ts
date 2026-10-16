export type RecordStatus = 'Not played yet' | 'In progress' | 'Played'

export interface CollectionRecord {
  id: number
  owner: string
  gameId: number
  status: RecordStatus
  plays: number
  rating: number
  note: string
}
