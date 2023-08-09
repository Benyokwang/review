import observe from "./vm/observe"
import Watcher from './vm/Watcher'

/**
 * 实现逻辑：
 * 1. 调用observe(obj)，将obj设置为响应式对象，observe函数,Observer，defineReactive函数 三者相互循环调用，对obj内的所有属性值都设置为响应式对象
 * 2. 渲染页面时实例化watcher，同时读取依赖的数据值，在Dep中进行依赖收集
 * 3. 依赖变化的时候触发setter方法，从而派发更新，执行更新回调
 */

const obj = {
  arr: [
    {
      a:1
    },
    {
      b: 2,
      c: {
        d: 3
      }
    }
  ]
}

observe(obj)

obj.arr.push({
  e: 4
})


let w1 = new Watcher(obj,'a',function (val,oldVal) {
  console.log(`obj.a 从oldVal:${oldVal}变成了newVal${val}`)
})