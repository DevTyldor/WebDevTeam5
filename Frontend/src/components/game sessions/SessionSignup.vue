<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { mockSessions } from '@/data/mockSessions'

const route = useRoute()

const session = computed(() => {
    return mockSessions.find(
        session => session.id === Number(route.params.id)
    )
})

const seatsAvailable = computed(() => {
    if (!session.value) return 0

    return session.value.capacity - session.value.confirmed
})

// for now this is just a mockup code. Will be replaced later with proper signup once the backend exists.
const isSignedUp = ref(false)
function signup() {
    if (!session.value) return

    isSignedUp.value = true

    console.log(`Signed up for session ${session.value.id}`)
}
</script>

<template>
    <div class="edit-session-page">

        <head>
            <title>Session Signup</title>
            <link rel="stylesheet" href="../stylesheet/style.css">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <header>
            <div class="header-inner">
                <h1>Signup</h1>
                <p>Sign up for {{ session?.name }}</p>
            </div>
        </header>

        <main class="container">
            <section>

                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>{{ session?.name }}</h3>
                            <p><strong>Host:</strong> {{ session?.host }}</p>
                            <p><strong>Date:</strong> {{ session?.date }}</p>
                            <p><strong>Time:</strong> {{ session?.time }}</p>
                            <p><strong>Place:</strong> {{ session?.place }}</p>
                        </div>
                    </div>
                </div>

                <div class="card card-hover">
                    <div class="game-box">
                        <div>
                            <h4>Capacity</h4>
                            <p>{{ session?.confirmed }}/{{ session?.capacity }} Confirmed</p>
                            <span class="badge" :class="session?.status === 'Open' ? 'approved' : 'rejected'">{{
                                session?.status }}</span>
                            <span v-if="seatsAvailable > 0" class="badge approved">{{ seatsAvailable }} seats
                                available</span>
                            <span v-else class="badge rejected">No seats available</span>
                        </div>
                    </div>
                </div>


                <div class="card card-hover">
                    <div class="game-box">
                        <div class="game-icon">🎲</div>
                        <div>
                            <h3>Bring a game</h3>
                            <select name="game" id="game">
                                <option value="catan">catan</option>
                                <option value="gloomhaven">Gloomhaven</option>>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex gap-sm">
                <button v-if="!isSignedUp" class="btn btn-primary" @click="signup">Sign up</button>
                <RouterLink :to="`/view-session/${session?.id}`" class="btn btn-danger">Cancel signup</RouterLink>
            </div>

        </main>
    </div>
</template>