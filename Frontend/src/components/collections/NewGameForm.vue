<script setup lang="ts">
import { ref } from 'vue'
import type { Game } from '../../types/Collection'

const props = defineProps<{
    games: Game[]
}>()

const emit = defineEmits<{
    add: [title: string]
}>()

const newTitle = ref<string>('')
const formError = ref<string>('')

function handleSubmit() {
    if (newTitle.value.trim() === '') {
        formError.value = 'Please enter a title'
        return
    }

    for (const game of props.games) {
        if (game.title.toLowerCase() === newTitle.value.trim().toLowerCase()) {
            formError.value = 'This game already exists'
            return
        }
    }

    emit('add', newTitle.value.trim())

    newTitle.value = ''
    formError.value = ''
}
</script>

<template>
    <form class="card" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="new-game-title">Title</label>
            <input type="text" id="new-game-title" v-model="newTitle">
        </div>

        <p v-if="formError" class="notice error">{{ formError }}</p>

        <button type="submit" class="btn btn-primary">Create Game</button>
    </form>
</template>
