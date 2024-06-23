import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'
import { random } from '../../utils'
import ColorfulBlock from '../../components/ColorfulBlock'
import punycode from 'punycode/'
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
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'callout border p-3 rounded-lg flex my-2 items-start space-x-2',
        style: `border-color:${HTMLAttributes.border};background:${HTMLAttributes.background};color:${HTMLAttributes.textColor}`
      }),
      [
        'div',
        {
          class: 'callout-emoji w-7 h-7 rounded'
        },
        punycode.decode(HTMLAttributes.emoji)
      ],
      [
        'div',
        {},
        0,
      ],
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
})