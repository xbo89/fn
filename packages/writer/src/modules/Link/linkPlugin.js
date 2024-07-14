import { Plugin } from '@tiptap/pm/state'
import { LinkView } from './linkView'
export const LinkPlugin = (editor) => {
  return new Plugin({
    key: 'LinkCustomView',
    props: {
      nodeViews: {
        link: (node, view, getPos) => new LinkView(node, view, getPos, editor)
      }
    }
  })
}