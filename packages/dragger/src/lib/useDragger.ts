interface Options {
  enable: boolean
  target: HTMLElement
  scale: number
  onMoveStart: (event: MouseEvent, start: { x: number, y: number }) => void
  onMove: (event: MouseEvent, delta: { x: number, y: number }) => void
  onMoveEnd: (event: MouseEvent) => void
}

export function useDragger(options: Options): void {
  if (!options.enable) return
  let startDrag = { x: 0, y: 0 }
  let currentPosition = { x: 0, y: 0 }
  let currentSize = { width: 300, height: 300 }

  const handleBorders = options.target.querySelectorAll('.resize-handle-border')
  const handleCorners = options.target.querySelectorAll('.resize-handle-corner')

  options.target.addEventListener('mousedown', (event) => {
    event.stopPropagation()
    const rect = options.target.getBoundingClientRect()
    console.log(event.clientX,event.pageX,event.layerX,event.offsetX,event.target.offsetLeft)
    startDrag = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    currentPosition = { x: rect.left, y: rect.top }
    currentSize = { width: rect.width, height: rect.height }
    options.onMoveStart(event, currentPosition)

    function onMouseMove(event: MouseEvent) {
      const newX = event.clientX - startDrag.x
      const newY = event.clientY - startDrag.y
      currentPosition = { x: newX, y: newY }
      options.onMove(event, currentPosition)
    }

    function onMouseUp(event: MouseEvent) {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      options.onMoveEnd(event)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })
  for (let border = 0; border < handleBorders.length; border++) {
    handleBorders[border].addEventListener('mousedown', (event) => {
      event.stopPropagation()
      event.preventDefault()
      console.log('pointerdown', event)
    })
  }
  for (let corner = 0; corner < handleCorners.length; corner++) {
    handleCorners[corner].addEventListener('mousedown', (event) => {
      event.stopPropagation()
      event.preventDefault()
      console.log('pointerdown', event)
    })
  }
}

