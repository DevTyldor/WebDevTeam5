<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCollection } from '../../composables/useCollection'
import CollectionTable from './CollectionTable.vue'
import CollectionForm from './CollectionForm.vue'
import NewGameForm from './NewGameForm.vue'

const {
    games,
    myGames,
    tooManyInProgress,
    loading,
    error,
    fetchGames,
    initGames,
    addNewGame,
    hasGame,
    addGame,
    removeGame,
    addPlay,
    rateGame
} = useCollection()

const gamesToAdd = computed(() => {
    return games.value.filter(game => !hasGame(game.id))
})

const gamesInCollection = computed(() => {
    return games.value.filter(game => hasGame(game.id))
})

onMounted(() => {
    initGames()
})
</script>

<template>
    <p v-if="loading" class="notice">Loading games...</p>
    <p v-else-if="error" class="notice error">{{ error }}</p>
    <div v-else>
        <!-- Collection -->
        <section>
            <div class="section-title">
                <h2>My collection</h2>
                <RouterLink to="/collection/shelves" class="btn btn-secondary">My shelves</RouterLink>
            </div>

            <CollectionTable :records="myGames" @play="addPlay" @rate="rateGame" @remove="removeGame" />
        </section>

        <!-- Add game to collection -->
        <section>
            <div class="section-title">
                <h2>Add game to collection</h2>
                <button type="button" class="btn btn-secondary" @click="fetchGames">Reset games</button>
            </div>

            <CollectionForm :games="gamesToAdd" :too-many-in-progress="tooManyInProgress" @add="addGame" />
        </section>

        <!-- Create a new game -->
        <section>
            <div class="section-title">
                <h2>Create game</h2>
            </div>

            <NewGameForm :games="gamesInCollection" @add="addNewGame" />
        </section>
    </div>
</template>
