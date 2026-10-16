<script setup lang="ts">
import StatusBadge from "./StatusBadge.vue";

defineProps<{
    boxName: string;
    borrower: string;
    startDate: string;
    endDate: string;
    status: string;
}>();
</script>

<template>
    <div class="card card-hover">
        <div class="game-box">
            <div class="game-icon">📦</div>

            <div>
                <h3>{{ boxName }}</h3>
                <p><strong>Borrower:</strong> {{ borrower }}</p>
                <p><strong>Start date:</strong> {{ startDate }}</p>
                <p><strong>Return date:</strong> {{ endDate }}</p>

                <p>
                    <strong>Status:</strong>
                    <StatusBadge :status="status" />
                </p>

                <slot />
            </div>
        </div>
    </div>
</template>