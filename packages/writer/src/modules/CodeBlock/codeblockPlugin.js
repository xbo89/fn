import { Plugin, PluginKey } from '@tiptap/pm/state'
import { all, createLowlight } from 'lowlight'
// import './views/style.css'
// import { handleTabDown } from './useKeymap'
import { findChildren, getDecorations } from './codeblockDecorations'
// import { CodeBlockPluginView, CodeblockNodeView } from './useViews'
const lowlight = createLowlight(all)
const pluginKey = new PluginKey('lowlight')

const defaultLanguage = 'plaintext'
const nodeName = 'codeBlock'
const CBPlugin = new Plugin({
  key: pluginKey,
  state: {
    init: (_, { doc }) =>
      getDecorations({
        doc,
        name: nodeName,
        lowlight,
        defaultLanguage,
      }),
    apply: (transaction, decorationSet, oldState, newState) => {
      const oldNodeName = oldState.selection.$head.parent.type.name
      const newNodeName = newState.selection.$head.parent.type.name

      // console.log(oldNodeName, newNodeName)
      const oldNodes = findChildren(
        oldState.doc,
        (node) => {
          // console.log(node.type.name, nodeName)
          return node.type.name === nodeName
        },
      )
      const newNodes = findChildren(
        newState.doc,
        node => node.type.name === nodeName,
      )
      if (
        transaction.docChanged
        // Apply decorations if:
        // selection includes named node,
        && ([oldNodeName, newNodeName].includes(nodeName)
        // OR transaction adds/removes named node,
        || newNodes.length !== oldNodes.length
        // OR transaction has changes that completely encapsulte a node
        // (for example, a transaction that affects the entire document).
        // Such transactions can happen during collab syncing via y-prosemirror, for example.
        || transaction.steps.some((step) => {
          return (
            step.from !== undefined
            && step.to !== undefined
            && oldNodes.some((node) => {
              return (
                node.pos >= step.from
                && node.pos + node.node.nodeSize <= step.to
              )
            })
          )
        }))
      ) {
        return getDecorations({
          doc: transaction.doc,
          name: nodeName,
          lowlight,
          defaultLanguage,
        })
      }

      return decorationSet.map(transaction.mapping, transaction.doc)
    },
  },
  props: {
    decorations(state) {
      return CBPlugin.getState(state)
    },
  },
})

export function CodeblockPlugin(options) {
  return CBPlugin
}
