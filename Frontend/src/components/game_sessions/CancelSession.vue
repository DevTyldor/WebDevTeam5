
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
                            <template v-if="currentSession?.status === 'Cancelled'">
                                This session has already been cancelled.
                            </template>
                            <template v-else>
                                Are you sure you want to cancel this session?
                            </template>
                        </p>
                    </div>
                </div>

                <div v-if="currentSession" class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>

                        <div>
                            <h3>{{ currentSession.name }}</h3>
                            <p>
                                <strong>Host:</strong>
                                {{ currentSession.host }}
                            </p>
                            <p>
                                <strong>Date:</strong>
                                {{ currentSession.date }}
                            </p>
                            <p>
                                <strong>Time:</strong>
                                {{ currentSession.time }}
                            </p>
                            <p>
                                <strong>Place:</strong>
                                {{ currentSession.place }}
                            </p>

                            <p>
                                <span
                                    class="badge"
                                    :class="{
                                        rejected: currentSession.status === 'Cancelled',
                                        approved: currentSession.status !== 'Cancelled'
                                    }"
                                >
                                    {{ currentSession.status }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <p v-else class="error" role="alert">
                    Session not found.
                </p>

                <div class="flex gap-sm">
                    <button
                        v-if="currentSession && currentSession.status !== 'Cancelled'"
                        type="button"
                        class="btn btn-danger"
                        @click="cancelSession"
                    >
                        Confirm cancellation
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
