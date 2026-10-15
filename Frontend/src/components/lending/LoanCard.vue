<script setup lang="ts">
import StatusBadge from "./StatusBadge.vue";

defineProps<{
    boxName: string;
    borrower: string;
    startDate: string;
    endDate?: string;
    status: string;
}>();
</script>

<template>
    <div class="loan-card">
        <div class="loan-header">
            <h3>{{ boxName }}</h3>
            <StatusBadge :status="status" />
        </div>

        <p><strong>Lener:</strong> {{ borrower }}</p>
        <p><strong>Startdatum:</strong> {{ startDate }}</p>
        <p v-if="endDate"><strong>Einddatum:</strong> {{ endDate }}</p>

        <slot />
    </div>
</template>

<style scoped>
.loan-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.loan-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

h3 {
    margin: 0;
}

p {
    margin: 0.6rem 0 0;
}
</style>