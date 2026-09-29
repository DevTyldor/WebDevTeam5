<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from './components/layout/AppFooter.vue'
import AppNav from './components/layout/AppNav.vue'
import AppHeader from './components/layout/AppHeader.vue'

</script>

<template>
  <AppHeader />
  <AppNav />

  <main class="page-content">
    <RouterView />
  </main>
  <AppFooter />
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
