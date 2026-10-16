<script setup lang="ts">
import { useCollection } from '../../composables/useCollection'
import ShelvesTable from './ShelvesTable.vue'
import ShelfForm from './ShelfForm.vue'

const { myShelves, addShelf, deleteShelf } = useCollection()
</script>

<template>
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
</template>
