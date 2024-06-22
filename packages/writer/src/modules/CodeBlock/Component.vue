<template>
  <NodeViewWrapper class="codeblock border" :data-language="props.node.attrs.language">
    <MenuContainer>
      <pre
        :class="[props.node.attrs.wrap ? 'pre-wrap' : '']"><NodeViewContent as="code" :class="[`${props.node.attrs.languageClassPrefix}${props.node.attrs.language}`]"/></pre>
      <template #floating>
        <BubbleContainer>
          <div>{{props.node.attrs.language}}</div>
          <BubbleToggleButton icon="i-ri-text-wrap" />
          <BubbleToggleButton icon="i-ri-clipboard-line" />
        </BubbleContainer>
      </template>
    </MenuContainer>
  </NodeViewWrapper>
</template>
<script setup>
  import MenuContainer from '../../components/MenuContainer.vue'
  import BubbleContainer from '../../components/BubbleContainer.vue'
  import BubbleToggleButton from '../../components/BubbleToggleButton.vue'
  import MenuPopper from '../../components/MenuPopper.vue'
  import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
  const props = defineProps({ ...nodeViewProps })
</script>
<style>
  .codeblock.hover-decoration .line-number,
  .codeblock-selected .line-number {
    background-color: #d7ddff !important;
    color: #1500ff;
  }

  .line-number {
    display: inline-block;
    width: 60px;
    padding-right: 20px;
    text-align: right;
    color: #989898;
    user-select: none;
    margin-left: -60px;
    position: sticky;
    left: -60px;
    background-color: #f5f5f5;
  }

  .pre-wrap {
    white-space: pre-wrap;
  }

  .codeblock pre {
    overflow: auto;
    padding: 8px 0;
    padding-left: 58px;
  }

  .codeblock pre code {
    font-family: 'Fira Code VF', monospace;
    line-height: 24px;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    border: none;
    margin: 0;
    font-size: 14px;
    -webkit-font-feature-settings: 'liga' on, 'calt' on;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  .codeblock {
    background-color: #f5f5f5;
    border-radius: 10px;
    overflow: auto;
    border: 1px solid rgba(210, 210, 210, 0);
    margin: 8px 0;
  }

  .codeblock::before {
    content: attr(data-language);
    display: block;
    position: absolute;
    right: 20px;
    font-size: 18px;
    font-family: 'Fira Code', monospace;
    top: 10px;
    color: rgba(210, 210, 210, 0.4);
  }

  .codeblock:hover::before {
    color: rgba(210, 210, 210, 1);
  }
</style>