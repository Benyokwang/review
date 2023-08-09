// 依赖管理

let uid = 0

export default class Dep {
  constructor() {
    this.subs = []  // 依赖收集
    this.id = uid++
  }

  // 添加依赖
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }

  // 通知依赖更新
  notify() {
    const subs = [...this.subs]
    subs.forEach(s => s.update())
  }

  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }
}

// 此处需要利用栈来存储target
Dep.target = null

const TargetStack = []

export function pushTarget(_target) {
  TargetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget() {
  Dep.target = TargetStack.pop()
}