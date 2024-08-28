<template>
  <div class="login w-full h-full flex justify-center items-center">
    <div
      class="login-container border border-gray-200 dark:border-gray-800  rounded-2xl flex-col items-center inline-flex p-8 space-y-2 dark:bg-gray-950">
      <NuxtLink class="flex items-center space-x-2 w-full hover:dark:bg-gray-900 rounded-xl" to="/">
        <i class="ri-arrow-left-line text-gray-400"></i>
        <span>Back</span>
      </NuxtLink>
      <h1 class="text-2xl font-bold w-full">FloatNote Login</h1>
      <div>
        <span class="text-sm text-gray-400">login with:</span>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <LoginPlatformButton :platform="'Google'" />
          <LoginPlatformButton :platform="'Github'" />
          <LoginPlatformButton :platform="'Twitter'" />
          <LoginPlatformButton :platform="'Facebook'" />
          <LoginPlatformButton :platform="'Apple'" />
          <LoginPlatformButton :platform="'Figma'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const user = useSupabaseUser()
  const router = useRouter()

  watchEffect(() => {
    if (user.value) {
      router.push('/clips/inbox')
    }
  })

</script>
<style>

</style>