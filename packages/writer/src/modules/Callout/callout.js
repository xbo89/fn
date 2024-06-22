import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'
import { random } from '../../utils'
import ColorfulBlock from '../../components/ColorfulBlock'
function randomColor() {
  return ColorfulBlock[random(0, ColorfulBlock.length - 1)].variants.light
}
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
    const color = randomColor()
    return {
      textColor: { default: '' },
      border: { default: color.border },
      borderSize: { default: 1 },
      borderStyle: { default: 'solid' },
      background: { default: color.background },
      emoji: { default: '0p8h' }
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
})