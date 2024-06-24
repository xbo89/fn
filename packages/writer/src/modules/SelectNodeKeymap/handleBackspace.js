import {
  chainCommands,
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock,
  deleteSelection,
  joinBackward,
  selectNodeBackward,
  setBlockType,
  lift
} from '@tiptap/pm/commands'

// import { schema } from './schemas.js'
import { NodeSelection } from '@tiptap/pm/state'

export function findCutBefore($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (let i = $pos.depth - 1; i >= 0; i--) {
      if ($pos.index(i) > 0) {
        return $pos.doc.resolve($pos.before(i + 1))
      }
      if ($pos.node(i).type.spec.isolating) {
        break
      }
    }
  }
  return null
}
export function findCutAfter($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (let i = $pos.depth - 1; i >= 0; i--) {
      const parent = $pos.node(i)
      if ($pos.index(i) + 1 < parent.childCount) { return $pos.doc.resolve($pos.after(i + 1)) }
      if (parent.type.spec.isolating) break
    }
  }
  return null
}

const selectNode = ['callout', 'bilibili', 'codeBlock', 'image', 'table']

export const handleBackspaceKey = (state, dispatch) => {
  const $cut = findCutBefore(state.selection.$head)
  // console.log(findCutAfter(state.selection.$head))
  if (
    $cut &&
    selectNode.includes($cut.nodeAfter.type.name) &&
    state.selection.$head.parentOffset === 0
  ) {
    dispatch(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos)))
    return true
  }

  if (
    $cut &&
    selectNode.includes($cut.nodeBefore.type.name) &&
    state.selection.$head.parentOffset === 0
  ) {
    const tr = state.tr
    const $head = state.selection.$head
    tr.setSelection(
      NodeSelection.create(state.doc, $cut.pos - $cut.nodeBefore.nodeSize)
    )
    if ($head.parent.textContent === '') {
      tr.delete($head.before(1), $head.after(1))
    }
    dispatch(tr)
    return true
  }
  return false
}
// const excludeNode = ['paragraph', 'codeblock']
// function convertToParagraphIfNot(state, dispatch) {
//   const { $head } = state.selection
//   const isStartPos = $head.parentOffset === 0
//   const parentNode = $head.node(1)
//   const currentNode = $head.node($head.depth)

//   if (
//     parentNode &&
//     isStartPos &&
//     !excludeNode.includes(currentNode.type.name)
//   ) {
//     const a = setBlockType(state.schema.nodes.paragraph)(state, dispatch)

//     !a && lift(state, dispatch)

//     return true
//   }
//   return false
// }
