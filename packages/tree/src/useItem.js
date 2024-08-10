import { computed, ref } from 'vue'

function itemBeDragShadow(text) {
  const shadowEl = document.createElement('div')
  shadowEl.textContent = text
  shadowEl.style.position = 'fixed'
  shadowEl.setAttribute('class', 'pointer-events-none px-4 py-px bg-white border rounded-lg text-xs shadow-lg hidden min-w-[220px]')
  document.body.appendChild(shadowEl)
  return shadowEl
}
const sEl = itemBeDragShadow('')
export function useItem(props, emits) {
  const dragStartItemId = ref(null)
  const dragOverItemId = ref(null)
  const itemDirectionIndex = ref(null)
  const itemIsRename = ref(false)
  // const itemPosHelper = ref(null)
  const itemStartDrag = ref(0)
  const levelRef = ref(props.treeLevel + 1) // 直接在定义时计算

  const isDragover = computed(() => dragOverItemId.value === props.data.id)

  const updateDirectionAndPosition = (itemInnerPosY, itemHeight, itemOffsetTop) => {
    if (itemInnerPosY <= itemHeight * 0.25) {
      itemDirectionIndex.value = -1
      // itemPosHelper.value = itemOffsetTop - props.parentOffsetTop
    }
    else if (itemInnerPosY >= itemHeight - itemHeight * 0.25) {
      itemDirectionIndex.value = 1
      // itemPosHelper.value = itemOffsetTop - props.parentOffsetTop + itemHeight
    }
    else {
      itemDirectionIndex.value = 0
      // itemPosHelper.value = null
    }
  }
  const transparentImage = new Image(0, 0)
  transparentImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  const itemDragstart = (ev) => {
    ev.dataTransfer.setDragImage(transparentImage, 0, 0)
    ev.dataTransfer.setData('text/plain', JSON.stringify(props.data))
    sEl.textContent = props.data.title
    sEl.style.display = 'block'
    itemStartDrag.value = 1
    dragStartItemId.value = props.data.id
    emits('itemDragstart')
  }
  const itemDrag = (ev) => {
    if (ev.pageX === 0 && ev.pageY === 0)
      return
    sEl.style.left = `${ev.pageX}px`
    sEl.style.top = `${ev.pageY}px`
  }

  const itemDragover = (ev) => {
    ev.stopPropagation()
    ev.preventDefault()
    const itemRect = ev.target.getBoundingClientRect()
    updateDirectionAndPosition(ev.offsetY, ev.target.offsetHeight, itemRect.top)
    dragOverItemId.value = props.data.id
    emits('itemDragover', {
      // helperPosTop: itemPosHelper.value,
      // helperPosLeft: (levelRef.value - 1) * 24,
    })
  }

  const itemDragleave = (ev) => {
    itemDirectionIndex.value = null

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
    sEl.style.display = 'none'
    itemStartDrag.value = 0
    dragOverItemId.value = null
    dragStartItemId.value = null
    itemDirectionIndex.value = null
  }
  document.body.addEventListener('drop', (ev) => {
    ev.preventDefault()
    itemStartDrag.value = 0
    sEl.style.display = 'none'
    console.log('up')
  }, false)

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
    itemStartDrag,
    isHover,
    itemDrag,
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
