<script setup lang="ts">
import StatusBadge from "./StatusBadge.vue";

defineProps<{
    boxName: string;
    requester: string;
    requestDate: string;
    status: string;
}>();

const emit = defineEmits<{
    accept: [];
    reject: [];
}>();
</script>

<template>
    <div class="card card-hover">
        <div class="game-box">
            <div class="game-icon">📨</div>

            <div>
                <h3>{{ boxName }}</h3>
                <p><strong>Requested by:</strong> {{ requester }}</p>
                <p><strong>Request date:</strong> {{ requestDate }}</p>

                <p>
                    <strong>Status:</strong>
                    <StatusBadge :status="status" />
                </p>

                <div v-if="status.toLowerCase() === 'pending'" class="flex gap-sm">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="emit('accept')"
                    >
                        Accept
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="emit('reject')"
                    >
                        Reject
                    </button>
                </div>

                <slot />
            </div>
        </div>
    </div>
</template>