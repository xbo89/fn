import { Plugin, PluginKey } from '@tiptap/pm/state'

class DragHandleView {
  constructor({ view, element, editor }) {
    this.view = view
    this.element = element
    this.editor = editor

    this.element.draggble = true
    this.element.dataset.dragHandle = ''
    this.element.classList.add('drag-handle')
    this.element.addEventListener('dragstart', this.mousedownHandler)
  }
}

export function DragHandlePlugin({ editor, element, pluginKey }) {
  return new Plugin({
    key: new PluginKey(pluginKey),
    view: view => new DragHandleView({ view, editor, element }),
  })
}
