<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockSessions } from '@/data/mockSessions'

const route = useRoute()
const router = useRouter()
const session = computed(() => {
    return mockSessions.find(
        session => session.id === Number(route.params.id)
    )
})

const hosts = computed(() => {
    return [...new Set(mockSessions.map(session => session.host))]
})

const places = computed(() => {
    return [...new Set(mockSessions.map(session => session.place))]
})


const error = ref('')
const sessionDate = ref('')
const sessionTime = ref('')
const sessionHost = ref('')
const sessionPlace = ref('club')
const sessionCapacity = ref<number | null>(null)

watch(session, (currentSession) => {
    if (currentSession) {
        sessionDate.value = currentSession.date
        sessionTime.value = currentSession.time

        sessionHost.value = currentSession.host

        sessionPlace.value = currentSession.place

        sessionCapacity.value = currentSession.capacity
    }
}, { immediate: true })

function saveSession() {
    error.value = ''
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

    if (!sessionHost.value) {
        error.value = 'Please select a host.'
        return
    }

    if (
        sessionCapacity.value === null ||
        sessionCapacity.value < 2
    ) {
        error.value = 'Capacity must be at least 2.'
        return
    }

    const sessionToUpdate = mockSessions.find(
        s => s.id === Number(route.params.id)
    )

    if (!sessionToUpdate) {
        error.value = 'Session not found.'
        return
    }

    sessionToUpdate.date = sessionDate.value
    sessionToUpdate.time = sessionTime.value
    sessionToUpdate.host = sessionHost.value
    sessionToUpdate.place = sessionPlace.value
    sessionToUpdate.capacity = sessionCapacity.value

    router.push(`/view-session/${sessionToUpdate.id}`)
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
                            <h3>{{ session?.name }}</h3>
                            <p><strong>Host:</strong> {{ session?.host }}</p>
                            <p><strong>Date:</strong> {{ session?.date }}</p>
                            <p><input type="date" v-model="sessionDate"></p>
                            <p><strong>Time:</strong> {{ session?.time }}</p>
                            <p><input type="time" v-model="sessionTime"></input></p>
                            <p><strong>Place: </strong>{{ session?.place }}</p>
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
                            <p>{{ session?.confirmed }}/{{ session?.capacity }} Confirmed <span class="badge"
                                    :class="session?.status === 'Open' ? 'approved' : 'rejected'">
                                    {{ session?.status }}
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
                            <p>Current host: {{ session?.host }}</p>
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
                <RouterLink :to="`/view-session/${session?.id}`" class="btn btn-danger">Cancel changes</RouterLink>
            </div>

        </main>
    </div>
</template>