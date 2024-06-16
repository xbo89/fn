<template>
  <UButtonGroup size="sm" orientation="horizontal">
    <USelectMenu v-model="selected" :options="views" />
    <div>
      <UDropdown :items="items" :popper="uiConfigure">
        <UButton color="gray" icon="i-ri-list-settings-line" />
      </UDropdown>
    </div>
  </UButtonGroup>
</template>
<script setup>
  const items = [
    [{
      label: 'Rename View',
      icon: 'i-ri-input-field'
    }, {
      label: 'Duplicate View',
      icon: 'i-ri-file-copy-fill'
    }, {
      label: 'Save As',
      icon: 'i-ri-save-2-fill'
    }],
    [{
      label: 'Delete view',
      icon: 'i-ri-delete-bin-fill',
      class: 'group/delete hover:text-red-500 hover:bg-red-100 hover:dark:text-red-500 hover:dark:bg-red-950',
      iconClass: 'group-hover/delete:text-red-500 group-hover/delete:dark:text-red-500'
    }]
  ]
  const views = ['Default View']
  const selected = ref(views[0])
  const uiConfigure = ref({
    offsetDistance: 4,
    placement: 'bottom-end',
  })
</script>