
<script setup lang="ts">
import { computed } from 'vue'
import { useSessions } from '@/composables/useSession'

const {
    currentSession,
    confirmedSignups,
    waitingSignups,
    confirmedCount
} = useSessions()

const gamesWithSuitability = computed(() => {
    return (currentSession.value?.games ?? []).map(game => ({
        ...game,
        enoughPlayers: confirmedCount.value >= game.minPlayers
    }))
})
</script>

<template>
    <div class="view-session-page">
        <main class="container">
            <section v-if="currentSession">
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
                            <h3>{{ currentSession.name }}</h3>
                            <p><strong>Host:</strong> {{ currentSession.host }}</p>
                            <p><strong>Date:</strong> {{ currentSession.date }}</p>
                            <p><strong>Time:</strong> {{ currentSession.time }}</p>
                            <p><strong>Place:</strong> {{ currentSession.place }}</p>
                            <p>{{ currentSession.description }}</p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover attendance-card">
                    <div>
                        <h4>Capacity</h4>
                        <p>
                            {{ confirmedCount }}/{{ currentSession.capacity }} Confirmed
                        </p>

                        <span
                            class="badge"
                            :class="{
                                approved: currentSession.status === 'Open',
                                rejected: currentSession.status === 'Full'
                                    || currentSession.status === 'Cancelled'
                            }"
                        >
                            {{ currentSession.status }}
                        </span>
                    </div>

                    <div class="section-divider">
                        <h4>Waiting list</h4>

                        <ol v-if="waitingSignups.length">
                            <li
                                v-for="signup in waitingSignups"
                                :key="signup.id"
                            >
                                {{ signup.memberId }}
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
                                    v-for="(game, index) in gamesWithSuitability"
                                    :key="`${game.name}-${index}`"
                                >
                                    {{ game.name }}
                                    ({{ game.minPlayers }}–{{ game.maxPlayers }} players)

                                    <span
                                        v-if="game.enoughPlayers"
                                        class="badge approved"
                                    >
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
                            <h4>Confirmed participants</h4>

                            <ol v-if="confirmedSignups.length">
                                <li
                                    v-for="signup in confirmedSignups"
                                    :key="signup.id"
                                >
                                    {{ signup.memberId }}

                                    <span v-if="signup.gameId">
                                        → Bringing game #{{ signup.gameId }}
                                    </span>
                                </li>
                            </ol>

                            <p v-else>No confirmed participants yet.</p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-sm">
                    <RouterLink
                        v-if="currentSession.status !== 'Cancelled'"
                        :to="`/session-signup/${currentSession.id}`"
                        class="btn btn-primary"
                    >
                        Sign up
                    </RouterLink>

                    <RouterLink
                        :to="`/edit-session/${currentSession.id}`"
                        class="btn btn-primary"
                    >
                        Edit session
                    </RouterLink>

                    <RouterLink
                        v-if="currentSession.status !== 'Cancelled'"
                        :to="`/cancel-session/${currentSession.id}`"
                        class="btn btn-danger"
                    >
                        Cancel session
                    </RouterLink>
                </div>
            </section>

            <section v-else>
                <h2>Session not found</h2>
                <RouterLink to="/sessions" class="btn btn-primary">
                    Return to sessions list
                </RouterLink>
            </section>
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
