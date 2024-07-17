<template>
  <NodeViewWrapper>
    <MenuContainer placement="top" :shift="{ crossAxis: true, padding: 16 }" class="flex" :class="[props.node.attrs.align]">
      <ResizePanel :width="props.node.attrs.width" @onmouseup="changeImgWidth">
        <div class="relative">
          <div class="select-mask bg-primary-500/20 absolute inset-0 z-50 hidden" />
          <img :src="props.node.attrs.src" alt="" class="rounded block image-block" @click="selectNode">
        </div>
      </ResizePanel>
      <template #floating>
        <BubbleContainer>
          <BubbleToggleButton
            icon="i-ri-expand-width-line" :active="props.node.attrs.width === 0"
            @mousedown.stop="changeImgWidth(0)"
          />
          <MenuDivider />
          <BubbleToggleButton
            icon="i-ri-align-left" :active="props.node.attrs.align === 'justify-normal'"
            @mousedown.stop="changeAlign('justify-normal')"
          />
          <BubbleToggleButton
            icon="i-ri-align-center" :active="props.node.attrs.align === 'justify-center'"
            @mousedown.stop="changeAlign('justify-center')"
          />
          <BubbleToggleButton
            icon="i-ri-align-right" :active="props.node.attrs.align === 'justify-end'"
            @mousedown.stop="changeAlign('justify-end')"
          />
          <MenuDivider />
          <BubbleToggleButton
            icon="i-ri-draft-line" :active="props.node.attrs.desc"
            @mousedown.stop="toggleDescription(!props.node.attrs.desc)"
          />
        </BubbleContainer>
      </template>
    </MenuContainer>
    <div class="flex mt-1" :class="[props.node.attrs.align]">
      <NodeViewContent
        v-show="props.node.attrs.desc"
        class="text-sm text-gray-500 text-center" :style="{ width: props.node.attrs.width === 0 ? '100%' : `${props.node.attrs.width}px` }"
      />
    </div>
  </NodeViewWrapper>
</template>

<script setup>
import { NodeViewContent, NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import MenuContainer from '@/components/MenuContainer.vue'
import BubbleContainer from '@/components/BubbleContainer.vue'
import BubbleToggleButton from '@/components/BubbleToggleButton.vue'
import EmojiPanel from '@/components/EmojiPanel.vue'
import MenuPopper from '@/components/MenuPopper.vue'
import ResizePanel from '@/components/ResizePanel.vue'
import MenuDivider from '@/components/MenuDivider.vue'

const props = defineProps({ ...nodeViewProps })
function changeImgWidth(width) {
  const delay = width === 0 ? 10 : 0
  setTimeout(() => {
    props.updateAttributes({
      width,
    })
  }, delay)
}

function changeAlign(align) {
  props.updateAttributes({
    align,
  })
}

function toggleDescription(desc) {
  props.updateAttributes({
    desc,
  })
}
function selectNode() {
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
