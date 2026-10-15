<script setup lang="ts">
import StatusBadge from "./StatusBadge.vue";

defineProps<{
    name: string;
    description: string;
    owner: string;
    available: boolean;
}>();
</script>

<template>
    <div class="card card-hover">
        <div class="game-box">
            <div class="game-icon">📦</div>

            <div>
                <h3>{{ name }}</h3>
                <p>{{ description }}</p>
                <p><strong>Owner:</strong> {{ owner }}</p>

                <p>
                    <strong>Status:</strong>
                    <StatusBadge
                        :status="available ? 'Available' : 'Lent out'"
                    />
                </p>
            </div>
        </div>
    </div>
</template>