<script setup lang="ts">
</script>

<template>
    <!-- Shelf info -->
    <section>
        <div class="section-title">
            <h2>Test1 - shelf of Lucas</h2>
            <a href="/collection" class="btn btn-secondary">Back to collection</a>
        </div>

        <div class="card">
            <p>Desc1</p>
            <p>Owner: Lucas</p>
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
</template>