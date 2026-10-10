<script setup lang="ts">
import { computed } from 'vue'
import { useCollection } from '../../composables/useCollection'
import CollectionTable from './CollectionTable.vue'
import CollectionForm from './CollectionForm.vue'

const {
    games,
    myGames,
    tooManyInProgress,
    hasGame,
    addGame,
    removeGame,
    addPlay,
    rateGame
} = useCollection()

const gamesToAdd = computed(() => {
    return games.value.filter(game => !hasGame(game.id))
})
</script>

<template>
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
        </div>

        <CollectionForm :games="gamesToAdd" :too-many-in-progress="tooManyInProgress" @add="addGame" />
    </section>
</template>
