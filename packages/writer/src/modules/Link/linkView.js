import { Node as ProseMirrorNode } from '@tiptap/pm/model'
import Component from './Component.vue'
import { h, render } from 'vue'

export class LinkView {
  constructor(node, view, getPos, editor) {
    this.view = view
    this.node = node
    this.getPos = getPos
    this.editor = editor
    this.container = document.createElement('div')
    this.focus = false
    this.componentRender()
    this.dom = this.container.children[0]
    this.contentDOM = this.dom.querySelector('[data-nodeview-content]')
  }

  ignoreMutation(mutation) {
    return false;
  }

  componentRender() {
    const vnode = h(Component, {
      nodeViewProps: {
        view: this.view,
        node: this.node,
        getPos: this.getPos,
        editor: this.editor
      }
    })
    render(vnode, this.container)
  }

  update(node) {
    if (node.type !== this.node.type) {
      return false
    }
    this.node = node
    return true
  }

  destroy() {

  }
}