<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const description = ref("");
const owner = ref("");
const emit = defineEmits<{
    submit: [box: {
        name: string;
        description: string;
        owner: string;
    }];
}>();

function submitForm() {
    if (!name.value.trim() || !owner.value.trim()) return;

    emit("submit", {
        name: name.value.trim(),
        description: description.value.trim(),
        owner: owner.value.trim(),
    });
}
</script>

<template>
    <div class="card card-hover">
        <div class="game-box">
            <div class="game-icon">📦</div>

            <div>
                <h3>Add a new box</h3>

                <form class="box-form" @submit.prevent="submitForm">
                    <p>
                        <label for="boxName"><strong>Box name:</strong></label>
                        <input
                            id="boxName"
                            v-model="name"
                            type="text"
                            placeholder="Enter box name"
                            required
                        >
                    </p>

                    <p>
                        <label for="boxDescription"><strong>Description:</strong></label>
                        <textarea
                            id="boxDescription"
                            v-model="description"
                            placeholder="Describe the box"
                            rows="3"
                        />
                    </p>

                    <p>
                        <label for="boxOwner"><strong>Owner:</strong></label>
                        <input
                            id="boxOwner"
                            v-model="owner"
                            type="text"
                            placeholder="Enter owner name"
                            required
                        >
                    </p>

                    <button type="submit" class="btn btn-primary">
                        Add box
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>