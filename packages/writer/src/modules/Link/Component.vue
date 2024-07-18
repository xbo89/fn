<template>
  <a :href="nodeViewProps.node.attrs.href" :rel="nodeViewProps.node.attrs.rel">
    <MenuContainer placement="top" class="inline-block">
      <span class="link-mark underline decoration-primary-50 underline-offset-4" data-nodeview-content />
      <template #floating>
        <BubbleContainer class="flex space-x-2">
          <input
            v-model="link" type="text" placeholder="Url" autofocus class="relative block w-72 disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            @mousedown.stop
          >
          <BubbleToggleButton v-show="!isEdit" icon="i-ri-edit-box-line" @mousedown="editLinkHref" />
          <BubbleToggleButton icon="i-ri-delete-bin-6-line" @mousedown="deleteLinkHref" />
        </BubbleContainer>
      </template>
    </MenuContainer>
  </a>
</template>

<script setup>
import { computed, ref } from 'vue'
import MenuContainer from '@/components/MenuContainer.vue'
import BubbleContainer from '@/components/BubbleContainer.vue'
import BubbleToggleButton from '@/components/BubbleToggleButton.vue'

const props = defineProps({
  nodeViewProps: {
    type: Object,
  },
})

const link = ref(props.nodeViewProps.node.attrs.href)
const isEdit = computed(() => {
  return link.value === props.nodeViewProps.node.attrs.href
})
function editLinkHref() {
  props.nodeViewProps.editor
    .chain()
    .extendMarkRange('link')
    .updateAttributes('link', {
      href: link.value,
    })
    .run()
  props.nodeViewProps.editor.commands.focus('end')
}
function deleteLinkHref() {
  props.nodeViewProps.editor.chain().focus().unsetLink().run()
}
</script>
