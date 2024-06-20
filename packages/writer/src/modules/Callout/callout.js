import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'

export default Node.create({
  name: 'callout',
  content: '(paragraph|heading|blockquote)+',
  group: 'block',
  addCommands() {
    return {
      toggleCallout: (attributes) => ({ commands }) => {
        return commands.toggleWrap(this.name, attributes)
      },
    }
  },
  addOptions() {
    return {
      element: null,
      pluginKey: 'bubbleMenu',
      updateDelay: undefined
    }
  },
  addAttributes() {
    // Return an object with attribute configuration
    return {
      textColor: { default: '' },
      border: { default: '#2EA121' },
      borderSize: { default: 1 },
      borderStyle: { default: 'solid' },
      background: { default: '#C5F1C1' },
      emoji: { default: '0p8h' }
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
})