<script setup lang="ts">
import type { ReceivedOffer } from '../../types/ReceivedOffer'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  offers: ReceivedOffer[]
}>()

const emit = defineEmits<{
  accept: [id: number]
  decline: [id: number]
}>()
</script>

<template>
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
        <tr v-if="offers.length === 0">
          <td colspan="5">No offers yet.</td>
        </tr>
        <tr v-for="offer in offers" :key="offer.id">
          <td><strong>{{ offer.game }}</strong></td>
          <td>{{ offer.offeredBy }}</td>
          <td><StatusBadge :label="offer.condition" /></td>
          <td>{{ offer.message }}</td>
          <td>
            <div v-if="offer.status === 'Pending'" class="flex gap-sm">
              <button class="btn btn-primary" @click="emit('accept', offer.id)">Accept</button>
              <button class="btn btn-secondary" @click="emit('decline', offer.id)">Decline</button>
            </div>
            <StatusBadge v-else :label="offer.status" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>