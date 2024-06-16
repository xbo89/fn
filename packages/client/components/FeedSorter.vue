<template>
  <div class="p-2 w-96">
    <div class="flex space-x-4 mb-4">
      <USelectMenu v-model="sortSelected" :options="sort" :popper="uiConfigure" :uiMenu="uiMenuConfigure" />
    </div>
  </div>
</template>
<script setup>
  const sort = ['Created Date', 'Updated Date']
  const sortSelected = ref(sort[0])

  const uiConfigure = ref({
    placement: 'bottom', strategy: 'fixed', offsetDistance: 4
  })
  const uiMenuConfigure = ref({
    width: 'w-48'
  })
</script>
<style>

</style>