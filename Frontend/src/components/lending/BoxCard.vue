<script setup lang="ts">
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
                    <span
                        class="badge"
                        :class="available ? 'approved' : 'rejected'"
                    >
                        {{ available ? "Available" : "Lent out" }}
                    </span>
                </p>

                <slot />
            </div>
        </div>
    </div>
</template>