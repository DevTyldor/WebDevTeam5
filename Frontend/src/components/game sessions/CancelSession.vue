<script setup lang="ts">
import { useSessions } from '@/composables/useSession'

const {
    currentSession,
    cancelSession,
    goToSessions
} = useSessions()
</script>

<template>
    <div class="cancel-session-page">
        <main class="container">
            <section>
                <div class="section-title">
                    <div>
                        <h2>Cancel session</h2>
                        <p class="subtitle">
                            Are you sure you want to cancel this session?
                        </p>
                    </div>
                </div>

                <div v-if="currentSession" class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>{{ currentSession.name }}</h3>
                            <p><strong>Host:</strong> {{ currentSession.host }}</p>
                            <p><strong>Date:</strong> {{ currentSession.date }}</p>
                            <p><strong>Time:</strong> {{ currentSession.time }}</p>
                            <p><strong>Place:</strong> {{ currentSession.place }}</p>

                            <p>
                                <span
                                    class="badge"
                                    :class="currentSession.status === 'Cancelled'
                                        ? 'rejected'
                                        : 'approved'"
                                >
                                    {{ currentSession.status }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <p v-else class="error">Session not found.</p>

                <div class="flex gap-sm">
                    <button
                        type="button"
                        class="btn btn-danger"
                        :disabled="!currentSession || currentSession.status === 'Cancelled'"
                        @click="cancelSession"
                    >
                        Cancel session
                    </button>

                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="goToSessions"
                    >
                        Back to sessions
                    </button>
                </div>
            </section>
        </main>
    </div>
</template>