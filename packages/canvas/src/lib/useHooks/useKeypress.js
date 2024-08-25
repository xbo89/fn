import { storeToRefs } from 'pinia'
import { useKeyboardStore } from '../useStore/useKeyboardStore'
import { useEventListener } from './useEventListener'

export function useKeypress() {
  const KeyboardStore = useKeyboardStore()
  const { SPACE_KEY, META_KEY, EQUAL_KEY, MINUS_KEY, ZERO_KEY, ESCAPE_KEY, DEL_KEY, SHIFT_KEY } = storeToRefs(KeyboardStore)

  useEventListener(window, 'keydown', (event) => {
    // event.preventDefault()
    console.log(event.key)
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
      case 'Escape':
        ESCAPE_KEY.value = true
        break
      case 'Backspace':
        DEL_KEY.value = true
        break
      case 'Shift':
        SHIFT_KEY.value = true
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
      case 'Escape':
        ESCAPE_KEY.value = false
        break
      case 'Backspace':
        DEL_KEY.value = false
        break
      case 'Shift':
        SHIFT_KEY.value = false
        break
    }
  })
}
