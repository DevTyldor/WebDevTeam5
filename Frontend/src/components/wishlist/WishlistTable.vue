<script setup lang="ts">
import type { WishlistItem } from '../../types/WishlistItem'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  items: WishlistItem[]
}>()

const emit = defineEmits<{
  edit: [item: WishlistItem]
  delete: [id: number]
}>()
</script>

<template>
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
        <tr v-if="items.length === 0">
          <td colspan="4">Your wishlist is empty.</td>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td><strong>{{ item.game }}</strong></td>
          <td><StatusBadge :label="item.priority" /></td>
          <td>{{ item.note }}</td>
          <td>
            <div class="flex gap-sm">
              <button class="btn btn-primary" @click="emit('edit', item)">Edit</button>
              <button class="btn btn-secondary" @click="emit('delete', item.id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>