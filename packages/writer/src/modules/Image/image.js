import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import punycode from 'punycode/'
import Component from './Component.vue'
import { ImagePlugin } from './ImagePlugin.js'
import { random } from '@/utils'
import ColorfulBlock from '@/components/ColorfulBlock'

function randomColor() {
  return ColorfulBlock[random(0, ColorfulBlock.length - 1)].variants.light
}
export default Node.create({
  name: 'image',
  content: 'inline*',
  group: 'block',
  addCommands() {
    return {
      toggleImage: attributes => ({ commands }) => {
        return commands.toggleWrap(this.name, attributes)
      },
    }
  },
  addOptions() {
    return {
      pluginKey: 'bubbleMenu',
      uploadCallback: (editor, view, e) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        // 遍历文件列表
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          // 判断文件类型为图片
          if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            // 读取文件内容
            reader.onload = function (event) {
              const base64String = event.target.result
              editor.view.focus()
              editor.commands.insertContent({
                type: 'image',
                attrs: {
                  src: base64String,
                },
              })
            }
            reader.readAsDataURL(file)
          }
          else {
            console.log('忽略非图片文件：', file.name)
          }
        }
      },
    }
  },
  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: '' },
      width: { default: 0 },
      align: { default: 'justify-center' },
      desc: { default: false },
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      { class: 'image-block' },
      ['img', { src: HTMLAttributes.src, class: 'rounded', style: `width:${HTMLAttributes.width === 0 ? '' : HTMLAttributes.width}px` }],
      ['span', { class: 'text-sm text-gray-500' }, 0],
    ]
  },
  addProseMirrorPlugins() {
    return [
      ImagePlugin({
        editor: this.editor,
        pluginKey: this.options.pluginKey,
        callback: this.options.uploadCallback,
      }),
    ]
  },
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})
