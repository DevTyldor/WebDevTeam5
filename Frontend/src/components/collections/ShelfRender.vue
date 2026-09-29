<script setup lang="ts">
</script>

<template>
    <section>
        <div class="section-title">
            <h2>Test1</h2>
            <a href="shelves" class="btn btn-secondary">Back to shelves</a>
        </div>

        <div class="card">
            <p>Desc1</p>
            <p>Public: Yes</p>
        </div>
    </section>

    <!-- Games on this shelf -->
    <section>
        <div class="section-title">
            <h2>Games on this shelf</h2>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Status</th>
                        <th>Plays</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Overwatch</td>
                        <td>In progress</td>
                        <td>5</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Halo 3</td>
                        <td>Played</td>
                        <td>12</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- Add game to shelf -->
    <section>
        <div class="section-title">
            <h2>Add game to shelf</h2>
        </div>

        <form class="card" action="/shelf/add-game" method="post">
            <div class="form-group">
                <label for="game">Game</label>
                <select id="game" name="game_id" required>
                    <option value="">-- choose a game from my collection --</option>
                    <option value="1">Halo 3</option>
                    <option value="2">Overwatch</option>
                    <option value="3">Fortnite</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Add to Shelf</button>
        </form>
    </section>
</template>