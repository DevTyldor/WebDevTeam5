<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <nav class="navigation" aria-label="Hoofdnavigatie">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main class="page-content">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  background-color: #42b883;
  border-bottom: 1px solid #369f70;
  padding: 0.75rem 0;
}

.navigation {
  display: flex;
  gap: 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navigation a {
  border-radius: 4px;
  color: #1f2937;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
}

.navigation a:hover,
.navigation a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.3);
}

.page-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 600px) {

  .navigation,
  .page-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
