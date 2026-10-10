import { ref, computed, watch } from 'vue'
import type { Game, CollectionRecord, RecordStatus, Shelf } from '../types/Collection'
import { mockGames, mockRecords, mockShelves } from '../data/mockCollection'

const me = 'Stefano'

const games = ref<Game[]>(mockGames)
const records = ref<CollectionRecord[]>(JSON.parse(localStorage.getItem('collectionRecords') || JSON.stringify(mockRecords)))
const shelves = ref<Shelf[]>(JSON.parse(localStorage.getItem('collectionShelves') || JSON.stringify(mockShelves)))

watch(records, (latest) => {
  localStorage.setItem('collectionRecords', JSON.stringify(latest))
}, { deep: true })

watch(shelves, (latest) => {
  localStorage.setItem('collectionShelves', JSON.stringify(latest))
}, { deep: true })

export function useCollection() {
  const myGames = computed(() => {
    return records.value.filter(r => r.owner === me)
  })

  const myShelves = computed(() => {
    return shelves.value.filter(s => s.owner === me)
  })

  const tooManyInProgress = computed(() => {
    const inProgress = myGames.value.filter(r => r.status === 'In progress')
    return inProgress.length >= 3
  })

  function getTitle(gameId: number) {
    const game = games.value.find(g => g.id === gameId)
    if (game) {
      return game.title
    }
    return ''
  }

  function hasGame(gameId: number) {
    return myGames.value.some(r => r.gameId === gameId)
  }

  function addGame(gameId: number, status: RecordStatus, note: string) {
    const newRecord: CollectionRecord = {
      id: Date.now(),
      owner: me,
      gameId,
      status,
      plays: 0,
      rating: 0,
      note
    }
    records.value.push(newRecord)
  }

  function removeGame(id: number) {
    const record = records.value.find(r => r.id === id)
    if (record) {
      for (const shelf of myShelves.value) {
        shelf.gameIds = shelf.gameIds.filter(gameId => gameId !== record.gameId)
      }
    }
    records.value = records.value.filter(r => r.id !== id)
  }

  function addPlay(id: number) {
    const record = records.value.find(r => r.id === id)
    if (record) {
      record.plays++
      record.status = 'Played'
    }
  }

  function rateGame(id: number, rating: number) {
    const record = records.value.find(r => r.id === id)
    if (record) {
      record.rating = rating
    }
  }

  function getShelf(id: number) {
    return shelves.value.find(s => s.id === id)
  }

  function getShelfGames(id: number) {
    const shelf = getShelf(id)
    if (!shelf) {
      return []
    }
    return records.value.filter(r => r.owner === shelf.owner && shelf.gameIds.includes(r.gameId))
  }

  function addShelf(name: string, description: string, isPublic: boolean) {
    const newShelf: Shelf = {
      id: Date.now(),
      owner: me,
      name,
      description,
      isPublic,
      gameIds: []
    }
    shelves.value.push(newShelf)
  }

  function deleteShelf(id: number) {
    shelves.value = shelves.value.filter(s => s.id !== id)
  }

  function addToShelf(shelfId: number, gameId: number) {
    const shelf = getShelf(shelfId)
    if (shelf && !shelf.gameIds.includes(gameId)) {
      shelf.gameIds.push(gameId)
    }
  }

  function removeFromShelf(shelfId: number, gameId: number) {
    const shelf = getShelf(shelfId)
    if (shelf) {
      shelf.gameIds = shelf.gameIds.filter(id => id !== gameId)
    }
  }

  return {
    me,
    games,
    myGames,
    myShelves,
    tooManyInProgress,
    getTitle,
    hasGame,
    addGame,
    removeGame,
    addPlay,
    rateGame,
    getShelf,
    getShelfGames,
    addShelf,
    deleteShelf,
    addToShelf,
    removeFromShelf
  }
}
