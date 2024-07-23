// @ts-ignore
// import { __serializeForClipboard } from 'tiptap/pm/view'
// import { NodeSelection, TextSelection } from '@tiptap/pm/state'
export function absoluteRect(node) {
  const data = node.getBoundingClientRect()
  const modal = node.closest('[role="dialog"]')

  if (modal && window.getComputedStyle(modal).transform !== 'none') {
    const modalRect = modal.getBoundingClientRect()

    return {
      top: data.top - modalRect.top,
      left: data.left - modalRect.left,
      width: data.width,
    }
  }
  return {
    top: data.top,
    left: data.left,
    width: data.width,
  }
}

export function nodeDOMAtCoords(coords) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      elem =>
        elem.parentElement.matches('.ProseMirror')
        || elem.matches(
          [
            'li',
            'p:not(:first-child)',
            'pre',
            'blockquote',
            'h1, h2, h3, h4, h5, h6',
          ].join(', '),
        ),
    )
}

export function nodePosAtDOM(
  node,
  view,
  options,
) {
  const boundingRect = node.getBoundingClientRect()

  return view.posAtCoords({
    left: boundingRect.left + 50 + options.dragHandleWidth,
    top: boundingRect.top + 1,
  }).inside
}

export function calcNodePos(pos, view) {
  const $pos = view.state.doc.resolve(pos)
  if ($pos.depth > 1)
    return $pos.before($pos.depth)
  return pos
}

// let listType = ''
// export function handleDragStart(event, view, options) {
//   view.focus()

//   if (!event.dataTransfer)
//     return

//   const node = nodeDOMAtCoords({
//     x: event.clientX + 50 + options.dragHandleWidth,
//     y: event.clientY,
//   })

//   if (!(node instanceof Element))
//     return

//   let draggedNodePos = nodePosAtDOM(node, view, options)
//   if (draggedNodePos == null || draggedNodePos < 0)
//     return
//   draggedNodePos = calcNodePos(draggedNodePos, view)

//   const { from, to } = view.state.selection
//   const diff = from - to

//   const fromSelectionPos = calcNodePos(from, view)
//   let differentNodeSelected = false

//   const nodePos = view.state.doc.resolve(fromSelectionPos)

//   // Check if nodePos points to the top level node
//   if (nodePos.node().type.name === 'doc') {
//     differentNodeSelected = true
//   }
//   else {
//     const nodeSelection = NodeSelection.create(
//       view.state.doc,
//       nodePos.before(),
//     )

//     // Check if the node where the drag event started is part of the current selection
//     differentNodeSelected = !(
//       draggedNodePos + 1 >= nodeSelection.$from.pos
//       && draggedNodePos <= nodeSelection.$to.pos
//     )
//   }
//   let selection = view.state.selection
//   if (
//     !differentNodeSelected
//     && diff !== 0
//     && !(view.state.selection instanceof NodeSelection)
//   ) {
//     const endSelection = NodeSelection.create(view.state.doc, to - 1)
//     selection = TextSelection.create(
//       view.state.doc,
//       draggedNodePos,
//       endSelection.$to.pos,
//     )
//   }
//   else {
//     selection = NodeSelection.create(view.state.doc, draggedNodePos)

//     // select complete table instead of just a row
//     if ((selection).node.type.name === 'tableRow') {
//       const $pos = view.state.doc.resolve(selection.from)
//       selection = NodeSelection.create(view.state.doc, $pos.before())
//     }
//   }
//   view.dispatch(view.state.tr.setSelection(selection))

//   // If the selected node is a list item, we need to save the type of the wrapping list e.g. OL or UL
//   if (
//     view.state.selection
//     && view.state.selection.node.type.name === 'listItem'
//   ) {
//     listType = node.parentElement.tagName
//   }

//   const slice = view.state.selection.content()
//   const { dom, text } = __serializeForClipboard(view, slice)

//   event.dataTransfer.clearData()
//   event.dataTransfer.setData('text/html', dom.innerHTML)
//   event.dataTransfer.setData('text/plain', text)
//   event.dataTransfer.effectAllowed = 'copyMove'

//   event.dataTransfer.setDragImage(node, 0, 0)

//   view.dragging = { slice, move: event.ctrlKey }
// }
