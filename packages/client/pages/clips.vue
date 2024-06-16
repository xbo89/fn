<template>
  <div class="w-full h-full flex">
    <Sidebar />
    <CardEditor />
    <div class="md:w-[300px] lg:w-[500px] flex-shrink-0 h-full relative overflow-hidden">
      <NuxtPage />
    </div>
    <UNotifications />
  </div>
</template>
<script setup>
  const router = useRouter()
  router.replace({ path: '/clips/inbox' })
</script>