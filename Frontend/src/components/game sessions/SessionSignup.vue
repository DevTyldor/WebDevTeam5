<script setup lang="ts">
import { ref } from 'vue'
import { useSessions } from '@/composables/useSession'

const {
    currentSession,
    seatsAvailable,
    isSignedUp,
    signup,
    cancelSignup
} = useSessions()

const selectedGame = ref('')
</script>

<template>
    <div class="edit-session-page">
        <main class="container">
            <section>
                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>{{ currentSession?.name }}</h3>
                            <p><strong>Host:</strong> {{ currentSession?.host }}</p>
                            <p><strong>Date:</strong> {{ currentSession?.date }}</p>
                            <p><strong>Time:</strong> {{ currentSession?.time }}</p>
                            <p><strong>Place:</strong> {{ currentSession?.place }}</p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
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

                            <span v-if="seatsAvailable > 0" class="badge approved">
                                {{ seatsAvailable }} seats available
                            </span>
                            <span v-else class="badge rejected">
                                No seats available
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    v-if="currentSession?.waitingList.length"
                    class="card"
                >
                    <h3>Waiting list</h3>
                    <p>{{ currentSession.waitingList.length }} member(s) waiting</p>

                    <ul>
                        <li
                            v-for="(member, index) in currentSession.waitingList"
                            :key="index"
                        >
                            {{ index + 1 }}. {{ member }}
                        </li>
                    </ul>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>Bring a game</h3>
                            <select v-model="selectedGame" name="game" id="game">
                                <option value="">I won't bring a game</option>
                                <option value="Catan">Catan</option>
                                <option value="Gloomhaven">Gloomhaven</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex gap-sm">
                <button
                    v-if="!isSignedUp && currentSession?.status !== 'Cancelled'"
                    class="btn btn-primary"
                    @click="signup(selectedGame)"
                >
                    {{ seatsAvailable > 0 ? 'Sign up' : 'Join waiting list' }}
                </button>

                <p v-else-if="isSignedUp">
                    You have successfully signed up!
                </p>

                <p v-else>
                    This session has been cancelled.
                </p>

                <button
                    type="button"
                    class="btn btn-danger"
                    @click="cancelSignup"
                >
                    {{ isSignedUp ? 'Cancel signup' : 'Back to session' }}
                </button>
            </div>
        </main>
    </div>
</template>