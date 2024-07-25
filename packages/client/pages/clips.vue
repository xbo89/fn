<template>
  <Sidebar class="fixed left-2 top-2 bottom-2 z-50" />
  <FlowEntry />
</template>

<script setup>
const router = useRouter()
router.replace({ path: '/clips/inbox' })
</script>
