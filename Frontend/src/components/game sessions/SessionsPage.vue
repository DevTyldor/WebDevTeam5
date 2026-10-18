
<script setup lang="ts">
import { useSessions } from '@/composables/useSession'

const { sessions } = useSessions()

function getConfirmedCount(session: typeof sessions.value[number]) {
    return session.signups.filter(
        signup => signup.status === 'Confirmed'
    ).length
}
</script>

<template>
    <div class="game-sessions-page">
        <main class="container">
            <section>
                <div class="section-title">
                    <div>
                        <h2>Upcoming sessions</h2>
                        <p class="subtitle">
                            Find a session to join or create your own
                        </p>
                    </div>

                    <div>
                        <RouterLink to="/new-session" class="btn btn-primary">
                            New Session
                        </RouterLink>
                    </div>
                </div>

                <div class="grid">
                    <div
                        v-for="session in sessions"
                        :key="session.id"
                        class="card card-hover"
                    >
                        <div class="game-box">
                            <div class="game-icon">🎲</div>

                            <div>
                                <h3>{{ session.name }}</h3>
                                <p><strong>Host:</strong> {{ session.host }}</p>
                                <p>
                                    {{ session.date }} • {{ session.time }} • {{ session.place }}
                                </p>
                            </div>
                        </div>

                        <p>
                            <span
                                class="badge"
                                :class="{
                                    approved: session.status === 'Open',
                                    rejected: session.status === 'Full'
                                        || session.status === 'Cancelled'
                                }"
                            >
                                {{ session.status }}
                            </span>
                            • {{ getConfirmedCount(session) }} / {{ session.capacity }} seats
                        </p>

                        <div class="flex gap-sm">
                            <RouterLink
                                :to="`/view-session/${session.id}`"
                                class="btn btn-primary"
                            >
                                View Details
                            </RouterLink>

                            <RouterLink
                                v-if="session.status !== 'Cancelled'"
                                :to="`/session-signup/${session.id}`"
                                class="btn btn-secondary"
                            >
                                Sign Up
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
