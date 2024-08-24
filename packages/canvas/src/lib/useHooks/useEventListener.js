import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback, options = {}) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素

  const targetElement = window || document || target.value
  onMounted(() => targetElement.addEventListener(event, callback, options))
  onUnmounted(() => targetElement.removeEventListener(event, callback))
}
