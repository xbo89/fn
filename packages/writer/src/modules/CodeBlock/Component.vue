<template>
  <NodeViewWrapper
    class="codeblock bg-gray-50 dark:bg-gray-900 rounded-lg overflow-auto border dark:border-gray-800 my-2 relative before:block before:absolute before:right-5 before:top-2 before:text-xl before:text-gray-400 hover:before:text-gray-500"
    :data-language="props.node.attrs.language">
    <MenuContainer placement="top" :shift="{crossAxis: true,padding: 16}">
      <pre
        :class="[props.node.attrs.wrap ? 'pre-wrap' : '']"><NodeViewContent as="code" :class="[`${props.node.attrs.languageClassPrefix}${props.node.attrs.language}`]"/></pre>
      <template #floating>
        <BubbleContainer>
          <MenuContainer :teleport="false">
            <div
              class="inline-flex space-x-2 items-center hover:bg-gray-200 rounded-lg px-2 h-8 text-sm cursor-pointer">
              <i class="i-devicon-javascript" />
              <span>{{props.node.attrs.language}}</span>
            </div>
            <template #floating>
              <BubbleContainer class="w-[400px] h-60 relative overflow-hidden">
                <LanguagePicker />
              </BubbleContainer>
            </template>
          </MenuContainer>
          <MenuDivider />
          <BubbleToggleButton icon="i-ri-text-wrap" />
          <BubbleToggleButton icon="i-ri-clipboard-line" />
        </BubbleContainer>
      </template>
    </MenuContainer>
  </NodeViewWrapper>
</template>
<script setup>
  import MenuDivider from '../../components/MenuDivider.vue'
  import MenuContainer from '../../components/MenuContainer.vue'
  import BubbleContainer from '../../components/BubbleContainer.vue'
  import BubbleToggleButton from '../../components/BubbleToggleButton.vue'
  import MenuPopper from '../../components/MenuPopper.vue'
  import LanguagePicker from './LanguagePicker.vue'

  import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
  const props = defineProps({ ...nodeViewProps })
</script>