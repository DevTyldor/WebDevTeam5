<script setup lang="ts">
import type { SentOffer } from '../../types/SentOffer'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  offers: SentOffer[]
}>()
</script>

<template>
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
        <tr v-if="offers.length === 0">
          <td colspan="5">You haven't made any offers yet.</td>
        </tr>
        <tr v-for="offer in offers" :key="offer.id">
          <td><strong>{{ offer.game }}</strong></td>
          <td>{{ offer.offeredTo }}</td>
          <td>{{ offer.condition }}</td>
          <td>{{ offer.message }}</td>
          <td><StatusBadge :label="offer.status" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>