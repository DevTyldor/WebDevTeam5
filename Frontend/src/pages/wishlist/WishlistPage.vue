<script setup lang="ts">
import { ref } from 'vue'
import StatusBadge from '../../components/wishlist/StatusBadge.vue'

interface WishlistItem {
  id: number
  game: string
  priority: string
  note: string
}

interface MemberWishlistItem {
  id: number
  game: string
  priority: string
  note: string
  member: string
}

interface ReceivedOffer {
  id: number
  game: string
  offeredBy: string
  condition: string
  message: string
  status: string
}

interface SentOffer {
  id: number
  game: string
  offeredTo: string
  condition: string
  message: string
  status: string
}

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
</script>

<template>
  <section>
    <div class="section-title">
      <div>
        <h2>My wishlist</h2>
        <p class="subtitle">Games you'd like to own</p>
      </div>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Priority</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="wishlist.length === 0">
            <td colspan="4">Your wishlist is empty.</td>
          </tr>
          <tr v-for="item in wishlist" :key="item.id">
            <td><strong>{{ item.game }}</strong></td>
            <td><StatusBadge :label="item.priority" /></td>
            <td>{{ item.note }}</td>
            <td>
              <button class="btn btn-secondary" @click="deleteItem(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>


  <section>
    <div class="section-title">
      <div>
        <h2>Offers to my wishlist</h2>
        <p class="subtitle">Offers from other users for games on your wishlist</p>
      </div>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Offered by</th>
            <th>Condition</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="offer in receivedOffers" :key="offer.id">
            <td><strong>{{ offer.game }}</strong></td>
            <td>{{ offer.offeredBy }}</td>
            <td><StatusBadge :label="offer.condition" /></td>
            <td>{{ offer.message }}</td>
            <td>
              <div v-if="offer.status === 'Pending'" class="flex gap-sm">
                <button class="btn btn-primary" @click="acceptOffer(offer.id)">Accept</button>
                <button class="btn btn-secondary" @click="declineOffer(offer.id)">Decline</button>
              </div>
              <StatusBadge v-else :label="offer.status" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <div class="section-title">
      <div>
        <h2>Other members' wishlists</h2>
        <p class="subtitle">Make an offer for a game another member is looking for</p>
      </div>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Priority</th>
            <th>Note</th>
            <th>Member</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in memberWishlists" :key="item.id">
            <td><strong>{{ item.game }}</strong></td>
            <td><StatusBadge :label="item.priority" /></td>
            <td>{{ item.note }}</td>
            <td>{{ item.member }}</td>
            <td><button class="btn btn-primary">Make Offer</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <div class="section-title">
      <div>
        <h2>My offers to other's wishlists</h2>
        <p class="subtitle">See the offers you've made to other members' wishlists</p>
      </div>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Offered to</th>
            <th>Condition</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="offer in sentOffers" :key="offer.id">
            <td><strong>{{ offer.game }}</strong></td>
            <td>{{ offer.offeredTo }}</td>
            <td>{{ offer.condition }}</td>
            <td>{{ offer.message }}</td>
            <td><StatusBadge :label="offer.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>