import Link from '@tiptap/extension-link'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'
import { LinkPlugin } from './linkPlugin'
const ExtendLink = Link.extend({
  addProseMirrorPlugins() {
    return [...this.parent(), LinkPlugin(this.editor)]
  }
})

export { ExtendLink }
