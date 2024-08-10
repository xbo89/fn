import { computed, ref } from 'vue'

export function useItem(props, emits) {
  const dragStartItemId = ref(null)
  const dragOverItemId = ref(null)
  const itemDirectionIndex = ref(null)
  const itemIsRename = ref(false)
  const itemPosHelper = ref(null)
  const levelRef = ref(props.treeLevel + 1) // 直接在定义时计算

  const isDragover = computed(() => dragOverItemId.value === props.data.id)

  const updateDirectionAndPosition = (itemInnerPosY, itemHeight, itemOffsetTop) => {
    if (itemInnerPosY <= itemHeight * 0.25) {
      itemDirectionIndex.value = -1
      itemPosHelper.value = itemOffsetTop - props.parentOffsetTop
    }
    else if (itemInnerPosY >= itemHeight - itemHeight * 0.25) {
      itemDirectionIndex.value = 1
      itemPosHelper.value = itemOffsetTop - props.parentOffsetTop + itemHeight
    }
    else {
      itemDirectionIndex.value = 0
      itemPosHelper.value = null
    }
  }

  const itemDragstart = (ev) => {
    ev.dataTransfer.setData('text/plain', JSON.stringify(props.data))
    dragStartItemId.value = props.data.id
    emits('itemDragstart')
  }

  const itemDragover = (ev) => {
    ev.preventDefault()
    const itemRect = ev.target.getBoundingClientRect()
    updateDirectionAndPosition(ev.offsetY, ev.target.offsetHeight, itemRect.top)
    dragOverItemId.value = props.data.id
    emits('itemDragover', {
      helperPosTop: itemPosHelper.value,
      helperPosLeft: (levelRef.value - 1) * 24,
    })
  }

  const itemDragleave = (ev) => {
    ev.preventDefault()
    emits('itemDragleave')
  }

  const itemDrop = (ev) => {
    ev.preventDefault()
    const dragData = JSON.parse(ev.dataTransfer.getData('text/plain'))
    if (props.data.id !== dragData.id) {
      emits('itemDrop', {
        from: dragData,
        to: props.data,
        dir: itemDirectionIndex.value,
      })
    }
    dragOverItemId.value = null
    dragStartItemId.value = null
  }

  const childrenDrop = ({ from, to, dir }) => emits('itemDrop', { from, to, dir })

  const childrenFold = id => emits('itemFold', id)

  const childrenAdd = id => emits('addItem', id)

  const itemFold = () => emits('itemFold', props.data.id)

  const itemDragend = () => emits('itemDragend')

  const addItem = () => emits('addItem', props.data.id)

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
    levelRef,
    isDragover,
    itemIsRename,
    itemDirectionIndex,
    isHover,
    itemDragstart,
    itemDragover,
    itemDragleave,
    itemDrop,
    childrenDrop,
    childrenFold,
    childrenAdd,
    itemFold,
    itemDragend,
    addItem,
    mouseenter,
    mouseleave,
  }
}
