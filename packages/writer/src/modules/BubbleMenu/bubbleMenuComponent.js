import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { BubbleMenuPlugin } from './bubbleMenuPlugin'

export const BubbleMenu = defineComponent({
  name: 'BubbleMenu',

  props: {
    pluginKey: {
      type: String,
      default: 'bubbleMenu',
    },

    editor: {
      type: Object,
      required: true,
    },
  },

  setup(props, { slots }) {
    const root = ref(null)
    const show = ref(false)

    onMounted(() => {
      const {
        editor,
        pluginKey,
      } = props

      editor.registerPlugin(BubbleMenuPlugin({
        editor,
        element: root.value,
        pluginKey,
      }))

      editor.bubbleMenu = {}
      editor.bubbleMenu.show = () => {
        show.value = true
      }
      editor.bubbleMenu.hide = () => {
        show.value = false
      }
    })

    onBeforeUnmount(() => {
      const { pluginKey, editor } = props

      editor.unregisterPlugin(pluginKey)
    })

    return () => h(
      'div',
      {
        ref: root,
        style: show.value ? '' : 'display:none',
      },
      slots.default(),
    )
  },
})
