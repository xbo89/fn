import { Plugin, PluginKey } from '@tiptap/pm/state'
import { absoluteRect, nodeDOMAtCoords } from './dragHandleUtils.js'

class DragHandleView {
  constructor({ view, element, editor }) {
    this.view = view
    this.element = element
    this.editor = editor
    this.element.style.position = 'fixed'
    this.element.draggble = true
    this.element.dataset.dragHandle = ''
    this.element.classList.add('drag-handle')
    // this.element.addEventListener('dragstart', this.mousedownHandler)
  }
}

export function DragHandlePlugin({ editor, element, pluginKey }) {
  return new Plugin({
    key: new PluginKey(pluginKey),
    view: view => new DragHandleView({ view, editor, element }),
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {
          if (!view.editable)
            return
          // 找到当前坐标所对应的 Html 元素
          const node = nodeDOMAtCoords({
            x: event.clientX,
            y: event.clientY,
          })
          // 计算当前 node 的准确边界坐标
          const rect = absoluteRect(node)

          element.style.left = `${rect.left - element.offsetWidth}px`
          element.style.top = `${rect.top}px`
        },
        keydown: (view, event) => {
          console.log(event.key)
          if (event.key === 'Enter' || event.key === 'Backspace' || event.key === 'ArrowUp' || event.key === 'ArrowDown' && view.editable) {
            setTimeout(() => {
              const { state } = view
              const { $from } = state.selection
              // const parentNode = $from.node($from.depth)
              const node = view.nodeDOM($from.before($from.depth))
              const rect = absoluteRect(node)

              element.style.left = `${rect.left - element.offsetWidth}px`
              element.style.top = `${rect.top}px`
            }, 10)
          }
          return false
        },
        dragstart: (view) => {

        },
        drop: (view, event) => {

        },
      },
    },
  })
}
