<script setup lang="ts">
import { ref, watch } from 'vue'
import type { WishlistItem } from '../../types/WishlistItem'

const props = defineProps<{
  games: string[]
  editingItem: WishlistItem | null
}>()

const emit = defineEmits<{
  add: [game: string, priority: string, note: string]
  update: [item: WishlistItem]
  cancel: []
}>()

const game = ref<string>('')
const priority = ref<string>('Medium')
const note = ref<string>('')
const formError = ref<string | null>(null)

watch(() => props.editingItem, (item) => {
  if (item) {
    game.value = item.game
    priority.value = item.priority
    note.value = item.note
  } else {
    game.value = ''
    priority.value = 'Medium'
    note.value = ''
  }
}, { immediate: true })

function handleSubmit() {
  if (game.value === '' || note.value.trim() === '') {
    formError.value = 'Choose a game and write a note.'
    return
  }
  formError.value = null

  if (props.editingItem) {
    const updated: WishlistItem = {
      id: props.editingItem.id,
      game: game.value,
      priority: priority.value,
      note: note.value,
    }
    emit('update', updated)
  } else {
    emit('add', game.value, priority.value, note.value)
    game.value = ''
    priority.value = 'Medium'
    note.value = ''
  }
}
</script>

<template>
  <div class="card">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="game">Game from collection:</label>
        <select id="game" v-model="game">
          <option value="">-- choose a game --</option>
          <option v-for="title in games" :key="title" :value="title">{{ title }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="priority">Priority:</label>
        <select id="priority" v-model="priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div class="form-group">
        <label for="note">Note (edition, condition):</label>
        <textarea id="note" v-model="note" rows="3"></textarea>
      </div>

      <p v-if="formError" class="error">{{ formError }}</p>

      <button type="submit" class="btn btn-primary">
        {{ editingItem ? 'Save changes' : 'Add to Wishlist' }}
      </button>
      <button v-if="editingItem" type="button" class="btn btn-secondary" @click="emit('cancel')">
        Cancel
      </button>
    </form>
  </div>
</template>