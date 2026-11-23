<script setup lang="ts">
import { onMounted } from 'vue'
import { useCollection } from '../../composables/useCollection'
import ShelvesTable from './ShelvesTable.vue'
import ShelfForm from './ShelfForm.vue'

const { myShelves, loading, error, initGames, addShelf, deleteShelf } = useCollection()

onMounted(() => {
    initGames()
})
</script>

<template>
    <p v-if="loading" class="notice">Loading games...</p>
    <p v-else-if="error" class="notice error">{{ error }}</p>
    <div v-else>
        <!-- My shelves -->
        <section>
            <div class="section-title">
                <h2>My shelves</h2>
                <RouterLink to="/collection" class="btn btn-secondary">Back to collection</RouterLink>
            </div>

            <ShelvesTable :shelves="myShelves" @delete="deleteShelf" />
        </section>

        <!-- Add shelf -->
        <section>
            <div class="section-title">
                <h2>Add shelf</h2>
            </div>

            <ShelfForm @add="addShelf" />
        </section>
    </div>
</template>
