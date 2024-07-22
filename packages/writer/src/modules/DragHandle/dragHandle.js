import { Extension } from '@tiptap/core'
import { DragHandlePlugin } from './dragHandlePlugin'

const GlobalDragHandle = Extension.create({
  name: 'globalDragHandle',

  addOptions() {
    return {
      dragHandleWidth: 20,
      scrollTreshold: 100,
    }
  },

  addProseMirrorPlugins() {
    return [
      DragHandlePlugin({
        pluginKey: 'globalDragHandle',
        dragHandleWidth: this.options.dragHandleWidth,
        scrollTreshold: this.options.scrollTreshold,
        dragHandleSelector: this.options.dragHandleSelector,
      }),
    ]
  },
})

export default GlobalDragHandle
