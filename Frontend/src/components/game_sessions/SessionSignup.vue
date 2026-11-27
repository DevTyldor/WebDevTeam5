
<script setup lang="ts">
import { ref } from 'vue'
import { useSessions } from '@/composables/useSession'

const {
    currentSession,
    seatsAvailable,
    confirmedCount,
    waitingSignups,
    currentSignup,
    isSignedUp,
    signup,
    cancelSignup
} = useSessions()

// Temporary catalogue IDs; replace with real game IDs.
const selectedGame = ref<number | ''>('')
</script>

<template>
    <div class="session-signup-page">
        <main class="container">
            <section v-if="currentSession">
                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>{{ currentSession.name }}</h3>
                            <p><strong>Host:</strong> {{ currentSession.host }}</p>
                            <p><strong>Date:</strong> {{ currentSession.date }}</p>
                            <p><strong>Time:</strong> {{ currentSession.time }}</p>
                            <p><strong>Place:</strong> {{ currentSession.place }}</p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover">
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

                    <p v-if="currentSession.status === 'Cancelled'">
                        This session has been cancelled.
                    </p>

                    <p v-else-if="seatsAvailable > 0">
                        {{ seatsAvailable }} seats available
                    </p>

                    <p v-else>
                        No seats available. You can join the waiting list.
                    </p>
                </div>

                <div
                    v-if="waitingSignups.length > 0"
                    class="card"
                >
                    <h3>Waiting list</h3>
                    <p>{{ waitingSignups.length }} member(s) waiting</p>

                    <ol>
                        <li
                            v-for="(signupEntry, index) in waitingSignups"
                            :key="signupEntry.id"
                        >
                            {{ index + 1 }}. {{ signupEntry.memberId }}
                        </li>
                    </ol>
                </div>

                <div
                    v-if="!isSignedUp && currentSession.status !== 'Cancelled'"
                    class="card card-hover"
                >
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>Bring a game</h3>

                            <select
                                v-model="selectedGame"
                                name="game"
                                id="game"
                            >
                                <option value="">I won't bring a game</option>
                                <option :value="1">Catan</option>
                                <option :value="2">Gloomhaven</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div
                    v-if="currentSignup"
                    class="card"
                >
                    <h3>Your signup</h3>

                    <p>
                        Status:
                        <strong>{{ currentSignup.status }}</strong>
                    </p>

                    <p v-if="currentSignup.status === 'Confirmed'">
                        You have a confirmed seat!
                    </p>

                    <p v-else>
                        You are on the waiting list. You'll be promoted
                        automatically when a seat becomes available.
                    </p>
                </div>

                <div class="flex gap-sm">
                    <button
                        v-if="!isSignedUp && currentSession.status !== 'Cancelled'"
                        type="button"
                        class="btn btn-primary"
                        @click="signup(
                            selectedGame === '' ? undefined : selectedGame
                        )"
                    >
                        {{ seatsAvailable > 0 ? 'Sign up' : 'Join waiting list' }}
                    </button>

                    <button
                        v-if="isSignedUp"
                        type="button"
                        class="btn btn-danger"
                        @click="cancelSignup"
                    >
                        Cancel signup
                    </button>

                    <RouterLink
                        v-else
                        :to="`/view-session/${currentSession.id}`"
                        class="btn btn-secondary"
                    >
                        Back to session
                    </RouterLink>
                </div>
            </section>

            <section v-else>
                <h2>Session not found</h2>
                <RouterLink to="/sessions" class="btn btn-primary">
                    Return to sessions
                </RouterLink>
            </section>
        </main>
    </div>
</template>
