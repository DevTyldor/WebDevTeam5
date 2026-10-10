import type { Game, CollectionRecord, Shelf } from '../types/Collection'

export const mockGames: Game[] = [
  { id: 1, title: 'Halo 3' },
  { id: 2, title: 'Overwatch' },
  { id: 3, title: 'Fortnite' },
  { id: 4, title: 'Minecraft' },
  { id: 5, title: 'Mario Kart' },
]

export const mockRecords: CollectionRecord[] = [
  { id: 1, owner: 'Stefano', gameId: 1, status: 'Played', plays: 12, rating: 4, note: 'qwertyuiop' },
  { id: 2, owner: 'Stefano', gameId: 2, status: 'In progress', plays: 5, rating: 0, note: 'Test5' },
  { id: 3, owner: 'Stefano', gameId: 3, status: 'Not played yet', plays: 0, rating: 0, note: 'qwerty' },
  { id: 4, owner: 'qwerty', gameId: 4, status: 'Played', plays: 8, rating: 5, note: '' },
  { id: 5, owner: 'qwerty', gameId: 5, status: 'Not played yet', plays: 0, rating: 0, note: '' },
]

export const mockShelves: Shelf[] = [
  { id: 1, owner: 'Stefano', name: 'Test1', description: 'Desc1', isPublic: true, gameIds: [2, 1] },
  { id: 2, owner: 'Stefano', name: 'Test2', description: 'qwerty', isPublic: false, gameIds: [3] },
  { id: 3, owner: 'qwerty', name: 'Test3', description: 'Desc3', isPublic: true, gameIds: [4, 5] },
]
