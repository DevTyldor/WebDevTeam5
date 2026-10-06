<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const sessionName = ref('')
const sessionDate = ref('')
const sessionTime = ref('')
const sessionPlace = ref('club')
const sessionCapacity = ref<number | null>(null)

const error = ref('')

// for now this is just a mockup function that shows an alert upon success
function createSession() {
    error.value = ''
    if (!sessionName.value.trim()) {
        error.value = 'Please enter a session name.'
        return
    }

    if (!sessionDate.value) {
        error.value = 'Please select a date.'
        return
    }

    if (!sessionTime.value) {
        error.value = 'Please select a time.'
        return
    }

    if (!sessionPlace.value) {
        error.value = 'Please select a place.'
        return
    }

    if (
        sessionCapacity.value === null ||
        sessionCapacity.value < 1
    ) {
        error.value = 'Capacity must be at least 1.'
        return
    }
    alert(`New session ${sessionName.value}`)
}

function cancel() {
    router.push('/sessions')
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
                                <input v-model="sessionName" type="text" placeholder="Enter session name">
                            </h3>

                            <p>
                                <strong>Enter date:</strong>
                                <input v-model="sessionDate" type="date">
                            </p>

                            <p><strong>Enter time:</strong></p>
                            <p><input v-model="sessionTime" type="time"></p>

                            <p><strong>Enter place:</strong></p>
                            <select v-model="sessionPlace">
                                <option value="club">Club room</option>
                                <option value="home">Home</option>
                            </select>

                            <p><strong>Enter capacity:</strong></p>
                            <p><input v-model.number="sessionCapacity" type="number" min="1"placeholder="Enter capacity"></p>
                            <p v-if="error" class="error">{{ error }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex gap-sm">
                <button type="button" class="btn btn-primary" @click="createSession">
                    Create session
                </button>

                <button type="button" class="btn btn-danger" @click="cancel">
                    Cancel
                </button>
            </div>
        </main>
    </div>
</template>
