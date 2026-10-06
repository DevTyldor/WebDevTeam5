<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { mockSessions } from '@/data/mockSessions'

const route = useRoute()

const session = computed(() => {
    return mockSessions.find(
        session => session.id === Number(route.params.id)
    )
})
</script>

<template>
    <div class="view-session-page">

        <head>
            <title>{{ session?.name }} – Session Details</title>
            <link rel="stylesheet" href="../stylesheet/style.css">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <header>
            <div class="header-inner">
                <h1>{{ session?.name }}</h1>
                <p>View information about the session Friday Board Games</p>
            </div>
        </header>


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
                            <p>Host: {{ session?.host }}</p>
                            <p>Date: {{ session?.date }}</p>
                            <p>Time: {{ session?.time }}</p>
                            <p>Place: {{ session?.place }}</p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover attendance-card">
                    <div>
                        <h4>Capacity</h4>
                        <p>{{ session?.confirmed }}/{{ session?.capacity }} Confirmed</p>
                        <span class="badge" :class="session?.status === 'Open' ? 'approved' : 'rejected'">
                            {{ session?.status }}
                        </span>
                    </div>

                    <div class="section-divider">
                        <h4>Waiting list</h4>
                        <ol v-if="session?.waitingList.length">
                            <li v-for="person in session.waitingList" :key="person">
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
                                <li v-for="game in session?.games" :key="game.name">
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
                                <li v-for="participant in session?.participants" :key="participant.name">
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
                <RouterLink :to="`/session-signup/${session?.id}`" class="btn btn-primary">
                    Sign up
                </RouterLink>
                <RouterLink :to="`/edit-session/${session?.id}`" class="btn btn-primary">Edit session</RouterLink>
                <RouterLink :to="`/cancel-session/${session?.id}`" class="btn btn-danger">Cancel session</RouterLink>
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