// 缓存真实原型
const arrayPrototype = Array.prototype

const reactiveMethods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'reverse',
  'sort'
]

// 增加代理原型proxyPrototype.__proto__ === arrayPrototype
export const proxyPrototype = Object.create(arrayPrototype)

// 定义响应式方法
reactiveMethods.forEach(method => {

  const originalMethod = arrayPrototype[method]

  Object.defineProperty(proxyPrototype,method,{
    value: function reactiveMethod(...args) {
      const result = originalMethod.apply(this,args);

      const ob = this.__ob__;

      let inserted = null;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          // splice方法的第三个及以后的参数是新增的元素
          inserted = args.slice(2)
      }
      // 如果有新增的元素，继续进行监听
      if (inserted) ob.observeArray(inserted)

      ob.dep.notify();

      // 派发更新
      return result
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})