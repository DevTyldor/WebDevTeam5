<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCollection } from '../../composables/useCollection'
import ShelfGamesTable from './ShelfGamesTable.vue'
import ShelfGameForm from './ShelfGameForm.vue'

const route = useRoute()
const { me, myGames, getShelf, getShelfGames, addToShelf, removeFromShelf } = useCollection()

const shelfId = Number(route.params.id)

const shelf = computed(() => getShelf(shelfId))
const shelfGames = computed(() => getShelfGames(shelfId))

function handleAdd(gameId: number) {
    addToShelf(shelfId, gameId)
}

function handleRemove(gameId: number) {
    removeFromShelf(shelfId, gameId)
}
</script>

<template>
    <div v-if="shelf && shelf.owner === me">
        <section>
            <div class="section-title">
                <h2>{{ shelf.name }}</h2>
                <RouterLink to="/collection/shelves" class="btn btn-secondary">Back to shelves</RouterLink>
            </div>

            <div class="card">
                <p>{{ shelf.description }}</p>
                <p>Public: {{ shelf.isPublic ? 'Yes' : 'No' }}</p>
                <p v-if="shelf.isPublic">
                    <RouterLink :to="`/collection/public-shelf/${shelf.id}`">View public shelf</RouterLink>
                </p>
            </div>
        </section>

        <!-- Games on this shelf -->
        <section>
            <div class="section-title">
                <h2>Games on this shelf</h2>
            </div>

            <ShelfGamesTable :records="shelfGames" :can-remove="true" @remove="handleRemove" />
        </section>

        <!-- Add game to shelf -->
        <section>
            <div class="section-title">
                <h2>Add game to shelf</h2>
            </div>

            <ShelfGameForm :records="myGames" @add="handleAdd" />
        </section>
    </div>

    <div v-else>
        <section>
            <div class="section-title">
                <h2>Shelf not found</h2>
                <RouterLink to="/collection/shelves" class="btn btn-secondary">Back to shelves</RouterLink>
            </div>

            <div class="card">
                <p>No shelf exists with ID {{ shelfId }}.</p>
            </div>
        </section>
    </div>
</template>
