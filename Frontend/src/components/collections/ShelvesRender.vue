<script setup lang="ts">
</script>

<template>
    <!-- My shelves -->
    <section>
        <div class="section-title">
            <h2>My shelves</h2>
            <a href="/collection" class="btn btn-secondary">Back to collection</a>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Shelf</th>
                        <th>Description</th>
                        <th>Public</th>
                        <th>Games</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="shelf">Test1</a></td>
                        <td>Desc1</td>
                        <td>Yes</td>
                        <td>Overwatch, Halo 3</td>
                    </tr>
                    <tr>
                        <td><a href="shelf">Test2</a></td>
                        <td>qwerty</td>
                        <td>No</td>
                        <td>Fortnite</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- Add shelf -->
    <section>
        <div class="section-title">
            <h2>Add shelf</h2>
        </div>

        <form class="card" action="/shelf/add" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description"></textarea>
            </div>

            <div class="form-group">
                <label for="public">Public</label>
                <select id="public" name="public" required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary">Add Shelf</button>
        </form>
    </section>
</template> 