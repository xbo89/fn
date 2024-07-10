<template>
  <NodeViewWrapper class="mt-6 ">
    <MenuContainer placement="top">
      <div class="flex font-bold items-center space-x-1">
        <MenuContainer placement="bottom-start" v-if="props.node.attrs.emojiDisplay">
          <div
            class="title-emoji w-7 h-7 rounded text-xl hover:bg-gray-950/10 cursor-pointer inline-flex justify-center items-center">
            {{ punycode.decode(props.node.attrs.emoji) }}
          </div>
          <template #floating>
            <EmojiPanel @selectEmoji="changeEmoji" />
          </template>
        </MenuContainer>
        <NodeViewContent class="flex-1 relative text-xl" />

      </div>
      <template #floating>
        <div class="space-x-1 flex">
          <DisplayButton :icon="props.node.attrs.emojiDisplay?'i-ri-emotion-fill':'i-ri-emotion-line'"
            :active="props.node.attrs.emojiDisplay" @mousedown.stop="toggleEmoji">Emoji</DisplayButton>
          <DisplayButton :icon="props.node.attrs.createdDateDisplay?'i-ri-file-info-fill':'i-ri-file-info-line'"
            :active="props.node.attrs.createdDateDisplay" @mousedown="toggleCreatedDate">Document info
          </DisplayButton>
        </div>
      </template>
    </MenuContainer>
    <div class="doc-info text-sm text-gray-500 py-2 flex items-center space-x-4"
      v-if="props.node.attrs.createdDateDisplay">
      <div class="inline-flex items-center space-x-1">
        <i class="i-ri-time-line" /> <span>{{props.node.attrs.createdDate}}</span>
      </div>
      <div class="inline-flex items-center space-x-1">
        <i class="i-ri-markup-line" />
        <span>{{ props.editor.storage.characterCount.characters() }}</span>
        <!-- <span>{{ props.editor.storage.characterCount.words() }}</span> -->
      </div>
    </div>
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
  const toggleCreatedDate = () => {
    props.updateAttributes({
      createdDateDisplay: !props.node.attrs.createdDateDisplay
    })
  }
</script>
<style>
  .tiptap div.is-empty:first-child::after {
    color: #adb5bd;
    content: attr(data-placeholder);
    position: absolute;
    left: v-bind(props.node.attrs.emojiDisplay?'34px':'0');
    top: 2px;
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