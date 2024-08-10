export function findIndexById(array, id, parent = null) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return parent ? i : { index: i, parent: null } // 返回索引及父对象
    }
    if (array[i].children.length > 0) {
      const result = findIndexById(array[i].children, id, array[i])
      if (result !== null) {
        return parent ? result : { index: i, parent: array[i] } // 如果找到返回索引及父对象
      }
    }
  }
  return null // 如果未找到，返回 null
}

export function findById(array, id) {
  for (const item of array) {
    if (item.id === id) {
      return item
    }
    if (item.children.length > 0) {
      const found = findById(item.children, id)
      if (found) {
        return found
      }
    }
  }
  return null // 如果没有找到匹配的对象，返回 null
}

export function deleteById(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      array.splice(i, 1)
      return true // 找到并删除对象后返回 true
    }
    if (array[i].children.length > 0) {
      const deleted = deleteById(array[i].children, id)
      if (deleted) {
        return true // 如果在子级中找到并删除对象，返回 true
      }
    }
  }
  return false // 如果未找到对象，返回 false
}
