import { ref, computed } from 'vue'


export interface WishlistItem {
  id: number
  game: string
  priority: string
  note: string
}

export interface MemberWishlistItem {
  id: number
  game: string
  priority: string
  note: string
  member: string
}

export interface ReceivedOffer {
  id: number
  game: string
  offeredBy: string
  condition: string
  message: string
  status: string
}

export interface SentOffer {
  id: number
  game: string
  offeredTo: string
  condition: string
  message: string
  status: string
}

export function useWishlist() {

const wishlist = ref<WishlistItem[]>([
  { id: 1, game: 'Hotels', priority: 'High', note: 'English edition' },
  { id: 2, game: 'Monopoly Classic', priority: 'Low', note: 'Only the base box' },
])

const receivedOffers = ref<ReceivedOffer[]>([
  { id: 1, game: 'Hotels', offeredBy: 'User123', condition: 'New', message: 'I have a new copy of Hotels, would you like to trade?', status: 'Pending' },
  { id: 2, game: 'Monopoly Classic', offeredBy: 'User456', condition: 'Used', message: 'I have a used copy of Monopoly Classic, are you interested?', status: 'Pending' },
])

const memberWishlists = ref<MemberWishlistItem[]>([
  { id: 1, game: 'Catan', priority: 'High', note: 'Looking for the base game only', member: 'User789' },
  { id: 2, game: 'Cluedo', priority: 'Medium', note: 'Any edition is fine', member: 'User321' },
])

const sentOffers = ref<SentOffer[]>([
  { id: 1, game: 'Catan', offeredTo: 'User789', condition: 'New', message: 'I have a new copy of Catan, would you like to trade?', status: 'Pending' },
  { id: 2, game: 'Cluedo', offeredTo: 'User321', condition: 'Used', message: 'I have a used copy of Cluedo, are you interested?', status: 'Accepted' },
])

const games = [
    'Hotels',
    'Monopoly Classic',
    'Catan',
    'Cluedo',
]

const wishlistCount = computed(() => {
    return wishlist.value.length
})

const pendingOfferCount = computed (() => {
    return receivedOffers.value.filter(offer => offer.status === 'Pending').length
})

function addItem(game: string, priority: string, note: string) {
    const newItem: WishlistItem = {
      id: Date.now(),
      game,
      priority,
      note,
    }
    wishlist.value.push(newItem)
  }

function updateItem(id: number, game: string, priority: string, note: string) {
    const item = wishlist.value.find(i => i.id === id)
    if (item) {
      item.game = game
      item.priority = priority
      item.note = note
    }
  }

function deleteItem(id: number) {
    wishlist.value = wishlist.value.filter(i => i.id !== id)
  }

function acceptOffer(id: number) {
    const offer = receivedOffers.value.find(o => o.id === id)
    if (offer) {
      offer.status = 'Accepted'
    }
  }

function declineOffer(id: number) {
    const offer = receivedOffers.value.find(o => o.id === id)
    if (offer) {
      offer.status = 'Declined'
    }
  }

function makeOffer(item: MemberWishlistItem, condition: string, message: string) {
    const newOffer: SentOffer = {
      id: Date.now(),
      game: item.game,
      offeredTo: item.member,
      condition,
      message,
      status: 'Pending',
    }
    sentOffers.value.push(newOffer)
  }

return {
    games,
    wishlist,
    receivedOffers,
    memberWishlists,
    sentOffers,
    wishlistCount,
    pendingOfferCount,
    addItem,
    updateItem,
    deleteItem,
    acceptOffer,
    declineOffer,
    makeOffer,
  }
}