import * as easeUtils from 'easing-utils'

export function animate({ startValue, endValue, duration, easingFunction, onUpdate = () => {}, onComplete = () => {} }) {
  const startTime = performance.now()

  function tick(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easingFunction(progress)

    const currentValue = startValue + (endValue - startValue) * easedProgress
    onUpdate(currentValue)

    if (progress < 1) {
      requestAnimationFrame(tick)
    }
    else {
      if (onComplete)
        onComplete()
    }
  }

  requestAnimationFrame(tick)
}

// 示例缓动函数（例如：easeInOutQuad）
export const EASING = easeUtils
