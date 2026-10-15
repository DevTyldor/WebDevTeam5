<script setup lang="ts">
defineProps<{
    status: string;
}>();

function badgeClass(status: string): string {
    switch (status.toLowerCase()) {
        case "approved":
        case "accepted":
        case "available":
        case "active":
        case "returned":
            return "approved";

        case "pending":
        case "requested":
            return "pending";

        case "rejected":
        case "declined":
        case "overdue":
        case "lent out":
            return "rejected";

        default:
            return "";
    }
}
</script>

<template>
    <span class="badge" :class="badgeClass(status)">
        {{ status }}
    </span>
</template>