<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
}>()

// this picks the badge color from the stylesheet
const badgeClass = computed(() => {
  if (props.label === 'High' || props.label === 'Pending') {
    return 'badge pending'
  }
  if (props.label === 'Low') {
    return 'badge available'
  }
  if (props.label === 'New' || props.label === 'Accepted') {
    return 'badge approved'
  }
  return 'badge loan'
})
</script>

<!-- this will display the label text inside the badge -->
<template>
  <span :class="badgeClass">{{ label }}</span>
</template>