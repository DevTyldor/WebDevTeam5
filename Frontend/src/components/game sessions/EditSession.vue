<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSessions } from '@/composables/useSession'

const {
    currentSession,
    hosts,
    places,
    updateSession
} = useSessions()

const error = ref('')
const sessionDate = ref('')
const sessionTime = ref('')
const sessionHost = ref('')
const sessionPlace = ref('club')
const sessionCapacity = ref<number | null>(null)

watch(
    currentSession,
    (session) => {
        if (!session) return

        sessionDate.value = session.date
        sessionTime.value = session.time
        sessionHost.value = session.host
        sessionPlace.value = session.place
        sessionCapacity.value = session.capacity
    },
    { immediate: true }
)

function saveSession() {
    error.value = updateSession({
        date: sessionDate.value,
        time: sessionTime.value,
        place: sessionPlace.value,
        host: sessionHost.value,
        capacity: sessionCapacity.value
    })
}
</script>

<template>
    <div class="edit-session-page">

        <head>
            <title>Edit Session</title>
            <link rel="stylesheet" href="../stylesheet/style.css">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <main class="container">
            <section>
                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>{{ currentSession?.name }}</h3>
                            <p><strong>Host:</strong> {{ currentSession?.host }}</p>
                            <p><strong>Date:</strong> {{ currentSession?.date }}</p>
                            <p><input type="date" v-model="sessionDate"></p>
                            <p><strong>Time:</strong> {{ currentSession?.time }}</p>
                            <p><input type="time" v-model="sessionTime"></input></p>
                            <p><strong>Place: </strong>{{ currentSession?.place }}</p>
                            <select v-model="sessionPlace">
                                <option v-for="place in places" :key="place" :value="place">
                                    {{ place }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>Edit capacity</h3>
                            <p>{{ currentSession?.confirmed }}/{{ currentSession?.capacity }} Confirmed <span class="badge"
                                    :class="currentSession?.status === 'Open' ? 'approved' : 'rejected'">
                                    {{ currentSession?.status }}
                                </span></p>
                            <input type="number" v-model="sessionCapacity" min="2"
                                placeholder="Enter new capacity. Min 2">
                            <p style="color: var(--red);">Warning: changing capacity may result in members being moved
                                into the waitlist</p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>Edit host</h3>
                            <p>Current host: {{ currentSession?.host }}</p>
                            <select name="host" v-model="sessionHost">
                                <option v-for="host in hosts" :key="host" :value="host">
                                    {{ host }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex gap-sm">
                <button type="button" class="btn btn-primary" @click="saveSession">
                    Save changes
                </button>
                <RouterLink :to="`/view-session/${currentSession?.id}`" class="btn btn-danger">Cancel changes</RouterLink>
            </div>

        </main>
    </div>
</template>