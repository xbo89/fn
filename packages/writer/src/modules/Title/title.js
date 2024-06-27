import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'
import { random } from '../../utils'
import ColorfulBlock from '../../components/ColorfulBlock'
import punycode from 'punycode/'
const randomEmoji = ['0p8h', 'yp9h', '0ci', '1r8h', 'og8h', 'dk8h', 'iq9h', 'ms9h', 'lp8h']
export default Node.create({
  name: 'title',
  content: 'inline*',
  group: 'title',
  addAttributes() {
    return {
      emoji: { default: '0p8h' },
      emojiDisplay: { default: false },
      cover: {
        default: {
          content: '',
          display: false
        }
      },
      documentInfo: {
        default: {
          createdDate: '',
          wordCount: 0,
          display: false
        }
      }
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      { class: 'title' },
      0
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
})