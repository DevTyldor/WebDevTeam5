import { ref, computed, watch } from 'vue'
import type { WishlistItem } from '../types/WishlistItem'
import type { MemberWishlistItem } from '../types/MemberWishlistItem'
import type { ReceivedOffer } from '../types/ReceivedOffer'
import type { SentOffer } from '../types/SentOffer'


const wishlist = ref<WishlistItem[]>(JSON.parse(localStorage.getItem('wishlist') || '[]'))
const receivedOffers = ref<ReceivedOffer[]>(JSON.parse(localStorage.getItem('receivedOffers') || '[]'))
const memberWishlists = ref<MemberWishlistItem[]>(JSON.parse(localStorage.getItem('memberWishlists') || '[]'))
const sentOffers = ref<SentOffer[]>(JSON.parse(localStorage.getItem('sentOffers') || '[]'))


const lastSaved = ref<string | null>(null)

watch(wishlist, (latest) => {
  localStorage.setItem('wishlist', JSON.stringify(latest))
  lastSaved.value = new Date().toLocaleTimeString()
}, { deep: true })

watch(receivedOffers, (latest) => {
  localStorage.setItem('receivedOffers', JSON.stringify(latest))
  lastSaved.value = new Date().toLocaleTimeString()
}, { deep: true })

watch(memberWishlists, (latest) => {
  localStorage.setItem('memberWishlists', JSON.stringify(latest))
  lastSaved.value = new Date().toLocaleTimeString()
}, { deep: true })

watch(sentOffers, (latest) => {
  localStorage.setItem('sentOffers', JSON.stringify(latest))
  lastSaved.value = new Date().toLocaleTimeString()
}, { deep: true })

export function useWishlist() {

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

function updateItem(updated: WishlistItem) {
  const item = wishlist.value.find(i => i.id === updated.id)
  if (item) {
    item.game = updated.game
    item.priority = updated.priority
    item.note = updated.note
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
    lastSaved,
  }
}