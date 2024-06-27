<template>
  <NodeViewWrapper class="mt-6 h-7">
    <MenuContainer placement="top">
      <div class="flex font-bold items-center space-x-1">
        <MenuContainer placement="bottom-start">
          <div
            class="title-emoji w-7 h-7 rounded text-xl hover:bg-gray-950/10 cursor-pointer inline-flex justify-center items-center"
            v-if="props.node.attrs.emojiDisplay">
            {{ punycode.decode(props.node.attrs.emoji) }}
          </div>
          <template #floating>
            <EmojiPanel @selectEmoji="changeEmoji" />
          </template>
        </MenuContainer>
        <NodeViewContent class="flex-1 relative" />
      </div>
      <template #floating>
        <div class="space-x-1 flex">
          <DisplayButton icon="i-ri-emotion-line" :active="props.node.attrs.emojiDisplay" @mousedown.stop="toggleEmoji">
            {{props.node.attrs.emojiDisplay?'hide':'show'}} emoji</DisplayButton>
          <DisplayButton icon="i-ri-file-info-line">show document info</DisplayButton>
        </div>
      </template>
    </MenuContainer>
  </NodeViewWrapper>
</template>
<script setup>
  import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
  import MenuContainer from '../../components/MenuContainer.vue'
  import BubbleContainer from '../../components/BubbleContainer.vue'
  import BubbleToggleButton from '../../components/BubbleToggleButton.vue'
  import EmojiPanel from '../../components/EmojiPanel.vue'
  import MenuPopper from '../../components/MenuPopper.vue'
  import DisplayButton from './Button.vue'
  import punycode from 'punycode/'

  const props = defineProps({ ...nodeViewProps })

  const changeEmoji = (emoji) => {
    props.updateAttributes({
      emoji: punycode.encode(emoji),
    })
  }
  const toggleEmoji = (emoji) => {
    props.updateAttributes({
      emojiDisplay: !props.node.attrs.emojiDisplay
    })
  }
</script>
<style>
  .tiptap div.is-empty:first-child::after {
    color: #adb5bd;
    content: attr(data-placeholder);
    position: absolute;
    left: 34px;
    pointer-events: none;
  }

  .tiptap .is-empty:nth-child(2):before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
</style>