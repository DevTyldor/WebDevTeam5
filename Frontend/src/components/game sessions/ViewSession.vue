<script setup lang="ts">
import { useSessions } from '@/composables/useSession'

const { currentSession } = useSessions()
</script>

<template>
    <div class="view-session-page">
        <main class="container">
            <section>
                <div class="section-title">
                    <div>
                        <h2>Session Details</h2>
                    </div>
                    <div>
                        <RouterLink to="/sessions" class="btn btn-primary">
                            Return to sessions list
                        </RouterLink>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <p><strong>Host:</strong> {{ currentSession?.host }}</p>
                            <p><strong>Date:</strong> {{ currentSession?.date }}</p>
                            <p><strong>Time:</strong> {{ currentSession?.time }}</p>
                            <p><strong>Place:</strong> {{ currentSession?.place }}</p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover attendance-card">
                    <div>
                        <h4>Capacity</h4>
                        <p>
                            {{ currentSession?.confirmed }}/{{ currentSession?.capacity }} Confirmed
                        </p>

                        <span
                            class="badge"
                            :class="currentSession?.status === 'Open' ? 'approved' : 'rejected'"
                        >
                            {{ currentSession?.status }}
                        </span>
                    </div>

                    <div class="section-divider">
                        <h4>Waiting list</h4>

                        <ol v-if="currentSession?.waitingList.length">
                            <li
                                v-for="person in currentSession.waitingList"
                                :key="person"
                            >
                                {{ person }}
                            </li>
                        </ol>

                        <p v-else>No one is currently on the waiting list.</p>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div>
                            <h4>Games</h4>
                            <ul>
                                <li
                                    v-for="game in currentSession?.games"
                                    :key="game.name"
                                >
                                    {{ game.name }}
                                    ({{ game.minPlayers }}–{{ game.maxPlayers }} players)

                                    <span v-if="game.enoughPlayers" class="badge approved">
                                        ✓ Enough players
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div>
                            <h4>Participants</h4>
                            <ol>
                                <li
                                    v-for="participant in currentSession?.participants"
                                    :key="participant.name"
                                >
                                    {{ participant.name }}
                                    <span v-if="participant.game">
                                        → {{ participant.game }}
                                    </span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex gap-sm">
                <RouterLink
                    :to="`/session-signup/${currentSession?.id}`"
                    class="btn btn-primary"
                >
                    Sign up
                </RouterLink>

                <RouterLink
                    :to="`/edit-session/${currentSession?.id}`"
                    class="btn btn-primary"
                >
                    Edit session
                </RouterLink>

                <RouterLink
                    :to="`/cancel-session/${currentSession?.id}`"
                    class="btn btn-danger"
                >
                    Cancel session
                </RouterLink>
            </div>
        </main>
    </div>
</template>

<style scoped>
.attendance-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.section-divider {
    padding-left: 2rem;
    border-left: 1px solid #ddd;
}
</style>