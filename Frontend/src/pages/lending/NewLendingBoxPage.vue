<script setup lang="ts">
import BoxForm from "../../components/lending/BoxForm.vue";
</script>

<template>
    <div>
        <h1>Nieuwe box uitlenen</h1>
        <BoxForm>
            <label for="box-name">Naam van de box</label>
            <input id="box-name" type="text" placeholder="Naam van de box" />

            <button type="submit">Box toevoegen</button>
        </BoxForm>
    </div>
</template>