<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { mockSessions } from '@/data/mockSessions'

const route = useRoute()
const router = useRouter()
const selectedGame = ref('')

const session = computed(() => {
    return mockSessions.find(
        session => session.id === Number(route.params.id)
    )
})

const seatsAvailable = computed(() => {
    if (!session.value) return 0

    return session.value.capacity - session.value.confirmed
})

const isSignedUp = ref(false)
function signup() {
    if (!session.value || isSignedUp.value) return

    if (session.value.status === 'Cancelled') return

    const memberName = 'New Member'

    if (session.value.confirmed >= session.value.capacity) {
        session.value.waitingList.push(memberName)
        isSignedUp.value = true
        return
    }

    session.value.participants.push({
        name: memberName,
        game: selectedGame.value || undefined
    })

    session.value.confirmed++

    if (session.value.confirmed >= session.value.capacity) {
        session.value.status = 'Full'
    }

    isSignedUp.value = true
    router.push(`/view-session/${session?.value.id}`)
}

function cancelSignup() {
    if (!session.value || !isSignedUp.value) {
        router.push(`/view-session/${session.value?.id}`)
        return
    }

    const memberName = 'New Member'

    const waitingIndex = session.value.waitingList.indexOf(memberName)

    if (waitingIndex !== -1) {
        session.value.waitingList.splice(waitingIndex, 1)
    } else {
        const participantIndex = session.value.participants.findIndex(
            participant => participant.name === memberName
        )

        if (participantIndex !== -1) {
            session.value.participants.splice(participantIndex, 1)
            session.value.confirmed--

            if (session.value.waitingList.length > 0) {
                const nextMember = session.value.waitingList.shift()!

                session.value.participants.push({ name: nextMember })
                session.value.confirmed++
            }

            session.value.status =
                session.value.confirmed >= session.value.capacity
                    ? 'Full'
                    : 'Open'
        }
    }

    isSignedUp.value = false
    router.push(`/view-session/${session.value.id}`)
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
                <div v-if="session?.waitingList.length" class="card">
                    <h3>Waiting list</h3>
                    <p>{{ session.waitingList.length }} member(s) waiting</p>

                    <ul>
                        <li v-for="(member, index) in session.waitingList" :key="index">
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
                <button v-if="!isSignedUp && session?.status !== 'Cancelled'" class="btn btn-primary" @click="signup">
                    {{ seatsAvailable > 0 ? 'Sign up' : 'Join waiting list' }}
                </button>

                <p v-else-if="isSignedUp">
                    You have successfully signed up!
                </p>

                <p v-else>
                    This session has been cancelled.
                </p>
                <button type="button" class="btn btn-danger" @click="cancelSignup">
                    {{ isSignedUp ? 'Cancel signup' : 'Back to session' }}
                </button>
            </div>

        </main>
    </div>
</template>