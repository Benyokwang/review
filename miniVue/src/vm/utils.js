
const parsePath = function(path) {
  const segments = path.split('.')
  return function(obj) {
    for (let key of segments) {
      if (!obj) return
      obj = obj[key]
    }
    return obj
  }
}

export {
  parsePath
}