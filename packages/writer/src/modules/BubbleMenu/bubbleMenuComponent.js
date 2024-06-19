import { BubbleMenuPlugin } from './bubbleMenuPlugin'
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

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

    onMounted(() => {
      const {
        editor,
        pluginKey,
      } = props

      editor.registerPlugin(BubbleMenuPlugin({
        editor,
        element: root.value,
        pluginKey
      }))
    })

    onBeforeUnmount(() => {
      const { pluginKey, editor } = props

      editor.unregisterPlugin(pluginKey)
    })

    return () => h('div', { ref: root }, slots.default())
  },
})