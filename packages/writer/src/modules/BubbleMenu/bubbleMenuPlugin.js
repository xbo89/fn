import { Plugin } from '@tiptap/pm/state'
import { autoUpdate, computePosition, flip, inline, offset, shift } from '@floating-ui/dom'

export class BubbleMenuView {
  constructor({ view, element, editor, updateDelay = 300 }) {
    this.view = view
    this.element = element
    this.editor = editor
    this.updateDelay = updateDelay
    this.preventHide = false
    this.virtualEl = {}
    autoUpdate(this.virtualEl, this.element, this.updatePosition.bind(this))

    this.element.addEventListener('mousedown', this.mousedownHandler, { capture: true })
    this.view.dom.addEventListener('dragstart', this.dragstartHandler)
    // this.editor.on('focus', this.focusHandler)
    // this.editor.on('blur', this.blurHandler)
  }

  mousedownHandler = () => {
    this.preventHide = true
  }

  dragstartHandler = () => {
    this.hide()
  }

  focusHandler = () => {
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view))
  }

  blurHandler = ({ event }) => {
    // console.log(event)
    // console.log(event.relatedTarget && this.element.parentNode.contains(event.relatedTarget))
    // console.log(event.relatedTarget, this.element.parentNode.contains(event.relatedTarget))
    if (this.preventHide) {
      this.preventHide = false

      return
    }

    if (event.relatedTarget && this.element.parentNode.contains(event.relatedTarget)) {
      return
    }

    // this.hide()
    this.editor.bubbleMenu.hide()
  }

  createVirtualEl(view) {
    const { state } = view
    const { from, to } = state.selection
    const start = view.domAtPos(from)
    const end = view.domAtPos(to)
    // 创建一个 Range 对象
    const range = document.createRange()
    range.setStart(start.node, start.offset)
    range.setEnd(end.node, end.offset)
    this.virtualEl = {
      getBoundingClientRect: () => range.getBoundingClientRect(),
      getClientRects: () => range.getClientRects(),
    }
  }

  updatePosition() {
    this.createVirtualEl(this.view)
    computePosition(this.virtualEl, this.element, {
      placement: 'top',
      middleware: [
        inline(),
        flip(),
        shift({ padding: 16 }),
        offset(6),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.element.style, {
        position: 'absolute',
        left: `0px`,
        top: `0px`,
        transform: `translate(${x}px, ${y}px)`,
        willChange: 'transform',
      })
    })
  }

  update(view, oldState) {
    const { state } = view
    const hasValidSelection = state.selection.from !== state.selection.to

    if (this.updateDelay > 0 && hasValidSelection) {
      this.handleDebouncedUpdate(view, oldState)
      return
    }
    // this.hide()
    this.editor.bubbleMenu.hide()
  }

  handleDebouncedUpdate(view, oldState) {
    const selectionChanged = !oldState.selection.eq(view.state.selection)
    const docChanged = !oldState.doc.eq(view.state.doc)

    if (!selectionChanged && !docChanged) {
      return
    }

    if (this.updateDebounceTimer) {
      clearTimeout(this.updateDebounceTimer)
    }

    this.updateDebounceTimer = setTimeout(() => {
      this.updateHandler(view, selectionChanged, docChanged, oldState)
      // this.show()
      this.editor.bubbleMenu.show()
    }, this.updateDelay)
  }

  // show() {
  //   this.element.style.display = 'block'
  // }

  // hide() {
  //   this.element.style.display = 'none'
  // }

  updateHandler(view, selectionChanged, docChanged) {
    const { composing } = view

    const isSame = !selectionChanged && !docChanged

    if (composing || isSame) {
      return
    }

    this.updatePosition()
  }
}

export function BubbleMenuPlugin(options) {
  return new Plugin({
    view: view => new BubbleMenuView({ view, ...options }),
  })
}
