import Observer from './Observer'

// 对象观察
export default function observe(data) {
  if (typeof data !== 'object') return
  
  // 声明一个ob，用来标识当前data是否已经进行过Observer处理
  let ob;
  if (data.__ob__ && data.__ob__ instanceof Observer) {
    ob = data.__ob__
  } else {
    ob = new Observer(data)
  }
  return ob
}