<script setup lang="ts">
import type { MemberWishlistItem } from '../../types/MemberWishlistItem'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  items: MemberWishlistItem[]
}>()

const emit = defineEmits<{
  offer: [item: MemberWishlistItem]
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
          <th>Member</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td><strong>{{ item.game }}</strong></td>
          <td><StatusBadge :label="item.priority" /></td>
          <td>{{ item.note }}</td>
          <td>{{ item.member }}</td>
          <td>
            <button class="btn btn-primary" @click="emit('offer', item)">Make Offer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>