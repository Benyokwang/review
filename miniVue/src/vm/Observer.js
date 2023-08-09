import defineReactive from './defineReactive'
import observe from './observe';
import Dep from './Dep';
import { proxyPrototype } from './array';

// 对象改造
export default class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep()
    def(value,'__ob__',this)
    // 判断是否为数组
    if (Array.isArray(value)) {
      // 数组监听改写
      Object.setPrototypeOf(value,proxyPrototype)
      this.observeArray(value)
    } else {
      this.walk()
    }
  }

  // 普通对象响应式绑定
  walk() {
    // 遍历对象下的所有key，对key进行set,get重写
    for(let key in this.value) {
      defineReactive(this.value,key)
    }
  }

  // 数组响应式绑定
  observeArray(value) {
    value.forEach(i => observe(i))
  }
}

function def(obj,key,value,enumerable = false) {
  Object.defineProperty(obj,key,{
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}