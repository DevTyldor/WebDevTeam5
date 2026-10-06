<script setup lang="ts">
import { mockSessions } from '@/data/mockSessions'

const sessions = mockSessions;
</script>

<template>
    <div class="game-sessions-page">
        <header>
            <div class="header-inner">
                <h1>Game Sessions</h1>
                <p>Browse and join upcoming board game sessions</p>
            </div>
        </header>

        <main class="container">
            <section>
                <div class="section-title">
                    <div>
                        <h2>Upcoming sessions</h2>
                        <p class="subtitle">Find a session to join or create your own</p>
                    </div>
                    <div>
                        <a href="new-session" class="btn btn-primary">New Session</a>
                    </div>
                </div>

                <div class="grid">
                    <div v-for="session in sessions" :key="session.id" class="card card-hover">
                        <div class="game-box">
                            <div class="game-icon">🎲</div>

                            <div>
                                <h3>{{ session.name }}</h3>
                                <p>Host: {{ session.host }}</p>
                                <p>
                                    {{ session.date }} • {{ session.time }} • {{ session.place }}
                                </p>
                            </div>
                        </div>
                        <p>
                            <span class="badge" :class="session.status === 'Open' ? 'approved' : 'rejected'">
                                {{ session.status }}
                            </span> • {{ session.confirmed }} / {{ session.capacity }} seats
                        </p>
                        <div class="flex gap-sm">
                            <RouterLink :to="`/view-session/${session.id}`" class="btn btn-primary">
                                View Details
                            </RouterLink>

                            <RouterLink :to="`/session-signup/${session.id}`" class="btn btn-secondary">
                                Sign Up
                            </RouterLink>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    </div>
</template>