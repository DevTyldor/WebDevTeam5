<script setup lang="ts">
import BoxCard from "../../components/lending/BoxCard.vue";
</script>

<template>
    <div>
        <header>
            <div class="header-inner">
                <h1>Lending</h1>
                <p>Overview of lending boxes</p>
            </div>
        </header>

        <main class="container">
            <section>
                <h2>Available boxes</h2>

                <BoxCard
                    name="Board Game Box"
                    description="A box containing board games."
                    owner="Alice"
                    :available="true"
                />

                <BoxCard
                    name="Puzzle Box"
                    description="A box containing puzzles."
                    owner="Bob"
                    :available="false"
                />
            </section>
        </main>
    </div>
</template>