<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import StatusBadge from "../../components/wishlist/StatusBadge.vue";
import { useWishlist } from "../../composables/useWishlist";
import type {
  WishlistItem,
  MemberWishlistItem,
} from "../../composables/useWishlist";

const {
  games,
  wishlist,
  receivedOffers,
  memberWishlists,
  sentOffers,
  wishlistCount,
  pendingOfferCount,
  addItem: addToWishlist,
  updateItem: updateInWishlist,
  deleteItem,
  acceptOffer,
  declineOffer,
  makeOffer,
  lastSaved,
} = useWishlist();

// Wishlist form
const newGame = ref<string>("");
const newPriority = ref<string>("Medium");
const newNote = ref<string>("");
const formError = ref<string | null>(null);
const editingId = ref<number | null>(null);

function addItem() {
  if (newGame.value === "" || newNote.value.trim() === "") {
    formError.value = "Choose a game and write a note.";
    return;
  }
  addToWishlist(newGame.value, newPriority.value, newNote.value);
  resetForm();
}

function updateItem() {
  if (newGame.value === "" || newNote.value.trim() === "") {
    formError.value = "Choose a game and write a note.";
    return;
  }
  if (editingId.value !== null) {
    updateInWishlist(
      editingId.value,
      newGame.value,
      newPriority.value,
      newNote.value,
    );
  }
  resetForm();
}

function startEditing(item: WishlistItem) {
  editingId.value = item.id;
  newGame.value = item.game;
  newPriority.value = item.priority;
  newNote.value = item.note;
}

function resetForm() {
  editingId.value = null;
  newGame.value = "";
  newPriority.value = "Medium";
  newNote.value = "";
  formError.value = null;
}

// Offer form
const offeringItem = ref<MemberWishlistItem | null>(null);
const offerCondition = ref<string>("New");
const offerMessage = ref<string>("");
const offerError = ref<string | null>(null);

function startOffer(item: MemberWishlistItem) {
  offeringItem.value = item;
  offerCondition.value = "New";
  offerMessage.value = "";
  offerError.value = null;
}

function sendOffer() {
  if (offerMessage.value.trim() === "") {
    offerError.value = "Write a message for the member.";
    return;
  }
  if (offeringItem.value) {
    makeOffer(offeringItem.value, offerCondition.value, offerMessage.value);
  }
  cancelOffer();
}

function cancelOffer() {
  offeringItem.value = null;
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === "Escape") {
    resetForm();
    cancelOffer();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
});
</script>

<template>
  <section>
    <div class="section-title">
      <div>
        <h2>My wishlist</h2>
        <p class="subtitle">Games you'd like to own ({{ wishlistCount }})</p>
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
            <td>
              <strong>{{ item.game }}</strong>
            </td>
            <td><StatusBadge :label="item.priority" /></td>
            <td>{{ item.note }}</td>
            <td>
              <div class="flex gap-sm">
                <button class="btn btn-primary" @click="startEditing(item)">
                  Edit
                </button>
                <button class="btn btn-secondary" @click="deleteItem(item.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <div class="section-title">
      <div>
        <h2>{{ editingId ? "Edit wishlist game" : "Add game to wishlist" }}</h2>
        <p class="subtitle">Add a game to your wishlist</p>
      </div>
    </div>
    <div class="card">
      <form @submit.prevent="editingId ? updateItem() : addItem()">
        <div class="form-group">
          <label for="game">Game from collection:</label>
          <select id="game" v-model="newGame">
            <option value="">-- choose a game --</option>
            <option v-for="title in games" :key="title" :value="title">
              {{ title }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="priority">Priority:</label>
          <select id="priority" v-model="newPriority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div class="form-group">
          <label for="note">Note (edition, condition):</label>
          <textarea id="note" v-model="newNote" rows="3"></textarea>
        </div>

        <p v-if="formError" class="error">{{ formError }}</p>

        <button type="submit" class="btn btn-primary">
          {{ editingId ? "Save changes" : "Add to Wishlist" }}
        </button>
        <button v-if="editingId" type="button" class="btn btn-secondary" @click="resetForm"> Cancel </button>
      </form>
    </div>
  </section>

  <section>
    <div class="section-title">
      <div>
        <h2>Offers to my wishlist</h2>
        <p class="subtitle">
          Offers from other users for games on your wishlist ({{
            pendingOfferCount
          }}
          waiting)
        </p>
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
            <td>
              <strong>{{ offer.game }}</strong>
            </td>
            <td>{{ offer.offeredBy }}</td>
            <td><StatusBadge :label="offer.condition" /></td>
            <td>{{ offer.message }}</td>
            <td>
              <div v-if="offer.status === 'Pending'" class="flex gap-sm">
                <button class="btn btn-primary" @click="acceptOffer(offer.id)">
                  Accept
                </button>
                <button
                  class="btn btn-secondary"
                  @click="declineOffer(offer.id)"
                >
                  Decline
                </button>
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
        <p class="subtitle">
          Make an offer for a game another member is looking for
        </p>
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
            <td>
              <strong>{{ item.game }}</strong>
            </td>
            <td><StatusBadge :label="item.priority" /></td>
            <td>{{ item.note }}</td>
            <td>{{ item.member }}</td>
            <td>
              <button class="btn btn-primary" @click="startOffer(item)">
                Make Offer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="offeringItem" class="card">
      <h3>Offer {{ offeringItem.game }} to {{ offeringItem.member }}</h3>
      <form @submit.prevent="sendOffer">
        <div class="form-group">
          <label for="condition">Condition:</label>
          <select id="condition" v-model="offerCondition">
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" v-model="offerMessage" rows="3"></textarea>
        </div>

        <p v-if="offerError" class="error">{{ offerError }}</p>

        <button type="submit" class="btn btn-primary">Send offer</button>
        <button type="button" class="btn btn-secondary" @click="cancelOffer">
          Cancel
        </button>
      </form>
    </div>
  </section>

  <section>
    <div class="section-title">
      <div>
        <h2>My offers to other's wishlists</h2>
        <p class="subtitle">
          See the offers you've made to other members' wishlists
        </p>
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
            <td>
              <strong>{{ offer.game }}</strong>
            </td>
            <td>{{ offer.offeredTo }}</td>
            <td>{{ offer.condition }}</td>
            <td>{{ offer.message }}</td>
            <td><StatusBadge :label="offer.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <p v-if="lastSaved">Last saved: {{ lastSaved }}</p>
</template>
