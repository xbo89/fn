import { Plugin, PluginKey } from '@tiptap/pm/state'
import { absoluteRect, nodeDOMAtCoords, nodePosAtDOM, setDOMStyle } from './dragHandleUtils.js'

class DragHandleView {
  constructor({ view, element, editor }) {
    this.view = view
    this.element = element
    this.editor = editor
    this.element.dataset.dragHandle = ''
    // this.element.addEventListener('dragstart', this.mousedownHandler)
  }
}
function debounce(fn, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
export function DragHandlePlugin({ editor, element, pluginKey }) {
  const padding = 10
  const timer = null
  return new Plugin({
    key: new PluginKey(pluginKey),
    view: view => new DragHandleView({ view, editor, element }),
    props: {
      handleDOMEvents: {
        mouseenter: () => {
          editor.dragHandle.show()
        },
        // mouseleave: () => {
        //   editor.dragHandle.hide()
        // },
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
          const pmNode = view.state.doc.nodeAt(nodePosAtDOM(node, view))
          // debounce(handleMouseMove, 200);
          // const myNodePos = editor.$pos(nodePosAtDOM(node, view))
          console.log(pmNode)
          setDOMStyle(element, rect, padding)
        },
        keydown: (view, event) => {
          const arrowKeyArr = ['Enter', 'Backspace', 'ArrowUp', 'ArrowDown']
          if (arrowKeyArr.includes(event.key) && view.editable) {
            setTimeout(() => {
              const { state } = view
              const { $from } = state.selection
              // const parentNode = $from.node($from.depth)
              const node = view.nodeDOM($from.before($from.depth))
              const rect = absoluteRect(node)
              const pmNode = $from.node(1)
              const nodeName = pmNode.type.name
              const isEmptyNode = pmNode.textContent.trim() === ''
              // console.log(nodePosAtDOM(node, view))
              setDOMStyle(element, rect, padding)
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
