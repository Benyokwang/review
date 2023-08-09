import { pushTarget,popTarget } from "./Dep";
import { parsePath } from "./utils";

export default class Watcher {
  /**
   * 
   * @param {*} data 目标对象
   * @param {*} expression 表达式，如访问obj.b.c中的.b.c
   * @param {*} callback 依赖变化时的回调函数
   */
  constructor(data,expOrFn,callback) {
    this.data = data;
    // this.expression = expression;
    if (typeof expOrFn === 'function') {
      // 传入函数
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.callback = callback;
    this.value = this.get();
  }

  get() {
    // window.target = this
    pushTarget(this)
    // 解析.属性表达式
    const data = this.data
    const value = this.getter.call(data,data)
    // 求值完毕后重置window.target
    // window.target = null
    popTarget()
    return value
  }

  update() {
    // const oldValue = this.value
    // this.value = parsePath(this.data,this.expression)
    // // 实现在watch update的时候可以接收监听数据的新值和旧值
    // this.callback.call(this.data,this.value,oldValue)

    const value = this.get()
    if (value !== this.value || isObject(value)) {
      const oldValue = this.value;
      this.value = value;
      this.callback.call(this.vm,value,oldValue)
    }
  }
}

function isObject(target) {
  return typeof target === 'object' && target !== null
}
