<script setup lang="ts">
import { ref } from 'vue'
import type { MemberWishlistItem } from '../../types/MemberWishlistItem'

defineProps<{
  item: MemberWishlistItem
}>()

const emit = defineEmits<{
  submit: [condition: string, message: string]
  cancel: []
}>()

const condition = ref<string>('New')
const message = ref<string>('')
const formError = ref<string | null>(null)

function handleSubmit() {
  if (message.value.trim() === '') {
    formError.value = 'Write a message for the member.'
    return
  }
  emit('submit', condition.value, message.value)
}
</script>

<template>
  <div class="card">
    <h3>Offer {{ item.game }} to {{ item.member }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="condition">Condition:</label>
        <select id="condition" v-model="condition">
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" v-model="message" rows="3"></textarea>
      </div>

      <p v-if="formError" class="error">{{ formError }}</p>

      <button type="submit" class="btn btn-primary">Send offer</button>
      <button type="button" class="btn btn-secondary" @click="emit('cancel')">Cancel</button>
    </form>
  </div>
</template>