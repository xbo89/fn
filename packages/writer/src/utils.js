export function random(min, max) {
  // 确保 min 和 max 是数字，并且 min 小于 max
  if (typeof min !== 'number' || typeof max !== 'number' || min >= max) {
    throw new Error('请确保 min 和 max 是数字，并且 min 小于 max')
  }

  // 生成范围内的随机数
  return Math.floor(Math.random() * (max - min + 1)) + min
}
