import {
  Editor, isNodeSelection, isTextSelection, posToDOMRect,
} from '@tiptap/core'
import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { computePosition, inline, flip, autoUpdate, shift, offset } from '@floating-ui/dom'

export class BubbleMenuView {
  constructor({ view, element, editor, updateDelay = 300 }) {
    this.view = view
    this.element = element
    this.editor = editor
    this.updateDelay = updateDelay
    this.virtualEl = {}
    autoUpdate(this.virtualEl, this.element, this.updatePosition.bind(this))

    this.editor.on('blur', () => {
      this.element.style.display = 'none'
    })
  }

  createVirtualEl(view) {
    const { state } = view
    const { from, to } = state.selection
    const start = view.domAtPos(from);
    const end = view.domAtPos(to);
    // 创建一个 Range 对象
    const range = document.createRange();
    range.setStart(start.node, start.offset);
    range.setEnd(end.node, end.offset);
    this.virtualEl = {
      getBoundingClientRect: () => range.getBoundingClientRect(),
      getClientRects: () => range.getClientRects()
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
        offset(6)
      ]
    }).then(({ x, y }) => {
      Object.assign(this.element.style, {
        position: 'absolute',
        left: `0px`,
        top: `0px`,
        transform: `translate(${x}px, ${y}px)`,
        willChange: 'transform'
      });
    })
  }

  update(view, oldState) {
    const { state } = view
    const hasValidSelection = state.selection.from !== state.selection.to

    if (this.updateDelay > 0 && hasValidSelection) {
      this.handleDebouncedUpdate(view, oldState)
      return
    }
    this.element.style.display = 'none'
  }

  handleDebouncedUpdate(view, oldState) {

    const selectionChanged = !oldState?.selection.eq(view.state.selection)
    const docChanged = !oldState?.doc.eq(view.state.doc)

    if (!selectionChanged && !docChanged) {
      return
    }

    if (this.updateDebounceTimer) {
      clearTimeout(this.updateDebounceTimer)
    }

    this.updateDebounceTimer = setTimeout(() => {
      this.updateHandler(view, selectionChanged, docChanged, oldState)
      this.element.style.display = 'block'
    }, this.updateDelay)
  }

  updateHandler(view, selectionChanged, docChanged, oldState) {
    console.log('hide')
    const { state, composing } = view
    const { selection } = state

    const isSame = !selectionChanged && !docChanged

    if (composing || isSame) {
      return
    }

    this.updatePosition()
  }

}

export const BubbleMenuPlugin = (options) => {
  return new Plugin({
    view: view => new BubbleMenuView({ view, ...options })
  })
}