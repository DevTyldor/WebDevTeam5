<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
}>()

// this picks the badge color from the stylesheet
const badgeClass = computed(() => {
  if (props.label === 'High' || props.label === 'Declined') {
    return 'badge red'
  }
  if (props.label === 'Medium' || props.label === 'Pending') {
    return 'badge orange'
  }
  if (props.label === 'New' || props.label === 'Accepted') {
    return 'badge green'
  }
  if (props.label === 'Used') {
    return 'badge blue'
  }
  return 'badge grey' // Low and anything else
})
</script>

<!-- this will display the label text inside the badge -->
<template>
  <span :class="badgeClass">{{ label }}</span>
</template>

<style scoped>
.badge.red    { background: #fde8e8; color: #b42318; }
.badge.orange { background: #fdf3e1; color: #9a5b00; }
.badge.green  { background: #e6f4ea; color: #1e7b3a; }
.badge.blue   { background: #e5effc; color: #1d4ed8; }
.badge.grey   { background: #eef0f3; color: #4b5563; }
</style>