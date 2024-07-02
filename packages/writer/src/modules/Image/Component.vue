<template>
  <NodeViewWrapper class="image-block relative">
    <div class="select-mask bg-primary-500/40 absolute inset-0 z-50 hidden"></div>
    <ResizePanel @onmouseup="changeImgWidth">
      <img :src="props.node.attrs.src" alt="" class="rounded block">
    </ResizePanel>
    <NodeViewContent class="text-sm text-gray-500" />
  </NodeViewWrapper>
</template>
<script setup>
  import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
  import MenuContainer from '@/components/MenuContainer.vue'
  import BubbleContainer from '@/components/BubbleContainer.vue'
  import BubbleToggleButton from '@/components/BubbleToggleButton.vue'
  import EmojiPanel from '@/components/EmojiPanel.vue'
  import MenuPopper from '@/components/MenuPopper.vue'
  import ResizePanel from '@/components/ResizePanel.vue'

  const props = defineProps({ ...nodeViewProps })
  const changeImgWidth = (width) => {
    props.updateAttributes({
      defaultWidth: width,
    })
  }
</script>
<style>
  .ProseMirror-selectednode.image-block {
    @apply outline outline-2 rounded outline-primary-500;
  }

  .ProseMirror-selectednode .select-mask {
    display: block;
  }
</style>