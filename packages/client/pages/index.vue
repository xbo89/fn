<template>
  <h1>index</h1>
  <div class="border cursor-pointer" @click="testFetch">test fetch</div>
</template>
<script setup>
  // const data = await useFetch('/api/auth')
  // console.log(data.value)
  // const testFetch = async () => {
  //   const data = await $fetch('/login', {
  //     baseURL: "/api-v1",
  //   })
  //   console.log(data)
  //   window.location = data.url
  // }
  // https://github.com/orgs/supabase/discussions/2532
  // const testFetch = async () => {
  //   const data = await $fetch('/api/auth')
  //   console.log(data)
  // }
  const testFetch = async () => {
    // const data = await $fetch('/api/auth')
    // console.log(data)
    window.location = 'https://enxogxbtvgjpbybgllxw.supabase.co/auth/v1/authorize?provider=google&redirect_to=http%3A%2F%2Flocalhost%3A3000%2Flogin%2F'
  }
</script>
<style>

</style>