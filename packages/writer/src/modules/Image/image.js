import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'
import { random } from '@/utils'
import ColorfulBlock from '@/components/ColorfulBlock'
import punycode from 'punycode/'
import { ImagePlugin } from './ImagePlugin.js'
function randomColor() {
  return ColorfulBlock[random(0, ColorfulBlock.length - 1)].variants.light
}
export default Node.create({
  name: 'image',
  content: 'inline*',
  group: 'block',
  addCommands() {
    return {
      toggleImage: (attributes) => ({ commands }) => {
        return commands.toggleWrap(this.name, attributes)
      },
    }
  },
  addOptions() {
    return {
      pluginKey: 'bubbleMenu'
    }
  },
  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: '' },
      defaultWidth: { default: 0 },
      align: { default: 'center' },
      desc: { default: false }
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      {},
      0
    ]
  },
  addProseMirrorPlugins() {
    return [
      ImagePlugin({
        editor: this.editor,
        pluginKey: this.options.pluginKey
      })
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
})