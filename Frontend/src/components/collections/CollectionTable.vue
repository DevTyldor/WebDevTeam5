<script setup lang="ts">
import { useCollection } from '../../composables/useCollection'
import type { CollectionRecord } from '../../types/Collection'

defineProps<{
    records: CollectionRecord[]
}>()

const emit = defineEmits<{
    play: [id: number]
    rate: [id: number, rating: number]
    remove: [id: number]
}>()

const { getTitle } = useCollection()

function changeRating(id: number, event: Event) {
    const select = event.target as HTMLSelectElement
    emit('rate', id, Number(select.value))
}
</script>

<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Status</th>
                    <th>Plays</th>
                    <th>Rating</th>
                    <th>Note</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :key="record.id">
                    <td>{{ getTitle(record.gameId) }}</td>
                    <td>{{ record.status }}</td>
                    <td>{{ record.plays }}</td>
                    <td>
                        <select v-if="record.status === 'Played'" :value="record.rating"
                            @change="changeRating(record.id, $event)">
                            <option :value="0">-</option>
                            <option :value="1">1</option>
                            <option :value="2">2</option>
                            <option :value="3">3</option>
                            <option :value="4">4</option>
                            <option :value="5">5</option>
                        </select>
                    </td>
                    <td>{{ record.note }}</td>
                    <td>
                        <div class="flex gap-sm">
                            <button type="button" class="btn btn-primary" @click="emit('play', record.id)">+1 play</button>
                            <button type="button" class="btn btn-secondary" @click="emit('remove', record.id)">Remove</button>
                        </div>
                    </td>
                </tr>
                <tr v-if="records.length === 0">
                    <td colspan="6">No games in your collection yet</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
