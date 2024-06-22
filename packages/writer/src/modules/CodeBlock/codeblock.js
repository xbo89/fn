import { Node } from '@tiptap/core'
import { CodeblockPlugin } from './codeblockPlugin'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'
import './style.css'

export default Node.create({
  name: 'codeBlock',
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  addOptions() {
    return {
      pluginKey: 'codeBlock',
    }
  },
  addAttributes() {
    return {
      pluginKey: 'codeBlock',
      language: { default: 'javascript' },
      languageIcon: { default: 'plaintext' },
      languageClassPrefix: { default: 'language-' },
      wrap: { default: true }
    }
  },
  addCommands() {
    return {
      toggleCodeBlock: (attributes) => ({ commands }) => {
        return commands.toggleNode(this.name, 'paragraph', attributes)
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      CodeblockPlugin()
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  }
})