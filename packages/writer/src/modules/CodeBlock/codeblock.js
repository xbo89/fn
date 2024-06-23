import { Node, mergeAttributes } from '@tiptap/core'
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
  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      { class: 'codeblock bg-gray-50 dark:bg-gray-900 rounded-lg overflow-auto border dark:border-gray-800 my-2 relative before:block before:absolute before:right-5 before:top-2 before:text-xl before:text-gray-400 hover:before:text-gray-50' },
      [
        'pre',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        [
          'code',
          {
            class: 'language-' + node.attrs.language
          },
          0,
        ],
      ]
    ]
  },

  addProseMirrorPlugins() {
    return [
      CodeblockPlugin()
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-c': () => this.editor.commands.toggleCodeBlock()
    }
  },
})