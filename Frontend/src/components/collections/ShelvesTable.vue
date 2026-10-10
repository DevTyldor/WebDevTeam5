<script setup lang="ts">
import { useCollection } from '../../composables/useCollection'
import type { Shelf } from '../../types/Collection'

defineProps<{
    shelves: Shelf[]
}>()

const emit = defineEmits<{
    delete: [id: number]
}>()

const { getTitle } = useCollection()

function gameNames(shelf: Shelf) {
    return shelf.gameIds.map(id => getTitle(id)).join(', ')
}
</script>

<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Shelf</th>
                    <th>Description</th>
                    <th>Public</th>
                    <th>Games</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="shelf in shelves" :key="shelf.id">
                    <td><RouterLink :to="`/collection/shelf/${shelf.id}`">{{ shelf.name }}</RouterLink></td>
                    <td>{{ shelf.description }}</td>
                    <td>{{ shelf.isPublic ? 'Yes' : 'No' }}</td>
                    <td>{{ gameNames(shelf) }}</td>
                    <td>
                        <button type="button" class="btn btn-secondary" @click="emit('delete', shelf.id)">Delete</button>
                    </td>
                </tr>
                <tr v-if="shelves.length === 0">
                    <td colspan="5">No shelves yet</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
