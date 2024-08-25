import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useKeyboardStore } from '../useStore/useKeyboardStore'
import { useEventListener } from './useEventListener'

export function useKeypress() {
  const KeyboardStore = useKeyboardStore()
  const { SPACE_KEY, META_KEY, EQUAL_KEY, MINUS_KEY, ZERO_KEY } = storeToRefs(KeyboardStore)

  // const SPACE_KEY = ref(false)
  // const META_KEY = ref(false)
  // const EQUAL_KEY = ref(false)
  // const MINUS_KEY = ref(false)
  // const ZERO_KEY = ref(false)
  useEventListener(window, 'keydown', (event) => {
    // event.preventDefault()
    switch (event.key) {
      case ' ':
        SPACE_KEY.value = true
        break
      case 'Meta':
        META_KEY.value = true
        break
      case '=':
        EQUAL_KEY.value = true
        break
      case '-':
        MINUS_KEY.value = true
        break
      case '0':
        ZERO_KEY.value = true
        break
    }
  })
  useEventListener(window, 'keyup', (event) => {
    // event.preventDefault()
    switch (event.key) {
      case ' ':
        SPACE_KEY.value = false
        break
      case 'Meta':
        META_KEY.value = false
        break
      case '=':
        EQUAL_KEY.value = false
        break
      case '-':
        MINUS_KEY.value = false
        break
      case '0':
        ZERO_KEY.value = false
        break
    }
  })
  // return {
  //   SPACE_KEY,
  //   META_KEY,
  //   EQUAL_KEY,
  //   MINUS_KEY,
  //   ZERO_KEY,
  // }
}
