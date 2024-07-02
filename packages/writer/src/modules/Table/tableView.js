import { Node as ProseMirrorNode } from '@tiptap/pm/model'
// import { NodeView } from '@tiptap/pm/view'
import Component from './Component.vue'
export function updateColumns(
  node,
  colgroup,
  table,
  cellMinWidth,
  overrideCol,
  overrideValue,
) {
  let totalWidth = 0
  let fixedWidth = true
  let nextDOM = colgroup.firstChild
  const row = node.firstChild

  for (let i = 0, col = 0; i < row.childCount; i += 1) {
    const { colspan, colwidth } = row.child(i).attrs

    for (let j = 0; j < colspan; j += 1, col += 1) {
      const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j]
      const cssWidth = hasWidth ? `${hasWidth}px` : ''

      totalWidth += hasWidth || cellMinWidth

      if (!hasWidth) {
        fixedWidth = false
      }

      if (!nextDOM) {
        colgroup.appendChild(document.createElement('col')).style.width = cssWidth
      } else {
        if (nextDOM.style.width !== cssWidth) {
          nextDOM.style.width = cssWidth
        }

        nextDOM = nextDOM.nextSibling
      }
    }
  }

  while (nextDOM) {
    const after = nextDOM.nextSibling

    nextDOM.parentNode.removeChild(nextDOM)
    nextDOM = after
  }

  if (fixedWidth) {
    table.style.width = `${totalWidth}px`
    table.style.minWidth = ''
  } else {
    table.style.width = ''
    table.style.minWidth = `${totalWidth}px`
  }
}
import { h, render } from 'vue'

export class TableView {
  constructor(node, cellMinWidth, view) {
    // super(node, cellMinWidth, view)
    this.view = view
    this.node = node
    this.container = document.createElement('div')
    this.focus = false
    this.componentRender()
    this.dom = this.container.children[0]
    this.table = this.dom.querySelector('[data-nodeview-table]')
    this.colgroup = this.dom.querySelector('[data-nodeview-colgroup]')
    updateColumns(node, this.colgroup, this.table, cellMinWidth)
    this.contentDOM = this.dom.querySelector('[data-nodeview-tbody]')
  }

  ignoreMutation() {
    return (
      mutation.type === 'attributes'
      && (mutation.target === this.table || this.colgroup.contains(mutation.target))
    )
  }


  componentRender() {
    const vnode = h(Component, {
      node: this.node,
      focus: this.focus
    })
    render(vnode, this.container)
  }

  // selectNode() {
  //   this.dom.classList.add('fineflow-selectednode')
  // }

  // deselectNode() {
  //   this.dom.classList.remove('fineflow-selectednode')
  // }

  update(node) {
    // console.log('更新')
    // if (node.type !== this.node.type) return false
    // this.node = node
    // const table = findTable(this.view.state.selection)
    // this.focus = Boolean(table)
    // this.componentRender()
    // updateColumnsOnResize(node, this.colgroup, this.table, this.cellMinWidth)
    // return true

    if (node.type !== this.node.type) {
      return false
    }

    this.node = node
    updateColumns(node, this.colgroup, this.table, this.cellMinWidth)

    return true
  }

  destroy() {
    console.log('销毁')
    this.dom = null
    this.table = null
    this.colgroup = null
    this.contentDOM = null
  }
}