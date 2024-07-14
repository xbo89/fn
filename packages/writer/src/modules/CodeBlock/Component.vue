<template>
  <NodeViewWrapper
    class="codeblock bg-gray-50 dark:bg-gray-900 rounded-lg overflow-auto border dark:border-gray-800 my-2 relative before:block before:absolute before:right-5 before:top-2 before:text-xl before:text-gray-400 hover:before:text-gray-500"
    :data-language="props.node.attrs.language">
    <div class="codeblock-toolbar border-b flex justify-between items-center p-1 px-3">
      <MenuContainer :teleport="true" placement="bottom-start">
        <div class="inline-flex space-x-2 items-center hover:bg-gray-200 rounded-lg px-2 h-8 text-sm cursor-pointer">
          <i :class="[props.node.attrs.languageIcon]" />
          <span>{{props.node.attrs.language}}</span>
        </div>
        <template #floating>
          <BubbleContainer class="w-[400px] h-60 relative overflow-hidden">
            <LanguagePicker @onselect="changeLanguage" :selectLanguage="props.node.attrs.language" />
          </BubbleContainer>
        </template>
      </MenuContainer>
      <div class="codeblock-actions flex items-center space-x-1">
        <BubbleToggleButton icon="i-ri-text-wrap" @mousedown="toggleWrap(!props.node.attrs.wrap)"
          :active="props.node.attrs.wrap" />
        <BubbleToggleButton :icon="copied?'i-ri-checkbox-circle-fill':'i-ri-clipboard-line'" @click="handlecopy" />
      </div>
    </div>
    <pre><SimpleBar data-simplebar-auto-hide="false" ref="simplebarElement" class="w-full whitespace-normal pb-3"><NodeViewContent ref="codeElement" as="code"  :class="['hljs',props.node.attrs.wrap ? '!whitespace-pre-wrap' : '!whitespace-pre',`${props.node.attrs.languageClassPrefix}${props.node.attrs.language}`]"/></SimpleBar></pre>
  </NodeViewWrapper>
</template>
<script setup>
  import MenuDivider from '@/components/MenuDivider.vue'
  import MenuContainer from '@/components/MenuContainer.vue'
  import BubbleContainer from '@/components/BubbleContainer.vue'
  import BubbleToggleButton from '@/components/BubbleToggleButton.vue' 
  import MenuPopper from '@/components/MenuPopper.vue'
  import LanguagePicker from './LanguagePicker.vue'

  import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
  import { ref } from 'vue'
  import { useClipboard } from '@vueuse/core'

  import SimpleBar from 'simplebar-vue'
  import 'simplebar-vue/dist/simplebar.min.css'

  const props = defineProps({ ...nodeViewProps })
 
  const codeElement = ref(null)
  const source = ref('')
  const { copy, copied, isSupported } = useClipboard({
    source
  })

  const handlecopy = () => {
    source.value = codeElement.value.$el.innerText
    copy(source.value)
  }

  const changeLanguage = ({ language, languageIcon }) => {
    props.updateAttributes({
      language,
      languageIcon
    })
  }
  const toggleWrap = (wrap) => {
    props.updateAttributes({
      wrap
    })
  }
  const copyCode = () => {

  }
</script>