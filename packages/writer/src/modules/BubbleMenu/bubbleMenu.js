import { Extension } from '@tiptap/core'
import { BubbleMenuPlugin } from './bubbleMenuPlugin'

export const BubbleMenu = Extension.create({
  name: 'bubbleMenu',
  addOptions() {
    return {
      element: null,
      pluginKey: 'bubbleMenu',
      updateDelay: 0,
    }
  },
  addProseMirrorPlugins() {
    return [
      BubbleMenuPlugin({
        element: this.options.element,
        editor: this.editor,
        pluginKey: this.options.pluginKey,
        updateDelay: this.options.updateDelay,
      }),
    ]
  },
})
