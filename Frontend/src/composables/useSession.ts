// src/composables/useSessions.ts
import { ref, computed } from 'vue'
import { mockSessions } from '@/data/mockSessions'
import type { Session } from '@/types/Session'
import { useRoute, useRouter } from 'vue-router'

// Module-scope state: shared by every component that calls useSessions()
const sessions = ref<Session[]>(mockSessions)

const currentUser = 'New Member'

export function useSessions() {
  const route = useRoute()
  const router = useRouter()

  const hosts = computed(() => {
    return [...new Set(sessions.value.map(session => session.host))]
  })

  const places = computed(() => {
    return [...new Set(sessions.value.map(session => session.place))]
  })

  function getSession(id: number) {
    return sessions.value.find(session => session.id === id)
  }

  const currentSession = computed(() => {
    return getSession(Number(route.params.id))
  })

  const seatsAvailable = computed(() => {
    if (!currentSession.value) return 0
    return currentSession.value.capacity - currentSession.value.confirmed
  })

  function validateSession(
    name: string,
    date: string,
    time: string,
    place: string,
    host: string,
    capacity: number | null,
    minimumCapacity: number
  ) {
    if (!name.trim()) return 'Please enter a session name.'
    if (!date) return 'Please select a date.'
    if (!time) return 'Please select a time.'
    if (!place) return 'Please select a place.'
    if (!host) return 'Please select a host.'
    if (capacity === null || capacity < minimumCapacity) {
      return `Capacity must be at least ${minimumCapacity}.`
    }
    return ''
  }

  function createSession(input: {
    name: string
    date: string
    time: string
    place: string
    capacity: number | null
  }) {
    const validationError = validateSession(
      input.name,
      input.date,
      input.time,
      input.place,
      'Alice',
      input.capacity,
      1
    )

    if (validationError) return validationError

    const newSession: Session = {
      id: Math.max(0, ...sessions.value.map(session => session.id)) + 1,
      name: input.name.trim(),
      description: `A game session: ${input.name.trim()}`,
      host: 'Alice',
      date: input.date,
      time: input.time,
      place: input.place,
      capacity: input.capacity!,
      confirmed: 1,
      status: 'Open',
      waitingList: [],
      games: [],
      participants: [{ name: 'Alice' }]
    }

    sessions.value.push(newSession)
    router.push(`/view-session/${newSession.id}`)
    return ''
  }

  function updateSession(input: {
    date: string
    time: string
    place: string
    host: string
    capacity: number | null
  }) {
    const sessionToUpdate = currentSession.value

    if (!sessionToUpdate) return 'Session not found.'

    const validationError = validateSession(
      sessionToUpdate.name,
      input.date,
      input.time,
      input.place,
      input.host,
      input.capacity,
      2
    )

    if (validationError) return validationError

    sessionToUpdate.date = input.date
    sessionToUpdate.time = input.time
    sessionToUpdate.place = input.place
    sessionToUpdate.host = input.host
    sessionToUpdate.capacity = input.capacity!

    router.push(`/view-session/${sessionToUpdate.id}`)
    return ''
  }

  const isSignedUp = ref(false)

function signup(selectedGame = '') {
    const session = currentSession.value

    if (!session || isSignedUp.value) return
    if (session.status === 'Cancelled') return

    if (session.confirmed >= session.capacity) {
        session.waitingList.push(currentUser)
        isSignedUp.value = true
        return
    }

    session.participants.push({
        name: currentUser,
        game: selectedGame || undefined
    })

    session.confirmed++

    if (session.confirmed >= session.capacity) {
        session.status = 'Full'
    }

    isSignedUp.value = true
    router.push(`/view-session/${session.id}`)
}

function cancelSignup() {
    const session = currentSession.value

    if (!session) return

    if (!isSignedUp.value) {
        router.push(`/view-session/${session.id}`)
        return
    }

    const waitingIndex = session.waitingList.indexOf(currentUser)

    if (waitingIndex !== -1) {
        session.waitingList.splice(waitingIndex, 1)
    } else {
        const participantIndex = session.participants.findIndex(
            participant => participant.name === currentUser
        )

        if (participantIndex !== -1) {
            session.participants.splice(participantIndex, 1)
            session.confirmed--

            if (session.waitingList.length > 0) {
                const nextMember = session.waitingList.shift()!
                session.participants.push({ name: nextMember })
                session.confirmed++
            }

            session.status =
                session.confirmed >= session.capacity ? 'Full' : 'Open'
        }
    }

    isSignedUp.value = false
    router.push(`/view-session/${session.id}`)
}

  function goToSessions() {
    router.push('/sessions')
  }

  return {
    sessions,
    currentUser,
    hosts,
    places,
    currentSession,
    seatsAvailable,
    getSession,
    createSession,
    updateSession,
    signup,
    cancelSignup,
    goToSessions,
    isSignedUp
  }
}