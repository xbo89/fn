<template>
  <div class="list w-full h-full bg-gray-100 flex">
    <h1 class="text-2xl font-bold">inbox</h1>

  </div>
</template>
<script setup>
  const { data: { user, error } } = await $fetch('/api-v1/auth/islogin')
  console.log(user)
</script>