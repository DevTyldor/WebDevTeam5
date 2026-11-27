
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSessions } from '@/composables/useSession'

const {
    currentSession,
    hosts,
    places,
    confirmedCount,
    updateSession
} = useSessions()

const error = ref('')
const sessionDate = ref('')
const sessionTime = ref('')
const sessionHost = ref('')
const sessionPlace = ref('')
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
        error.value = ''
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
        <main class="container">
            <section v-if="currentSession">
                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>

                        <div>
                            <h3>{{ currentSession.name }}</h3>

                            <p>
                                <strong>Host:</strong>
                                {{ currentSession.host }}
                            </p>

                            <p><strong>Date:</strong> {{ currentSession.date }}</p>
                            <p>
                                <label for="session-date">New date:</label>
                            </p>
                            <input
                                id="session-date"
                                v-model="sessionDate"
                                type="date"
                                required
                            >

                            <p><strong>Time:</strong> {{ currentSession.time }}</p>
                            <p>
                                <label for="session-time">New time:</label>
                            </p>
                            <input
                                id="session-time"
                                v-model="sessionTime"
                                type="time"
                                required
                            >

                            <p>
                                <strong>Place:</strong>
                                {{ currentSession.place }}
                            </p>

                            <label for="session-place">New place:</label>
                            <select
                                id="session-place"
                                v-model="sessionPlace"
                                required
                            >
                                <option
                                    v-for="place in places"
                                    :key="place"
                                    :value="place"
                                >
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

                            <p>
                                {{ confirmedCount }}/{{ currentSession.capacity }}
                                Confirmed

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
                            </p>

                            <label for="session-capacity">
                                New capacity:
                            </label>
                            <input
                                id="session-capacity"
                                v-model.number="sessionCapacity"
                                type="number"
                                min="2"
                                step="1"
                                placeholder="Enter new capacity. Min 2"
                                required
                            >

                            <p style="color: var(--red);">
                                Warning: changing capacity may move members
                                onto or off the waiting list.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>

                        <div>
                            <h3>Edit host</h3>

                            <p>Current host: {{ currentSession.host }}</p>

                            <label for="session-host">New host:</label>
                            <select
                                id="session-host"
                                v-model="sessionHost"
                                required
                            >
                                <option
                                    v-for="host in hosts"
                                    :key="host"
                                    :value="host"
                                >
                                    {{ host }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <p v-if="error" class="error" role="alert">
                    {{ error }}
                </p>

                <div class="flex gap-sm">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="saveSession"
                    >
                        Save changes
                    </button>

                    <RouterLink
                        :to="`/view-session/${currentSession.id}`"
                        class="btn btn-danger"
                    >
                        Cancel changes
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
