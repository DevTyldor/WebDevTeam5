
<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
  owner: string;
  condition: string;
  available: boolean;
  canRequest?: boolean;
}>();

const emit = defineEmits<{
  request: [];
}>();
</script>

<template>
  <article class="card">
    <div class="game-box">
      <div class="game-icon">🎲</div>
      <div>
        <h3>{{ name }}</h3>
        <span
          class="badge"
          :class="available ? 'available' : 'loaned'"
        >
          {{ available ? "Beschikbaar" : "Uitgeleend" }}
        </span>
      </div>
    </div>

    <p><strong>Eigenaar:</strong> {{ owner }}</p>
    <p><strong>Conditie:</strong> {{ condition }}</p>
    <p>{{ description }}</p>

    <button
      v-if="available && canRequest"
      type="button"
      class="btn btn-primary"
      @click="emit('request')"
    >
      Aanvragen
    </button>
  </article>
</template>
