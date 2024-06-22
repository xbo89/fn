import { Decoration, DecorationSet } from '@tiptap/pm/view'
import highlight from 'highlight.js/lib/core'
// import { findChildren } from 'prosemirror-utils'

function registered(aliasOrLanguage) {
  return Boolean(highlight.getLanguage(aliasOrLanguage))
}
export function findChildren(node, predicate) {
  const nodesWithPos = []

  node.descendants((child, pos) => {
    if (predicate(child)) {
      nodesWithPos.push({
        node: child,
        pos
      })
    }
  })

  return nodesWithPos
}
function parseNodes(nodes, className) {
  return nodes
    .map((node) => {
      const classes = [
        ...className,
        ...(node.properties ? node.properties.className : [])
      ]

      if (node.children) {
        return parseNodes(node.children, classes)
      }

      return {
        text: node.value,
        classes
      }
    })
    .flat()
}
function getHighlightNodes(result) {
  // `.value` for lowlight v1, `.children` for lowlight v2
  return result.value || result.children || []
}
export function getDecorations({ doc, name, lowlight, defaultLanguage }) {
  const decorations = []
  findChildren(doc, (node) => node.type.name === name).forEach((block) => {
    console.log(block)
    let from = block.pos + 1
    const language = block.node.attrs.language || defaultLanguage
    const languages = lowlight.listLanguages()
    // console.log('languages', languages)
    const lines = block.node.textContent.split(/\n/)
    const lineWidth = lines.length.toString().length

    let startPos = block.pos + 1
    lines.forEach((line, index) => {
      decorations.push(
        Decoration.widget(startPos, lineNumberSpan(index + 1, lineWidth), {
          side: -1,
          ignoreSelection: true
        })
      )
      startPos += line.length + 1
    })
    const nodes =
      language && (languages.includes(language) || registered(language))
        ? getHighlightNodes(
          lowlight.highlight(language, block.node.textContent)
        )
        : getHighlightNodes(lowlight.highlightAuto(block.node.textContent))
    parseNodes(nodes, []).forEach((node) => {
      const to = from + node.text.length

      if (node.classes.length) {
        const decoration = Decoration.inline(from, to, {
          class: node.classes.join(' ')
        })
        decorations.push(decoration)
      }

      from = to
    })
  })

  return DecorationSet.create(doc, decorations)
}

function lineNumberSpan(index, lineWidth) {
  return function () {
    const span = document.createElement('span')
    span.className = 'line-number'
    span.innerText = '' + index

    return span
  }
}