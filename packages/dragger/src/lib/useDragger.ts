interface Options {
  enable: boolean
  target: HTMLElement
  scale: number
  onMoveStart: (event: MouseEvent, start: { x: number, y: number }) => void
  onMove: (event: MouseEvent, delta: { x: number, y: number }) => void
  onMoveEnd: (event: MouseEvent) => void
}
let ox: number, oy: number, ow: number, oh: number, omx: number, omy: number
export function useDragger(options: Options): void {
  if (!options.enable) return
  let startDrag = { x: 0, y: 0 }
  let currentPosition = { x: 0, y: 0 }
  let currentSize = { width: 300, height: 300 }

  

  const handleBorders: HTMLElement[] = Array.from(options.target.querySelectorAll('.resize-handle-border'))
  const handleCorners: HTMLElement[] = Array.from(options.target.querySelectorAll('.resize-handle-corner'))

  options.target.addEventListener('mousedown', (event) => {
    event.stopPropagation()
    const rect = options.target.getBoundingClientRect()
    startDrag = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    currentPosition = { x: rect.left, y: rect.top }
    currentSize = { width: rect.width, height: rect.height }

    ox = startDrag.x
    oy = startDrag.y
    ow = currentSize.width
    oh = currentSize.height
    omx = event.clientX
    omy = event.clientY

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
  let deltaXLeft, deltaYTop, deltaXBottomLeft, deltaXTopLeft, deltaYTopLeft, deltaYTopRight
  for (let border = 0; border < handleBorders.length; border++) {
    handleBorders[border].addEventListener('mousedown', (event: MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()
      switch (border) {
        case 0:
          deltaXTopLeft = (event.clientX - omx) / options.scale
        deltaYTopLeft = (event.clientY - omy) / options.scale
        currentSize.width = (ow - deltaXTopLeft)
        currentPosition.x = ox + deltaXTopLeft
        currentSize.height = (oh - deltaYTopLeft)
        currentPosition.y = oy + deltaYTopLeft
          break
      }
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

