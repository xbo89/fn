import { onClickOutside } from '@vueuse/core'
import { computed, inject, nextTick, ref, watch } from 'vue'

export function useDnd(data) {
  const { moveDocument } = inject('move')
  const dragoverId = ref(null)
  const handleDragstart = (ev, data) => {
    ev.dataTransfer.setData('text/plain', JSON.stringify(data))
  }
  const handleDragover = (ev, data) => {
    ev.preventDefault()
    dragoverId.value = data.id
  }
  const handleDragleave = (ev, data) => {
    ev.preventDefault()
    dragoverId.value = null
  }
  const handleDrop = (ev, data) => {
    handleDragleave(ev, data)
    ev.preventDefault()
    const dragData = JSON.parse(ev.dataTransfer.getData('text/plain'))
    if (data.id === dragData.id)
      return
    moveDocument(dragData, JSON.parse(JSON.stringify(data)))
  }
  const isDragover = computed(() => {
    return dragoverId.value === data.id
  })
  return {
    isDragover,
    dragoverId,
    handleDragstart,
    handleDragover,
    handleDragleave,
    handleDrop,
  }
}

export function useRename(el, data) {
  const { handleRename } = inject('rename')
  const renameId = inject('renameId')
  const inputValue = ref(data.title)
  const handleEnter = () => {
    handleRename({ id: data.id, title: inputValue.value })
  }
  onClickOutside(el, (event) => {
    handleRename({ id: data.id, title: inputValue.value })
  })
  const isRename = computed(() => {
    return renameId.value === data.id
  })
  watch(isRename, (val) => {
    if (!val)
      return
    nextTick(() => {
      el.value.focus()
      el.value.select()
    })
  })
  return {
    renameId,
    isRename,
    inputValue,
    handleEnter,
    onClickOutside,
  }
}

export function useItemHover() {
  const isHover = ref(false)
  const timer = ref(null)
  const mouseenter = () => {
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      isHover.value = true
    }, 600)
  }
  const mouseleave = () => {
    clearTimeout(timer.value)
    isHover.value = false
  }
  return {
    isHover,
    mouseenter,
    mouseleave,
  }
}

export function useItemFold(data) {
  data.toggle = !data.toggle
  let treeCache = localStorage.getItem('treeToggleCache') || JSON.stringify({})
  treeCache = JSON.parse(treeCache)
  const currentBookTreeCache = treeCache[`book${data.bookId}`] || []
  currentBookTreeCache.includes(data.id)
    ? currentBookTreeCache.splice(currentBookTreeCache.indexOf(data.id), 1)
    : currentBookTreeCache.push(data.id)

  treeCache[`book${data.bookId}`] = currentBookTreeCache

  localStorage.setItem('treeToggleCache', JSON.stringify(treeCache))
}
