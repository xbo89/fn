import {
  Plugin,
  PluginKey
} from '@tiptap/pm/state'

// export const pluginkey = new PluginKey('image')

export const ImagePlugin = ({ editor, pluginkey, callback }) => {
  return new Plugin({
    key: pluginkey,
    props: {
      // handlePaste: (view, event) => handlePaste(view, event),
      handleDrop: (view, e) => {
        callback(editor, view, e)
      }
    }
  })
}