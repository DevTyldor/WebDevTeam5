<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWishlist } from '../../composables/useWishlist'
import type { WishlistItem } from '../../types/WishlistItem'
import type { MemberWishlistItem } from '../../types/MemberWishlistItem'
import WishlistTable from '../../components/wishlist/WishlistTable.vue'
import WishlistForm from '../../components/wishlist/WishlistForm.vue'
import ReceivedOffersTable from '../../components/wishlist/ReceivedOffersTable.vue'
import MemberWishlistsTable from '../../components/wishlist/MemberWishlistsTable.vue'
import OfferForm from '../../components/wishlist/OfferForm.vue'
import SentOffersTable from '../../components/wishlist/SentOffersTable.vue'

const {
  games,
  wishlist,
  receivedOffers,
  memberWishlists,
  sentOffers,
  lastSaved,
  wishlistCount,
  pendingOfferCount,
  addItem,
  updateItem,
  deleteItem,
  acceptOffer,
  declineOffer,
  makeOffer,
} = useWishlist()

const editingItem = ref<WishlistItem | null>(null)
const offeringItem = ref<MemberWishlistItem | null>(null)

function startEditing(item: WishlistItem) {
  editingItem.value = item
}

function cancelEdit() {
  editingItem.value = null
}

function handleUpdate(item: WishlistItem) {
  updateItem(item)
  cancelEdit()
}

function startOffer(item: MemberWishlistItem) {
  offeringItem.value = item
}

function cancelOffer() {
  offeringItem.value = null
}

function handleOffer(condition: string, message: string) {
  if (offeringItem.value) {
    makeOffer(offeringItem.value, condition, message)
  }
  cancelOffer()
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    cancelEdit()
    cancelOffer()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div>
    <section>
      <div class="section-title">
        <div>
          <h2>My wishlist</h2>
          <p class="subtitle">Games you'd like to own ({{ wishlistCount }})</p>
        </div>
      </div>
      <WishlistTable :items="wishlist" @edit="startEditing" @delete="deleteItem" />
    </section>

    <section>
      <div class="section-title">
        <div>
          <h2>{{ editingItem ? 'Edit wishlist game' : 'Add game to wishlist' }}</h2>
          <p class="subtitle">Add a game to your wishlist</p>
        </div>
      </div>
      <WishlistForm
        :games="games"
        :editing-item="editingItem"
        @add="addItem"
        @update="handleUpdate"
        @cancel="cancelEdit"
      />
    </section>

    <section>
      <div class="section-title">
        <div>
          <h2>Offers to my wishlist</h2>
          <p class="subtitle">Offers from other users for games on your wishlist ({{ pendingOfferCount }} waiting)</p>
        </div>
      </div>
      <ReceivedOffersTable :offers="receivedOffers" @accept="acceptOffer" @decline="declineOffer" />
    </section>

    <section>
      <div class="section-title">
        <div>
          <h2>Other members' wishlists</h2>
          <p class="subtitle">Make an offer for a game another member is looking for</p>
        </div>
      </div>
      <MemberWishlistsTable :items="memberWishlists" @offer="startOffer" />
      <OfferForm v-if="offeringItem" :item="offeringItem" @submit="handleOffer" @cancel="cancelOffer" />
    </section>

    <section>
      <div class="section-title">
        <div>
          <h2>My offers to other's wishlists</h2>
          <p class="subtitle">See the offers you've made to other members' wishlists</p>
        </div>
      </div>
      <SentOffersTable :offers="sentOffers" />
    </section>

    <p v-if="lastSaved">Last saved: {{ lastSaved }}</p>
  </div>
</template>