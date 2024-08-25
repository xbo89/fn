import { defineStore } from 'pinia'

export const useKeyboardStore = defineStore('keyboard', {
  state: () => ({
    SPACE_KEY: false,
    SHIFT_KEY: false,
    META_KEY: false,
    DEL_KEY: false,
    ESC_KEY: false,
    EQUAL_KEY: false,
    MINUS_KEY: false,
    ZERO_KEY: false,
  }),
})
