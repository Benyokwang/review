import Dep from "./Dep"
import observe from "./observe"

/**
 * 对象改造的方法
 * 对data内的属性进行响应式劫持，此处的val利用了闭包的原理，进行缓存
 * @param {*} data 目标对象
 * @param {*} key  目标对象的属性
 * @param {*} val  需要设置的初始化值
 */
export default function defineReactive(data,key,val) {

  if (arguments.length == 2) {
    // 如果没有传入val，则以data[key]本身的值作为val
    val = data[key]
  }

  // 收集依赖
  const dep = new Dep()

  // 深度遍历，递归val下的子对象，也使用defineProperty进行响应式劫持
  let childOb = observe(val)

  Object.defineProperty(data,key,{
    get() {
      // dep.push(window.target)
      dep.depend()
      if (childOb) {
        // 检查子属性依赖收集
        childOb.dep.depend()
        if (Array.isArray(val)) {
          // 递归子属性，把全部子孙属性都添加到依赖收集中
          dependArray(val)
        }
      }
      return val
    },
    set(newValue) {
      if (val === newValue) return
      val = newValue
      // observe(newValue)
      // 通知依赖更新
      dep.notify()
      childOb = observe(newValue)
      // dep.forEach(d => d.update())
    }
  })
}

function dependArray(array) {
  for(let e of array) {
    e && e.__ob__ && e.__ob__.dep.depend() 
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}