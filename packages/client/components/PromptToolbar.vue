<template>
  <div
    class="py-4 sm:px-6 md:px-8 lg:px-8 absolute bottom-0 flex flex-col justify-center items-center inset-x-0 bg-gradient-to-t from-gray-100 from-60% dark:from-gray-900 to-gray-100/0 ">
    <div
      class="border rounded-3xl w-full min-w-[300px] max-w-[600px] bg-white pl-6 py-2 p-2 flex items-center dark:bg-gray-900 dark:border-gray-800 shadow-2xl">
      <UTextarea :padded="false" placeholder="post message to your card" variant="none" class="w-full" model-value=""
        :rows="1" autoresize />
      <div
        class="cursor-pointer flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 inline-flex justify-center items-center">
        <UIcon name="i-ri-arrow-up-line" />
      </div>
    </div>
    <p class="text-xs mt-2 text-gray-500 dark:text-gray-500 truncate">LLM can make mistakes. Check important info.</p>
  </div>
</template>
<script setup>
  const aa = () => {
    alert('a')
  }
</script>
<style>

</style>