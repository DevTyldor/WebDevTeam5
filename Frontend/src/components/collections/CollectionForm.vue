<script setup lang="ts">
import { ref } from 'vue'
import type { Game, RecordStatus } from '../../types/Collection'

const props = defineProps<{
    games: Game[]
    tooManyInProgress: boolean
}>()

const emit = defineEmits<{
    add: [gameId: number, status: RecordStatus, note: string]
}>()

const newGameId = ref<number>(0)
const newStatus = ref<RecordStatus>('Not played yet')
const newNote = ref<string>('')
const formError = ref<string>('')

function handleSubmit() {
    if (newGameId.value === 0) {
        formError.value = 'Please choose a game'
        return
    }

    if (newStatus.value === 'In progress' && props.tooManyInProgress) {
        formError.value = 'Already have three games in progress.'
        return
    }

    emit('add', newGameId.value, newStatus.value, newNote.value)

    newGameId.value = 0
    newStatus.value = 'Not played yet'
    newNote.value = ''
    formError.value = ''
}
</script>

<template>
    <form class="card" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="game">Game</label>
            <select id="game" v-model="newGameId">
                <option :value="0">-- choose a game --</option>
                <option v-for="game in games" :key="game.id" :value="game.id">{{ game.title }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="newStatus" required>
                <option value="Not played yet">Not played yet</option>
                <option value="In progress">In progress</option>
                <option value="Played">Played</option>
            </select>
        </div>

        <div class="form-group">
            <label for="note">Note</label>
            <textarea id="note" v-model="newNote"></textarea>
        </div>

        <p v-if="formError" class="notice error">{{ formError }}</p>

        <button type="submit" class="btn btn-primary">Add to Collection</button>
    </form>
</template>
