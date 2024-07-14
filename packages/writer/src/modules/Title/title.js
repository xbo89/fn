import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'
import { random } from '../../utils'
import ColorfulBlock from '@/components/ColorfulBlock'
import punycode from 'punycode/'
const randomEmoji = ['0p8h', 'yp9h', '0ci', '1r8h', 'og8h', 'dk8h', 'iq9h', 'ms9h', 'lp8h']
export default Node.create({ 
  name: 'title',
  content: 'inline*',
  group: 'title',
  addAttributes() {
    return {
      emoji: { default: '0p8h' },
      emojiDisplay: { default: true },
      createdDate: { default: '2024-07-23 00:00' },
      createdDateDisplay: { default: false }
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'flex font-bold items-center space-x-1'
      }),
      [
        'div',
        {
          class: `title-emoji w-7 h-7 rounded ${HTMLAttributes.emojiDisplay ? '' : 'hidden'}`
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