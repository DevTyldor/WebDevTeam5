<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCollection } from '../../composables/useCollection'
import ShelfGamesTable from './ShelfGamesTable.vue'

const route = useRoute()
const { getShelf, getShelfGames } = useCollection()

const shelfId = Number(route.params.id)

const shelf = computed(() => getShelf(shelfId))
const shelfGames = computed(() => getShelfGames(shelfId))
</script>

<template>
    <div v-if="shelf && shelf.isPublic">
        <!-- Shelf info -->
        <section>
            <div class="section-title">
                <h2>{{ shelf.name }} - shelf of {{ shelf.owner }}</h2>
                <RouterLink to="/collection" class="btn btn-secondary">Back to collection</RouterLink>
            </div>

            <div class="card">
                <p>{{ shelf.description }}</p>
                <p>Owner: {{ shelf.owner }}</p>
            </div>
        </section>

        <!-- Games on this shelf -->
        <section>
            <div class="section-title">
                <h2>Games on this shelf</h2>
            </div>

            <ShelfGamesTable :records="shelfGames" :can-remove="false" />
        </section>
    </div>

    <div v-else>
        <section>
            <div class="section-title">
                <h2>Shelf not found</h2>
                <RouterLink to="/collection" class="btn btn-secondary">Back to collection</RouterLink>
            </div>

            <div class="card">
                <p>No public shelf exists with ID {{ shelfId }}.</p>
            </div>
        </section>
    </div>
</template>
