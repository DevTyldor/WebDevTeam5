<script setup lang="ts">
import { useCollection } from '../../composables/useCollection'
import type { CollectionRecord } from '../../types/Collection'

defineProps<{
    records: CollectionRecord[]
    canRemove: boolean
}>()

const emit = defineEmits<{
    remove: [gameId: number]
}>()

const { getTitle } = useCollection()
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
                    <th v-if="canRemove">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in records" :key="record.id">
                    <td>{{ getTitle(record.gameId) }}</td>
                    <td>{{ record.status }}</td>
                    <td>{{ record.plays }}</td>
                    <td>{{ record.rating > 0 ? record.rating : '' }}</td>
                    <td v-if="canRemove">
                        <button type="button" class="btn btn-secondary" @click="emit('remove', record.gameId)">Remove</button>
                    </td>
                </tr>
                <tr v-if="records.length === 0">
                    <td colspan="5">No games on this shelf yet</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
