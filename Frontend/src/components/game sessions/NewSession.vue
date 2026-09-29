<script setup lang="ts">
</script>

<template>
    <div class="new-session-page">
    <header>
        <div class="header-inner">
            <h1>New Session</h1>
            <p>Create a new game session!</p>
        </div>
    </header>

    <main class="container">
        <section>
            <div class="card card-hover">
                <div class="game-box">
                    <div class="game-icon">🎲</div>
                    <div>
                        <h3><input type="text" id="nameInput" placeholder="Enter session name"></h3>
                        <p><strong>Enter date:</strong><input type="date" id="dateInput" ></p>
                        <p><strong>Enter time:</strong></p>
                        <p><input type="time" id="timeInput"></p>
                        <p><strong>Enter place:</strong></p>
                        <select name="game" id="gameInput">
                            <option value="club">Club room</option>
                            <option value="home">Home</option>
                        </select>
                        <p><strong>Enter capacity:</strong></p>
                        <p><input type="number" id="capacityInput"></p>
                    </div>
                </div>
            </div>
        </section>

        <div class="flex gap-sm">
            <a href="sessions.html" class="btn btn-primary">Create session</a>
            <a href="sessions.html" class="btn btn-danger">Cancel</a>
        </div>

    </main>
    </div>
</template>