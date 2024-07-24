import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { DragHandlePlugin } from './dragHandlePlugin'

export const DragHandle = defineComponent({
  name: 'DragHandle',

  props: {
    pluginKey: {
      type: String,
      default: 'DragHandle',
    },

    editor: {
      type: Object,
      required: true,
    },
  },

  setup(props, { slots }) {
    const root = ref(null)
    const show = ref(false)
    const timer = ref(null)

    onMounted(() => {
      const {
        editor,
        pluginKey,
      } = props

      editor.registerPlugin(DragHandlePlugin({
        editor,
        element: root.value,
        pluginKey,
      }))

      editor.dragHandle = {
        show: () => {
          show.value = true
        },
        hide: () => {
          timer.value = setTimeout(() => {
            show.value = false
          }, 400)
        },
      }

      root.value.addEventListener('mouseenter', () => {
        clearTimeout(timer.value)
      }, false)
    })

    onBeforeUnmount(() => {
      const { pluginKey, editor } = props

      editor.unregisterPlugin(pluginKey)
    })

    return () => h(
      'div',
      {
        ref: root,
        class: `fixed drag-handle size-6 border rounded-lg bg-white flex justify-center items-center cursor-pointer hover:bg-gray-100`,
        dragable: true,
        style: show.value ? '' : 'display:none',
      },
      slots.default(),
    )
  },
})
