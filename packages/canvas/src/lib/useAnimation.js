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

/**
 *
stiffness：弹簧的硬度，值越大，弹性越强，运动越快。
damping：阻尼系数，值越大，阻尼越强，运动中振荡的幅度越小。
mass：物体的质量，影响运动的频率和幅度。
 */

export function spring({ stiffness = 0.1, damping = 0.8, mass = 1, duration = null } = {}) {
  return function (progress) {
    const omega = Math.sqrt(stiffness / mass)
    const zeta = damping / (2 * Math.sqrt(stiffness * mass))
    const envelope = Math.exp(-zeta * omega * progress)

    const oscillation = Math.cos(omega * Math.sqrt(1 - zeta * zeta) * progress)
    const dampingEffect = Math.sin(omega * Math.sqrt(1 - zeta * zeta) * progress) / (2 * zeta * Math.sqrt(1 - zeta * zeta))

    const springValue = 1 - envelope * (oscillation + dampingEffect)

    if (duration) {
      // 将 springValue 映射到 [0, 1] 之间，基于 duration 计算进度
      const scaledProgress = Math.min(progress / duration, 1)
      return springValue * scaledProgress
    }

    return springValue
  }
}
