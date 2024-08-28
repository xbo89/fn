<template>
  <div class="p-2 w-96">
    <div class="flex space-x-4 mb-4">
      <USelectMenu v-model="conditionSelected" :options="condition" :popper="uiConfigure" :uiMenu="uiMenuConfigure" />
      <div class="flex space-x-1">
        <USelectMenu v-model="operatorsSelected" :options="operators" :popper="uiConfigure" :uiMenu="uiMenuConfigure" />
        <UInput v-model="value" />
      </div>
    </div>
    <UButton size="xs" color="white" variant="solid" icon="i-ri-add-fill">Add Condition</UButton>
  </div>
</template>
<script setup>
  const condition = ['Keyword', 'Tag']
  const operators = ['is', 'is not', 'contains', 'does not contain', 'is empty', 'is not empty']
  const conditionSelected = ref(condition[0])
  const operatorsSelected = ref(operators[0])

  const uiConfigure = ref({
    placement: 'bottom', strategy: 'fixed', offsetDistance: 4
  })
  const uiMenuConfigure = ref({
    width: 'w-48'
  })
  const conditionList = ref([])
</script>
<style>

</style>