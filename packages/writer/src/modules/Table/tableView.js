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
    console.log(row.child(i))
    for (let j = 0; j < colspan; j += 1, col += 1) {
      const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j]
      console.log(hasWidth, overrideCol, col, colwidth)
      const cssWidth = hasWidth ? `${hasWidth}px` : `${cellMinWidth}px`

      totalWidth += hasWidth || cellMinWidth
      console.log(totalWidth)

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
    // updateColumns(node, this.colgroup, this.table, cellMinWidth, 2, 300)
    this.contentDOM = this.dom.querySelector('[data-nodeview-tbody]')
  }

  ignoreMutation(mutation) {
    // 检查变动类型是否为属性变动
    if (mutation.type !== 'attributes') {
      return false;
    }

    // 忽略表格自身和 <colgroup> 相关的属性变动
    if (mutation.target === this.table || this.colgroup.contains(mutation.target)) {
      return true;
    }

    // 忽略新的外部结构的属性变动
    const externalClasses = [
      'simplebar-wrapper',
      'simplebar-height-auto-observer-wrapper',
      'simplebar-height-auto-observer',
      'simplebar-mask',
      'simplebar-offset',
      'simplebar-content-wrapper',
      'simplebar-content',
      'simplebar-placeholder',
      'simplebar-track',
      'simplebar-scrollbar',
      'left-shadow',
      'right-shadow'
    ];

    if (externalClasses.some(className => mutation.target.classList.contains(className))) {
      return true;
    }

    // 忽略具有特定 data 属性的外部结构的属性变动
    if (
      mutation.target.hasAttribute('data-simplebar')
      || mutation.target.hasAttribute('data-nodeview-table')
      || mutation.target.hasAttribute('data-nodeview-colgroup')
      || mutation.target.hasAttribute('data-nodeview-tbody')
    ) {
      return true;
    }
    console.log('aa', false)

    return false;
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