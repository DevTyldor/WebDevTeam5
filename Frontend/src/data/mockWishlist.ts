// AI generated mock data for wishlist, received offers, member wishlists, and sent offers

import type { WishlistItem } from '../types/WishlistItem'
import type { MemberWishlistItem } from '../types/MemberWishlistItem'
import type { ReceivedOffer } from '../types/ReceivedOffer'
import type { SentOffer } from '../types/SentOffer'

export const starterWishlist: WishlistItem[] = [
  { id: 1, game: 'Hotels', priority: 'High', note: 'I\'m looking for the newest edition' },
  { id: 2, game: 'Monopoly Classic', priority: 'Low', note: 'Only the base box' },
  { id: 3, game: 'Risk', priority: 'Low', note: 'Any edition is fine' },
]

export const starterReceivedOffers: ReceivedOffer[] = [
  { id: 1, game: 'Hotels', offeredBy: 'User123', condition: 'New', message: 'I have a new copy of Hotels, would you like to trade?', status: 'Pending' },
  { id: 2, game: 'Monopoly Classic', offeredBy: 'User456', condition: 'Used', message: 'I have a used copy of Monopoly Classic, are you interested?', status: 'Pending' },
]

export const starterMemberWishlists: MemberWishlistItem[] = [
  { id: 1, game: 'Catan', priority: 'High', note: 'Looking for the base game only', member: 'User789' },
  { id: 2, game: 'Cluedo', priority: 'Medium', note: 'Any edition is fine', member: 'User321' },
]

export const starterSentOffers: SentOffer[] = [
  { id: 1, game: 'Catan', offeredTo: 'User789', condition: 'New', message: 'I have a new copy of Catan, would you like to trade?', status: 'Pending' },
  { id: 2, game: 'Cluedo', offeredTo: 'User321', condition: 'Used', message: 'I have a used copy of Cluedo, are you interested?', status: 'Accepted' },
]