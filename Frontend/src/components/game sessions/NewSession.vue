<script setup lang="ts">
import { ref } from 'vue'
import { useSessions } from '@/composables/useSession'

const {
    createSession,
    goToSessions
} = useSessions()

const sessionName = ref('')
const sessionDate = ref('')
const sessionTime = ref('')
const sessionPlace = ref('club')
const sessionCapacity = ref<number | null>(null)

const error = ref('')

function submitSession() {
    error.value = createSession({
        name: sessionName.value,
        date: sessionDate.value,
        time: sessionTime.value,
        place: sessionPlace.value,
        capacity: sessionCapacity.value
    })
}

function cancel() {
    goToSessions()
}
</script>

<template>
    <div class="new-session-page">
        <header>
            <div class="header-inner">
                <h1>New Session</h1>
                <p>Create a new game session!</p>
            </div>
        </header>

        <main class="container">
            <section>
                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>

                        <div>
                            <h3>
                                <input
                                    v-model="sessionName"
                                    type="text"
                                    placeholder="Enter session name"
                                >
                            </h3>

                            <p>
                                <strong>Enter date:</strong>
                                <input v-model="sessionDate" type="date">
                            </p>

                            <p><strong>Enter time:</strong></p>
                            <p><input v-model="sessionTime" type="time"></p>

                            <p><strong>Enter place:</strong></p>
                            <select v-model="sessionPlace">
                                <option value="Club room">Club room</option>
                                <option value="Community centre">Community centre</option>
                                <option value="Library meeting room">Library meeting room</option>
                                <option value="Game café">Game café</option>
                                <option value="Home">Home</option>
                            </select>

                            <p><strong>Enter capacity:</strong></p>
                            <p>
                                <input
                                    v-model.number="sessionCapacity"
                                    type="number"
                                    min="1"
                                    placeholder="Enter capacity"
                                >
                            </p>

                            <p v-if="error" class="error">{{ error }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex gap-sm">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="submitSession"
                >
                    Create session
                </button>

                <button
                    type="button"
                    class="btn btn-danger"
                    @click="cancel"
                >
                    Cancel
                </button>
            </div>
        </main>
    </div>
</template>
