<template>
  <NodeViewWrapper>
    <MenuContainer placement="top" :shift="{crossAxis: true,padding: 16}" :class="['flex',props.node.attrs.align]">
      <ResizePanel @onmouseup="changeImgWidth" :width="props.node.attrs.width">
        <div class="relative">
          <div class="select-mask bg-primary-500/40 absolute inset-0 z-50 hidden"></div>
          <img :src="props.node.attrs.src" alt="" class="rounded block image-block" @click="selectNode">
        </div>
      </ResizePanel>
      <template #floating>
        <BubbleContainer>
          <BubbleToggleButton icon="i-ri-expand-width-line" @mousedown="changeImgWidth(0)"
            :active="props.node.attrs.width===0" />
          <MenuDivider />
          <BubbleToggleButton icon="i-ri-align-left" @mousedown="changeAlign('justify-normal')"
            :active="props.node.attrs.align==='justify-normal'" />
          <BubbleToggleButton icon="i-ri-align-center" @mousedown="changeAlign('justify-center')"
            :active="props.node.attrs.align==='justify-center'" />
          <BubbleToggleButton icon="i-ri-align-right" @mousedown="changeAlign('justify-end')"
            :active="props.node.attrs.align==='justify-end'" />
          <MenuDivider />
          <BubbleToggleButton icon="i-ri-draft-line" @mousedown="toggleDescription(!props.node.attrs.desc)"
            :active="props.node.attrs.desc" />
        </BubbleContainer>
      </template>
    </MenuContainer>
    <div :class="['flex mt-1',props.node.attrs.align]">
      <NodeViewContent class="text-sm text-gray-500 text-center"
        :style="{width:props.node.attrs.width===0?'100%':props.node.attrs.width+'px'}" v-show="props.node.attrs.desc" />
    </div>
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
  import MenuDivider from '@/components/MenuDivider.vue'
  // import MenuContainer from '@/components/MenuContainer.vue'
  // import BubbleContainer from '@/components/BubbleContainer.vue'
  // import BubbleToggleButton from '@/components/BubbleToggleButton.vue'
  // import MenuPopper from '@/components/MenuPopper.vue'


  const props = defineProps({ ...nodeViewProps })
  const changeImgWidth = (width) => {
    const delay = width === 0 ? 10 : 0
    setTimeout(() => {
      props.updateAttributes({
        width
      })
    }, delay)

  }

  const changeAlign = (align) => {
    props.updateAttributes({
      align
    })
  }

  const toggleDescription = (desc) => {
    props.updateAttributes({
      desc
    })
  }
  const selectNode = () => {
    setTimeout(() => {
      props.editor.commands.setNodeSelection(props.getPos())
    }, 100)
  }
</script>
<style>
  .ProseMirror-selectednode .image-block {
    @apply outline outline-2 rounded outline-primary-500;
  }

  .ProseMirror-selectednode .select-mask {
    display: block;
  }
</style>