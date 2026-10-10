<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    add: [name: string, description: string, isPublic: boolean]
}>()

const newName = ref<string>('')
const newDescription = ref<string>('')
const newPublic = ref<string>('Yes')
const formError = ref<string>('')

function handleSubmit() {
    if (newName.value.trim() === '') {
        formError.value = 'Please enter a name'
        return
    }

    emit('add', newName.value, newDescription.value, newPublic.value === 'Yes')

    newName.value = ''
    newDescription.value = ''
    newPublic.value = 'Yes'
    formError.value = ''
}
</script>

<template>
    <form class="card" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="newName" required>
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="newDescription"></textarea>
        </div>

        <div class="form-group">
            <label for="public">Public</label>
            <select id="public" v-model="newPublic" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </div>

        <p v-if="formError" class="notice error">{{ formError }}</p>

        <button type="submit" class="btn btn-primary">Add Shelf</button>
    </form>
</template>
