<script setup lang="ts">
import { ref } from 'vue'
import { useCollection } from '../../composables/useCollection'
import type { CollectionRecord } from '../../types/Collection'

defineProps<{
    records: CollectionRecord[]
}>()

const emit = defineEmits<{
    add: [gameId: number]
}>()

const { getTitle } = useCollection()

const newGameId = ref<number>(0)
const formError = ref<string>('')

function handleSubmit() {
    if (newGameId.value === 0) {
        formError.value = 'Please choose a game'
        return
    }

    emit('add', newGameId.value)

    newGameId.value = 0
    formError.value = ''
}
</script>

<template>
    <form class="card" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="game">Game</label>
            <select id="game" v-model="newGameId">
                <option :value="0">-- choose a game from my collection --</option>
                <option v-for="record in records" :key="record.id" :value="record.gameId">
                    {{ getTitle(record.gameId) }}
                </option>
            </select>
        </div>

        <p v-if="formError" class="notice error">{{ formError }}</p>

        <button type="submit" class="btn btn-primary">Add to Shelf</button>
    </form>
</template>
