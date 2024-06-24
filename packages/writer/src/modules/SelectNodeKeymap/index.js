import { Extension, mergeAttributes } from '@tiptap/core'
import { handleBackspaceKey } from './handleBackspace'
function randomColor() {
  return ColorfulBlock[random(0, ColorfulBlock.length - 1)].variants.light
}
export default Extension.create({
  name: 'SelectNodeKeymap',
  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        let handled = false
        handled = handleBackspaceKey(this.editor.state, this.editor.view.dispatch)

        // this.options.listTypes.forEach(({ itemName, wrapperNames }) => {
        //   if (editor.state.schema.nodes[itemName] === undefined) {
        //     return
        //   }

        //   if (handleBackspace(editor, itemName, wrapperNames)) {
        //     handled = true
        //   }
        // })

        return handled
      }
    }
  }
})